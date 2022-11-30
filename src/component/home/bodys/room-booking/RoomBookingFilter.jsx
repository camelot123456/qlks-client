import { FastField, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import FormField from "../../../custom/FormField";
import * as Yup from 'yup';
import { useEffect } from "react";
import { findAllObjectSelect, roomtypeFilter } from "../../../../redux/slice/roomtype-slice";
import { addTimeSuffixes } from "../../../../util/util";
import { updateTimeBooking } from "../../../../redux/slice/booking-slice";

const RoomBookingFilter = () => {

    const dispatch = useDispatch();
    const { error, bookingRequest } = useSelector(state => ({ ...state.booking }));
    const { loading, roomtypeSelect } = useSelector(state => ({ ...state.roomtype }));

    useEffect(() => {
        dispatch(findAllObjectSelect());
    }, []);

    useEffect(() => {
    }, [loading, error, roomtypeSelect, bookingRequest]);

    const initialValues = {
        checkin: '',
        checkout: '',
        adultGuest: '',
        childGuest: '',
        idRoomType: ''
    };

    const validationSchema = Yup.object().shape({
        checkin: Yup.string(),
        checkout: Yup.string(),
        adultGuest: Yup.number().min(1).max(20),
        childGuest: Yup.number().min(0).max(20),
        idRoomType: Yup.string(),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values => {
                let filterForm = {
                    checkin: addTimeSuffixes(values.checkin, '14:00:00'),
                    checkout: addTimeSuffixes(values.checkout, '12:00:00'),
                    adultGuest: values.adultGuest || 1,
                    childGuest: values.childGuest || 0,
                    idRoomType: values.idRoomType || ''
                };
                dispatch(updateTimeBooking(filterForm));
                dispatch(roomtypeFilter(filterForm));
            })}
        >
            {(formikProps) => {
                const { errors, values, touched, handleSubmit, handleBlur, handleChange } = formikProps;
                return (
                    <div className='header-container'>
                        <div className="image-container" />
                        <Form className='d-flex justify-content-around align-items-center form-filter'>
                            <FastField id="checkin" name="checkin" placeholder="Ngày đặt" label="Ngày đặt" type="date"
                                onChange={handleChange} component={FormField.InputField2} />
                            <FastField id="checkout" name="checkout" placeholder="Ngày trả" label="Ngày trả" type="date"
                                onChange={handleChange} component={FormField.InputField2} />
                            <FastField id="adultGuest" name="adultGuest" placeholder="Người lớn" label="Người lớn"
                                type="number" min={1} max={20} component={FormField.InputField2} />
                            <FastField id="childGuest" name="childGuest" placeholder="Trẻ em" label="Trẻ em"
                                type="number" min={0} max={20} component={FormField.InputField2} />
                            <div className="">
                                <select id='idRoomType' name="idRoomType" className="form-select form-select-lg mb-3"
                                    onChange={handleChange} style={{ minHeight: '58px', minWidth: '200px' }}>
                                    <option value={''}>Tất cả</option>
                                    {roomtypeSelect && roomtypeSelect.map(itemSelect => (
                                        <option key={itemSelect.id} value={itemSelect.id}>{itemSelect.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-light rounded-pill">CHECK AVAILABILITY</button>
                            </div>
                        </Form>
                    </div >
                )
            }}
        </Formik >
    );
};

export default RoomBookingFilter;
