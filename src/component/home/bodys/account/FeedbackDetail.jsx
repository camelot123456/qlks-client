import FormField from "src/component/custom/FormField";
import FullPageLoader from "src/component/custom/FullPageLoader";
import { FastField, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { findById, update } from "src/redux/slice/feedback-slice";
import * as Yup from "yup";

const FeedbackDetail = () => {

    const { loading, error, feedback } = useSelector(state => ({ ...state.feedback }));
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(findById(id));
    }, [id]);

    const initialValues = {
        rating: feedback?.rating || 0,
        content: feedback?.content || '',
    }

    const validationSchema = Yup.object().shape({
        content: Yup.string(),
        rating: Yup.number(),
    });

    const handleSubmit = (values) => {
        const feedbackForm = {
            rating: values.rating,
            content: values.content,
            id
        };

        dispatch(update(feedbackForm))
            .then(resp => {
                if (!resp?.error) {
                    toast.success('Đã cập nhập');
                    navigate(-1);
                } else toast.error('Đã xãy ra lỗi');
            });
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
                        <Form className="bg-light rounded p-3 border mt-3">
                            <h3 className='mb-4'>Đánh giá phòng</h3>
                            <FastField id="rating" name="rating" label="Rating" placeholder="Rating" type="number"
                                    min="0" max="10"
                                    component={FormField.InputField1} value={values.rating}/>
                            <FastField id="content" name="content" label="Content" placeholder="Content" type="text"
                                    component={FormField.InputField1} value={values.content}/>
                            <div className="mt-4 text-end">
                                {errors !== true && <button type='submit' className='btn btn-outline-primary'>ĐÁNH GIÁ</button>}
                            </div>
                            {loading && <FullPageLoader/>}
                        </Form>
                    )
                }}

            </Formik>
        </>
    );
};

export default FeedbackDetail;
