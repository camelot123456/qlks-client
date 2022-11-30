import { FastField, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAllObjectSelect } from "../../../../../redux/slice/roomtype-slice";
import FormField from "../../../../custom/FormField";
import {ROOM_STATE} from '../../../../../constants/roomstate';
import { roomConsole } from "../../../../../redux/slice/room-slice";
import { addTimeSuffixes } from "../../../../../util/util";

const SearchTool = () => {

    const dispatch = useDispatch();
    const roomtypeReducer = useSelector(state => ({ ...state.roomtype }));
    const roomtypeSelect = roomtypeReducer.roomtypeSelect;
    const pageable = roomtypeReducer.pageable;

    useEffect(() => {
        dispatch(findAllObjectSelect());
    }, []);

    const initialValues = {
        roomName: '',
        idRoomType: '',
        floor: '',
        minGuest: 0,
        maxGuest: 100,
        datetime: '',
        states: []
    };

    const handleSubmit = (values) => {
        console.log(values.datetime);
        const filterForm = {
            roomName: values.roomName,
            idRoomType: values.idRoomType,
            floor: values.floor || '',
            minGuest: values.minGuest || 0,
            maxGuest: values.maxGuest || 100,
            datetime: values.datetime,
            states: values.states.join(',')
        };
        dispatch(roomConsole(filterForm));
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => handleSubmit(values)}
            >
                {(formikProps) => {
                    const { errors, values, touched, handleSubmit, handleBlur, handleChange } = formikProps;
                    return (
                        <Form>
                            <div className="hstack gap-3">
                                <FastField id="roomName" name="roomName" placeholder="Số phòng" label="Số phòng" type="text"
                                    onChange={handleChange} component={FormField.InputField2} />
                                <FastField id="minGuest" name="minGuest" placeholder="Khách (min)" label="Khách (min)" type="number"
                                    min={0} onChange={handleChange} component={FormField.InputField2} />
                                <FastField id="maxGuest" name="maxGuest" placeholder="Khách (max)" label="Khách (max)" type="number"
                                    min={0} onChange={handleChange} component={FormField.InputField2} />
                                <FastField id="datetime" name="datetime" placeholder="Thời gian" label="Thời gian" type="date"
                                    onChange={handleChange} component={FormField.InputField2} />
                                <div className="">
                                    <select id='idRoomType' name="idRoomType" className="form-select form-select-lg mb-3"
                                        onChange={handleChange} style={{ minHeight: '58px', minWidth: '200px' }}>
                                        <option value={''}>Tất cả tầng</option>
                                        {roomtypeSelect && roomtypeSelect.map((itemSelect, index) => (
                                            <option key={itemSelect.id} value={index + 1}>{index + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="">
                                    <select id='floor' name="floor" className="form-select form-select-lg mb-3"
                                        onChange={handleChange} style={{ minHeight: '58px', minWidth: '200px' }}>
                                        <option value={''}>Tất cả phòng</option>
                                        {roomtypeSelect && roomtypeSelect.map(itemSelect => (
                                            <option key={itemSelect.id} value={itemSelect.id}>{itemSelect.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex align-content-start flex-wrap">
                                {ROOM_STATE.map(state => (
                                    <div key={state.name} className="form-check me-4">
                                        <Field className="form-check-input" type="checkbox" name="states" value={state.name} id={state.name} />
                                        <label className="form-check-label border rounded" htmlFor={state.name}>
                                            {state.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <button type="submit" className="btn btn-outline-primary">LỌC</button>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
};

export default SearchTool;
