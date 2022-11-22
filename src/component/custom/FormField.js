import React from "react";

function InputField(props) {
    const { field, form, type, label, placeholder, disabled } = props;

    const { name, value, onChange, onBlur } = field;

    const { errors, touched } = form
    const showError = errors[name] && touched[name];

    return (
        <div className="mb-3">
            {label && <label htmlFor="{name}" className="form-label">{label}</label>}
            <input type={type} className="form-control" id={name} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} disabled={disabled} />
            {showError && <p style={{ color: 'red', fontSize: '12px' }}>{errors[name]}</p>}
        </div>
    );
}

function InputField1(props) {
    const { field, form, type, label, placeholder, disabled } = props;

    const { name, value, onChange, onBlur } = field;

    const { errors, touched } = form
    const showError = errors[name] && touched[name];

    return (
        <div className="mb-3">
            <input type={type} className="form-control rounded-pill" id={name} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} disabled={disabled} />
            {showError && <p style={{ color: 'red', fontSize: '12px' }}>{errors[name]}</p>}
        </div>
    );
}

function TextareaField(props) {
    const { field, form, type, label, placeholder, disabled } = props;
    const { name, value, onChange, onBlur } = field;

    return (
        <div mt={2}>
            {label && <label htmlFor={name}>{label}</label>}
            <textarea
                size="sm"
                bg="white"
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    );
}

function FileField(props) {
    const { field, form, type, label, placeholder, disabled, accept } = props;
    const { name, value, onChange, onBlur } = field;

    return (
        <div mt={2}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                accept={accept}
                size="sm"
                bg="white"
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    );
}

export default { InputField, TextareaField, FileField, InputField1 };
