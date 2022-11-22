import { FastField, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormField from '../../custom/FormField';
import FullPageLoader from '../../custom/FullPageLoader';
import { toast } from 'react-toastify';
import { register } from '../../../redux/slice/auth-slice';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading, error, userInfo} = useSelector(state => ({...state.auth}));

    useEffect(() => {
    }, [loading, error, userInfo]);

    const initialValues = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        gender: true,
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("Trường này không được để trống"),
        lastName: Yup.string().required("Trường này không được để trống."),
        username: Yup.string().required("Trường này không được để trống."),
        email: Yup.string().email().required("Trường này không được để trống."),
        password: Yup.string().required("Trường này không được để trống."),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref("password")], "Mật khẩu không trùng khớp")
            .required("Trường này không được để trống."),
        gender: Yup.boolean().required("Trường này không được để trống."),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                let registerForm = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    passwordConfirm: values.passwordConfirm,
                    gender: true,
                };

                dispatch(register(registerForm))
                .then(res => {
                    if (!res.error) {
                        toast.success('Register Successfully');
                        navigate('/auth/login');
                    } else {
                        toast.error('Register Failure');
                    }
                })
            }}
        >
            {(formikProps) => {
                const { errors, values, touched, handleSubmit, handleBlur, handleChange } = formikProps;
                return (
                    <Form style={{minWidth: '500px'}} className="position-absolute top-50 start-50 translate-middle bg-light p-4 shadow-lg p-3 mb-5 bg-body rounded">
                        <h3 className="text-center mb-4">Sign Up</h3>
                        <div className='d-flex justify-content-between'>
                            <FastField id="firstName" name="firstName" placeholder="First name" type="text" component={FormField.InputField1} />
                            <FastField id="lastName" name="lastName" placeholder="Last name" type="text" component={FormField.InputField1} />
                        </div>
                        <FastField id="username" name="username" placeholder="Username" type="text" component={FormField.InputField1} />
                        <FastField id="email" name="email" placeholder="Email" type="email" component={FormField.InputField1} />
                        <div className='d-flex justify-content-between'>
                            <FastField id="password" name="password" placeholder="Password" type="password" component={FormField.InputField1} />
                            <FastField id="passwordConfirm" name="passwordConfirm" placeholder="Password confirm" type="password" component={FormField.InputField1} />
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Male
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                            <label class="form-check-label" for="flexRadioDefault2">
                                Female
                            </label>
                        </div>
                        <div className="d-grid mt-4">
                            <button type="submit" className="btn btn-primary rounded-pill">
                                Login
                            </button>
                            <hr />
                            <button type="submit" className="btn btn-danger rounded-pill">
                                <i class="fa fa-google" aria-hidden="true"></i> Register with Google
                            </button>
                            <button type="submit" className="btn btn-primary rounded-pill mt-3">
                                <i class="fa fa-facebook" aria-hidden="true"></i> Register with Facebook
                            </button>
                            <hr />
                            <a className="forgot-password text-center" href="#">
                                Forgot Password?
                            </a>
                            <a className="forgot-password text-center" href="#">
                                Already have an account? Login!
                            </a>
                        </div>
                        {loading && <FullPageLoader />}
                    </Form>
                )
            }}
        </Formik>
    );

};

export default Register;