import {FastField, Form, Formik} from 'formik';
import FormField from '../../../custom/FormField';
import './HeaderSlice.css';
import * as Yup from "yup";
import {addTimeSuffixes} from "../../../../util/util";
import {useDispatch, useSelector} from "react-redux";
import {roomtypeFilter} from "../../../../redux/slice/roomtype-slice";
import {login} from "../../../../redux/slice/user-jwt-slice";
import {useEffect} from "react";

const HeaderSlice = () => {

    const mapData = [
        {
            key: 1,
            value: 'Room 1',
        },
        {
            key: 2,
            value: 'Room 2',
        },
        {
            key: 3,
            value: 'Room 3',
        },
        {
            key: 4,
            value: 'Room 4',
        },
        {
            key: 5,
            value: 'Room 5',
        },
    ];

    const dispatch = useDispatch();
    const {roomtypeSearch, loading, error} = useSelector(state => ({...state.roomtype}));

    useEffect(() => {

    }, [loading, error, roomtypeSearch]);

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
        idRoomType: Yup.number(),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values => {
                let filterForm = {
                    checkin: addTimeSuffixes(values.checkin),
                    checkout: addTimeSuffixes(values.checkout, '12:00:00'),
                    adultGuest: values.adultGuest || 1,
                    childGuest: values.childGuest || 0,
                    idRoomType: values.idRoomType
                };

                dispatch(roomtypeFilter(filterForm))
                    .then(res => {
                        console.log(res);
                    });
            })}
        >
            {(formikProps) => {
                const {errors, values, touched, handleSubmit, handleBlur, handleChange} = formikProps;
                return (
                    <div className='header-container'>
                        <div className="image-container" />
                        <Form className='d-flex justify-content-around align-items-center form-filter'>
                            <FastField id="checkin" name="checkin" placeholder="Checkin" label="Checkin" type="date"
                                       onChange={handleChange} component={FormField.InputField2}/>
                            <FastField id="checkout" name="checkout" placeholder="checkout" label="checkout" type="date"
                                       onChange={handleChange} component={FormField.InputField2}/>
                            <FastField id="adultGuest" name="adultGuest" placeholder="Adult guest" label="Adult guest"
                                       type="number" min={1} max={20} component={FormField.InputField2}/>
                            <FastField id="childGuest" name="childGuest" placeholder="Child guest" label="Child guest"
                                       type="number" min={0} max={20} component={FormField.InputField2} def/>
                            <FastField id="idRoomType" name="idRoomType" placeholder="Room type" label="Room type"
                                       type="text" mapData={mapData} onChange={handleChange} component={FormField.SelectField}/>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-light rounded-pill">Filter</button>
                            </div>
                        </Form>
                    </div>
                )
            }}
        </Formik>
    );
};

export default HeaderSlice;