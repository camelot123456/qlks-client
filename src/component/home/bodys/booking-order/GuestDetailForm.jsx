import {FastField, Form, Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import * as Yup from 'yup';
import {PAYMENT_METHOD, PAYMENT_TYPE} from 'src/constants/constants';
import {createBookingRequest} from 'src/redux/slice/booking-slice';
import FormField from 'src/component/custom/FormField';
import FullPageLoader from 'src/component/custom/FullPageLoader';
import { useEffect, useState } from 'react';
import { getAccountMe } from 'src/redux/slice/auth-slice';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { resetServiceBooking } from 'src/redux/slice/service-slice';
import { resetDiscountBookings } from 'src/redux/slice/discount-slice';
import { resetRoomtypeBookings } from 'src/redux/slice/roomtype-slice';

const GuestDetailForm = () => {
    const [showLoading, setShowLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading, bookingRequest} = useSelector(state => ({...state.booking}));
    const authSlice = useSelector(state => ({...state.auth}));
    let accountMe = authSlice.accountMe;

    useEffect(() => {
        dispatch(getAccountMe());
    }, []);

    const initialValues = {
        fullName: (accountMe.firstName + ' ' + accountMe.lastName) || '',
        email: accountMe.email || '',
        phoneNumber: accountMe.phoneNumber || '',
        country: accountMe.country || '',
        paymentType: PAYMENT_TYPE.PREPAID,
        paymentMethod: PAYMENT_METHOD.CREDIT_CARDS,
        note: ''
    };

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required("Trường này không được để trống"),
        email: Yup.string().email().required("Trường này không được để trống."),
        phoneNumber: Yup.string().required("Trường này không được để trống."),
        country: Yup.string(),
        paymentType: Yup.string().required("Trường này không được để trống."),
        paymentMethod: Yup.string().required("Trường này không được để trống."),
        note: Yup.string(),
    });

    const checkDisabledForPostpaid = () => {
        const start = moment(new Date());
        const end = moment(bookingRequest.checkin);
        if (end.diff(start, 'hours') <= 24)
            return false;
        return true;
    }

    const handleSubmit = (values) => {
        setShowLoading(true);
        const discountMapper = bookingRequest.discountBookings.map(item => {
            return item.giftCode;
        });
        const roomTypeMapper = bookingRequest.roomTypeBookings.map(item => {
            return {
                id: item.id,
                quantity: item.quantity
            }
        });
        const serviceMapper = bookingRequest.serviceBookings.map(item => {
            return {
                id: item.id,
                quantity: item.quantity
            }
        });
        const bookingForm = {
            checkIn: bookingRequest.checkin,
            checkOut: bookingRequest.checkout,
            adultGuest: bookingRequest.adultGuest,
            childGuest: bookingRequest.childGuest,
            note: values.note,
            fullName: values.fullName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            country: values.country,
            giftCodes: discountMapper,
            roomBookingVMs: [],
            roomTypeBookingVMs: roomTypeMapper,
            serviceBookingVMs: serviceMapper,
            paymentType: values.paymentType,
            paymentMethod: values.paymentMethod,
        };
        dispatch(createBookingRequest(bookingForm))
        .then(bookingResponse => {
            if (!bookingResponse.error) {
                dispatch(resetServiceBooking());
                dispatch(resetDiscountBookings());
                dispatch(resetRoomtypeBookings());
                toast.success('Yêu cầu đã được xử lý');
                if (values.paymentType === PAYMENT_TYPE.PREPAID 
                    && values.paymentMethod === PAYMENT_METHOD.CREDIT_CARDS) {
                    const approvedLink = bookingResponse?.payload?.links?.find(link => link?.rel?.includes('approve'))?.href;
                    window.location.href = approvedLink;
                } else navigate('/bill/detail');
            } else {
                toast.error('Yêu cầu chưa được xử lý');
                setShowLoading(false);
                throw new Error('Đã xảy ra lỗi trong thi xử lý yêu cầu đặt phòng');
            }
        })
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => handleSubmit(values)}
        >
            {(formikProps) => {
                const {errors, values, touched, handleSubmit, handleBlur, handleChange} = formikProps;
                return (
                    <Form className="bg-light rounded p-3 border" style={{width: '65%'}}>
                        <h3 className='mb-4'>Thông tin khách hàng</h3>
                        <FastField id="fullName" name="fullName" label="Fullname" placeholder="Fullname" type="text"
                                   component={FormField.InputField1} value={values.fullName}/>
                        <FastField id="email" name="email" label="Email" placeholder="Email" type="email"
                                   component={FormField.InputField1} value={values.email}/>
                        <FastField id="country" name="country" label="Country" placeholder="Country" type="text"
                                   component={FormField.InputField1} value={values.country}/>
                        <FastField id="phoneNumber" name="phoneNumber" label="Phone number" placeholder="Phone number"
                                   type="text" component={FormField.InputField1} value={values.phoneNumber}/>
                        <FastField id="note" name="note" label="Note" placeholder="Note" type="textarea"
                                   component={FormField.TextareaField}/>
                        <div className="mt-3">
                            <select className="form-select form-select-lg mb-3 rounded-pill"
                                    onChange={handleChange} id='paymentType' name='paymentType'>
                                <option value={PAYMENT_TYPE.PREPAID}>TRẢ TRƯỚC</option>
                                <option value={PAYMENT_TYPE.POSTPAID}
                                    disabled={checkDisabledForPostpaid()}
                                >TRẢ SAU</option>
                            </select>
                        </div>
                        <div className="mt-3">
                            {values.paymentType === PAYMENT_TYPE.PREPAID && 
                            (<select className="form-select form-select-lg mb-3 rounded-pill"
                                    onChange={handleChange} id='paymentMethod' name='paymentMethod'>
                                <option value={PAYMENT_METHOD.CREDIT_CARDS}>PAYPAL</option>
                            </select>)}
                        </div>
                        <div className="mt-4 text-end">
                            {errors !== true && <button type='submit' className='btn btn-outline-primary'>ĐẶT NGAY</button>}
                        </div>
                        {showLoading && <FullPageLoader/>}
                    </Form>
                )
            }}

        </Formik>
    )

};

export default GuestDetailForm;
