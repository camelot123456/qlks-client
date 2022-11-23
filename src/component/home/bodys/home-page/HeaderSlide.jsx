import { FastField, Form, Formik } from 'formik';
import FormField from '../../../custom/FormField';
import './HeaderSlice.css';

const HeaderSlice = () => {
    return (
        <Formik>
            {(formikProps) => {
                return (
                    <div className='header-container'>
                        <div className="image-container"></div>
                        <Form className='d-flex justify-content-around align-items-center form-filter'>
                            <FastField id="login" name="login" placeholder="Username or Email" label="Username or Email" type="text" component={FormField.InputField} />
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>
                            <div class="mb-3">
                                <button type="button" class="btn btn-primary">Filter</button>
                            </div>
                        </Form>
                    </div>
                )
            }}
        </Formik>
    );
};

export default HeaderSlice;