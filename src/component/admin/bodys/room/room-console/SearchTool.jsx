import { FastField, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAllObjectSelect } from "../../../../../redux/slice/roomtype-slice";
import FormField from "../../../../custom/FormField";
import { ROOM_STATE } from "../../../../../constants/roomstate";
import {
  handleScheduleFilter,
  roomSchedule,
} from "../../../../../redux/slice/room-slice";
import moment from "moment/moment";

const SearchTool = () => {
  const dispatch = useDispatch();
  const roomtypeReducer = useSelector((state) => ({ ...state.roomtype }));
  const roomtypeSelect = roomtypeReducer.roomtypeSelect;
  const roomReducer = useSelector((state) => ({ ...state.room }));
  const pageableSchedule = roomReducer.pageableSchedule;

  useEffect(() => {
    dispatch(findAllObjectSelect());
  }, []);

  const initialValues = {
    roomName: "",
    idRoomType: "",
    floor: "",
    minGuest: 0,
    maxGuest: 100,
    from: moment(new Date()).startOf('month').format('YYYY-MM-DD'),
    to: moment(new Date()).endOf('month').format('YYYY-MM-DD'),
    states: ROOM_STATE.map(state => `${state.name}`),
  };

  const handleSubmit = (values) => {
    const filterForm = {
      roomName: values.roomName,
      idRoomType: values.idRoomType,
      floor: values.floor || "",
      minGuest: values.minGuest || 0,
      maxGuest: values.maxGuest || 100,
      from: values.from,
      to: values.to,
      states: values.states.join(",") || "",
      page: pageableSchedule.page || 0,
      size: pageableSchedule.size || 20,
      sort: pageableSchedule.sort || "idRoom,desc",
      search: pageableSchedule.search || "",
    };
    dispatch(handleScheduleFilter(filterForm));
    dispatch(roomSchedule(filterForm));
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
      >
        {(formikProps) => {
          const {
            errors,
            values,
            touched,
            handleSubmit,
            handleBlur,
            handleChange,
          } = formikProps;
          return (
            <Form>
              <div className="hstack gap-3">
                <FastField
                  id="roomName"
                  name="roomName"
                  placeholder="Số phòng"
                  label="Số phòng"
                  type="text"
                  onChange={handleChange}
                  component={FormField.InputField2}
                />
                <FastField
                  id="minGuest"
                  name="minGuest"
                  placeholder="Khách (min)"
                  label="Khách (min)"
                  type="number"
                  min={0}
                  onChange={handleChange}
                  component={FormField.InputField2}
                />
                <FastField
                  id="maxGuest"
                  name="maxGuest"
                  placeholder="Khách (max)"
                  label="Khách (max)"
                  type="number"
                  min={0}
                  onChange={handleChange}
                  component={FormField.InputField2}
                />
                <FastField
                  id="from"
                  name="from"
                  placeholder="Từ"
                  label="Từ"
                  type="date"
                  onChange={handleChange}
                  component={FormField.InputField2}
                  value={values.from}
                />
                <FastField
                  id="to"
                  name="to"
                  placeholder="Đến"
                  label="Đến"
                  type="date"
                  onChange={handleChange}
                  component={FormField.InputField2}
                  value={values.to}
                />
                <div className="">
                  <select
                    id="idRoomType"
                    name="idRoomType"
                    className="form-select form-select-lg mb-3"
                    onChange={handleChange}
                    style={{ minHeight: "58px", minWidth: "200px" }}
                  >
                    <option value={""}>Tất cả tầng</option>
                    {roomtypeSelect &&
                      roomtypeSelect.map((itemSelect, index) => (
                        <option key={itemSelect.id} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="">
                  <select
                    id="floor"
                    name="floor"
                    className="form-select form-select-lg mb-3"
                    onChange={handleChange}
                    style={{ minHeight: "58px", minWidth: "200px" }}
                  >
                    <option value={""}>Tất cả phòng</option>
                    {roomtypeSelect &&
                      roomtypeSelect.map((itemSelect) => (
                        <option key={itemSelect.id} value={itemSelect.id}>
                          {itemSelect.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle me-3"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  TRẠNG THÁI
                </button>
                <ul className="dropdown-menu">
                  {ROOM_STATE.map((state) => (
                    <li key={state.name}>
                      <div className="dropdown-item">
                        <Field
                          className="form-check-input me-3"
                          type="checkbox"
                          name="states"
                          value={state.name}
                          id={state.name}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={state.name}
                        >
                          {state.name}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
                <button type="submit" className="btn btn-outline-primary">
                  LỌC
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default SearchTool;
