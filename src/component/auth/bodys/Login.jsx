import { FastField, Form, Formik } from "formik";
import * as Yup from 'yup';
import { useLocation, useNavigate } from "react-router-dom";
import FormField from "component/custom/FormField";
import { useDispatch, useSelector } from "react-redux";
import { login } from 'redux/slice/user-jwt-slice';
import { toast } from "react-toastify";
import { useEffect } from "react";
import FullPageLoader from 'component/custom/FullPageLoader';
import { getAccountMe } from "redux/slice/auth-slice";

const Login = () => {
    const dispatch = useDispatch();
    const { loading, jwtToken, error } = useSelector((state) => ({ ...state.userJwt }));
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
    }, [loading, error]);

    const initialValues = {
        login: "",
        password: "",
        rememberMe: false,
    };

    const validationSchema = Yup.object().shape({
        login: Yup.string().required("Trường này không được để trống."),
        password: Yup.string().required("Trường này không được để trống."),
        rememberMe: Yup.boolean()
    });

    const haneleLogin = (values) => {
        let loginForm = {
            login: values?.login,
            password: values?.password,
            rememberMe: values?.rememberMe,
        };
        dispatch(login(loginForm))
            .then(() => {
                dispatch(getAccountMe())
                    .then(accountRes => {
                        if (!accountRes?.error) {
                            toast.success('Login Successfully');
                            navigate(from, { replace: true });
                        } else {
                            toast.error('Login Failure');
                        }
                    });
            });
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => haneleLogin(values)}
        >
            {(formikProps) => {
                const { errors, values, touched, handleSubmit, handleBlur, handleChange } = formikProps;
                return (
                    <Form className="w-25 position-absolute top-50 start-50 translate-middle bg-light p-4 shadow-lg p-3 mb-5 bg-body rounded">
                        <h3 className="text-center mb-4">Sign In</h3>
                        <FastField id="login" name="login" placeholder="Username or Email" label="Username or Email" type="text" component={FormField.InputField1} />
                        <FastField id="password" name="password" placeholder="Password" label="Password" type="password" component={FormField.InputField1} />
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe" name="rememberMe" onChange={handleChange} />
                            <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                        </div>
                        <div className="d-grid mt-4">
                            <button type="submit" className="btn btn-primary rounded-pill">
                                Login
                            </button>
                            <hr />
                            <button type="button" className="btn btn-danger rounded-pill">
                                <i className="fa fa-google" aria-hidden="true"></i> Login with Google
                            </button>
                            <button type="button" className="btn btn-primary rounded-pill mt-3">
                                <i className="fa fa-facebook" aria-hidden="true"></i> Login with Facebook
                            </button>
                            <hr />
                            <a className="forgot-password text-center" href="#">
                                Forgot Password?
                            </a>
                            <a className="forgot-password text-center" href="#">
                                Create an Account!
                            </a>
                        </div>
                        {loading && <FullPageLoader />}
                    </Form>
                );
            }}
        </Formik>
    );

};

export default Login;
