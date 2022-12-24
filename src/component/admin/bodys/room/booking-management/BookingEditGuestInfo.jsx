import {FastField, Form, Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import * as Yup from 'yup';
import {PAYMENT_METHOD, PAYMENT_TYPE} from 'src/constants/constants';
import {createAdminBookingRequest, findById, resetState, updateBookingRequest} from 'src/redux/slice/booking-slice';
import FormField from 'src/component/custom/FormField';
import FullPageLoader from 'src/component/custom/FullPageLoader';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Modal from 'src/component/custom/Modal';
import moment from 'moment';
import BookingOfflinePayment from "src/component/admin/bodys/room/booking-offline/BookingOffilePayment";

const BookingEditGuestInfo = () => {
    const [showLoading, setShowLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const {loading, bookingRequest, bookingInfo} = useSelector(state => ({...state.booking}));

    useEffect(() => {
        console.log(bookingInfo);
    }, [bookingInfo]);
    
    let initialValues = {
        fullName: bookingInfo?.fullName || '',
        email: bookingInfo?.email || '',
        phoneNumber: bookingInfo?.phoneNumber || '',
        country: bookingInfo?.country || '',
        paymentType: bookingInfo?.order?.paymentType || PAYMENT_TYPE.PREPAID,
        paymentMethod: bookingInfo?.order?.paymentMethod || PAYMENT_METHOD.CREDIT_CARDS,
        note: bookingInfo?.note || '',
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
    };

    const handleSubmit = (values) => {
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
            id: bookingInfo?.id,
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
            paymentMethod: values.paymentMethod,
        };
        dispatch(updateBookingRequest(bookingForm))
            .then(({payload}) => {
                if (!payload.error) {
                    toast.success('Cập nhập thành công');
                    navigate(`/admin/booking-management`);
                } else toast.error('Cập nhập thất bại');
            })
    };

    return (
        <>
            <Formik
                enableReinitialize={true}
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
                                       component={FormField.InputField1} value={values.fullName || ''}/>
                            <FastField id="email" name="email" label="Email" placeholder="Email" type="email"
                                       component={FormField.InputField1} value={values.email || ''}/>
                            <FastField id="country" name="country" label="Country" placeholder="Country" type="text"
                                       component={FormField.InputField1} value={values.country || ''}/>
                            <FastField id="phoneNumber" name="phoneNumber" label="Phone number" placeholder="Phone number"
                                       type="text" component={FormField.InputField1} value={values.phoneNumber || ''}/>
                            <FastField id="note" name="note" label="Note" placeholder="Note" type="textarea"
                                       component={FormField.TextareaField}/>
                            <div className="mt-3">
                                <select className="form-select form-select-lg mb-3 rounded-pill"
                                        onChange={handleChange} id='paymentType' name='paymentType'
                                        disabled={true}  value={values.paymentType || PAYMENT_TYPE.PREPAID}
                                >
                                    <option value={PAYMENT_TYPE.PREPAID}>TRẢ TRƯỚC</option>
                                    <option value={PAYMENT_TYPE.POSTPAID}
                                            disabled={checkDisabledForPostpaid()}
                                    >TRẢ SAU</option>
                                </select>
                            </div>
                            <div className="mt-3">
                                {values.paymentType === PAYMENT_TYPE.PREPAID &&
                                (<select className="form-select form-select-lg mb-3 rounded-pill"
                                         onChange={handleChange} id='paymentMethod' name='paymentMethod'
                                         disabled={false} value={values.paymentMethod}
                                >
                                    <option value={PAYMENT_METHOD.CREDIT_CARDS}>CREDIT CARD</option>
                                    <option value={PAYMENT_METHOD.CASH}>CASH</option>
                                    <option value={PAYMENT_METHOD.CHECKS}>CHECKS</option>
                                    <option value={PAYMENT_METHOD.DEBIT_CARDS}>DEBIT CARD</option>
                                    <option value={PAYMENT_METHOD.ELECTRONIC_BANK_TRANFERS}>ELECTRON BANK TRANFERS</option>
                                    <option value={PAYMENT_METHOD.MOBILE_PAYMENTS}>MOBILE PAYMENT</option>
                                </select>)}
                            </div>
                            <div className="mt-4 text-end">
                                {errors !== true && <button type='submit' className='btn btn-outline-primary'>CẬP NHẬP</button>}
                            </div>
                        </Form>
                    )
                }}
            </Formik>
            {showModal && <Modal closeModal={setShowModal}
                                 content={<BookingOfflinePayment />} width={'850'}/>}
            {showLoading && <FullPageLoader/>}
        </>
    )

};

export default BookingEditGuestInfo;
