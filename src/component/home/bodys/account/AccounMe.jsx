import React from "react";
import {Formik, Form, FastField} from "formik";
import FormField from "../../../custom/FormField";

const AccountMe = () => {
    const initialValues = {};
    const validateSchema = {};

    const handleSubmit = (values) => {

    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
            {(formikProps) => {
                const {errors, values, touched, handleSubmit, handleBlur, handleChange} = formikProps;
                return (
                    <Form className="mt-4 border rounded p-3">
                        <table className="table table-hover">
                            <tbody>
                            <tr>
                                <th scope="row">HỌ</th>
                                <td>
                                    <FastField id="roomName" name="roomName" placeholder="Số phòng" label="Số phòng"
                                               type="text"
                                               onChange={handleChange} component={FormField.InputField}/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">TÊN</th>
                                <td>
                                    <FastField id="roomName" name="roomName" placeholder="Số phòng" label="Số phòng"
                                               type="text"
                                               onChange={handleChange} component={FormField.InputField}/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">EMAIL</th>
                                <td>
                                    <FastField id="roomName" name="roomName" placeholder="Số phòng" label="Số phòng"
                                               type="text"
                                               onChange={handleChange} component={FormField.InputField}/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">GIỚI TÍNH</th>
                                <td>
                                    <FastField id="roomName" name="roomName" placeholder="Số phòng" label="Số phòng"
                                               type="text"
                                               onChange={handleChange} component={FormField.InputField}/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">SINH NHẬT</th>
                                <td>
                                    <FastField id="roomName" name="roomName" placeholder="Số phòng" label="Số phòng"
                                               type="text"
                                               onChange={handleChange} component={FormField.InputField}/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">ĐỊA CHỈ</th>
                                <td>
                                    <FastField id="roomName" name="roomName" placeholder="Số phòng" label="Số phòng"
                                               type="text"
                                               onChange={handleChange} component={FormField.InputField}/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">QUÊ HƯƠNG</th>
                                <td>
                                    <FastField id="roomName" name="roomName" placeholder="Số phòng" label="Số phòng"
                                               type="text"
                                               onChange={handleChange} component={FormField.InputField}/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">SỐ ĐIỆN THOẠI</th>
                                <td>
                                    <FastField id="roomName" name="roomName" placeholder="Số phòng" label="Số phòng"
                                               type="text"
                                               onChange={handleChange} component={FormField.InputField}/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">NGÔN NGỮ</th>
                                <td>
                                    <FastField id="roomName" name="roomName" placeholder="Số phòng" label="Số phòng"
                                               type="text"
                                               onChange={handleChange} component={FormField.InputField}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-outline-primary">CẬP NHẬP</button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
};

export default AccountMe;
