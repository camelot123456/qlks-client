import { FastField, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { PAYMENT_METHOD, PAYMENT_TYPE } from '../../../../constants/constants';
import FormField from '../../../custom/FormField';
import FullPageLoader from '../../../custom/FullPageLoader';

const GuestDetailForm = () => {

    const dispatch = useDispatch();
    const { loading, error, booking } = useSelector(state => ({ ...state.booking }));

    const initialValues = {
        fullName: '',
        email: '',
        phoneNumber: '',
        country: '',
        paymentType: '',
        paymentMethod: '',
        note: ''
    };

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required("Trường này không được để trống"),
        email: Yup.string().email().required("Trường này không được để trống."),
        phoneNumber: Yup.string().required("Trường này không được để trống."),
        country: Yup.string(),
        paymentType: Yup.string().required("Trường này không được để trống."),
        paymentMethod: Yup.string().required("Trường này không được để trống."),
        note: ''
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {

            }}
        >
            {(formikProps) => {
                const { errors, values, touched, handleSubmit, handleBlur, handleChange } = formikProps;
                return (
                    <Form className="bg-light rounded p-3 border" style={{ width: '65%' }}>
                        <h3 className='mb-4'>Thông tin khách hàng</h3>
                        <FastField id="fullName" name="fullName" label="Fullname" placeholder="Fullname" type="text" component={FormField.InputField1} />
                        <FastField id="email" name="email" label="Email" placeholder="Email" type="email" component={FormField.InputField1} />
                        <FastField id="country" name="country" label="Country" placeholder="Country" type="text" component={FormField.InputField1} />
                        <FastField id="phoneNumber" name="phoneNumber" label="Phone number" placeholder="Phone number" type="text" component={FormField.InputField1} />
                        <div className="mt-3">
                            <select className="form-select form-select-lg mb-3 rounded-pill">
                                <option defaultValue>Open this select menu</option>
                                <option value={PAYMENT_TYPE.PREPAID}>TRẢ TRƯỚC</option>
                                <option value={PAYMENT_TYPE.POSTPAID}>TRẢ SAU</option>
                                <option value={PAYMENT_TYPE.DEPOSIT}>ĐẶT CỌC</option>
                            </select>
                        </div>
                        <div className="mt-3">
                            <select className="form-select form-select-lg mb-3 rounded-pill">
                                <option defaultValue>Open this select menu</option>
                                <option value={PAYMENT_METHOD.CASH}>TIỀN MẶT</option>
                                <option value={PAYMENT_METHOD.CHECKS}>SÉC</option>
                                <option value={PAYMENT_METHOD.CREDIT_CARDS}>THẺ TÍN DỤNG</option>
                                <option value={PAYMENT_METHOD.DEBIT_CARDS}>THẺ GHI NỢ</option>
                                <option value={PAYMENT_METHOD.ELECTRONIC_BANK_TRANFERS}>CHUYỂN TIỀN NGÂN HÀNG</option>
                                <option value={PAYMENT_METHOD.MOBILE_PAYMENTS}>THANH TOÁN DI ĐỘNG</option>
                            </select>
                        </div>
                        <FastField id="note" name="note" label="Note" placeholder="Note" type="textarea" component={FormField.TextareaField} />
                        <div className="mt-4 text-end">
                            <button className='btn btn-outline-primary'>Đặt phòng</button>
                        </div>
                        {loading && <FullPageLoader />}
                    </Form>
                )
            }}

        </Formik>
    )

};

export default GuestDetailForm;