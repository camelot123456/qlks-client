import React from "react";

function InputField(props) {
    const { field, form, type, label, placeholder, disabled, min, max } = props;

    const { name, value, onChange, onBlur } = field;

    const { errors, touched } = form
    const showError = errors[name] && touched[name];

    return (
        <div className="form-floating mb-3">
            <input type={type} className="form-control" id={name} placeholder={placeholder} value={value}
                onChange={onChange} onBlur={onBlur} disabled={disabled} min={min} max={max}
                style={{ minWidth: '200px' }} />
            <label htmlFor={name}>{label}</label>
            {showError && <p style={{ color: 'red', fontSize: '12px' }}>{errors[name]}</p>}
        </div>
    );
}

function InputField1(props) {
    const { field, form, type, label, placeholder, disabled, min, max } = props;

    const { name, value, onChange, onBlur } = field;

    const { errors, touched } = form
    const showError = errors[name] && touched[name];

    return (
        <div className="form-floating mb-3">
            <input type={type} className="form-control rounded-pill" id={name} placeholder={placeholder} value={value}
                onChange={onChange} onBlur={onBlur} disabled={disabled} min={min} max={max}
                style={{ minWidth: '200px' }} />
            <label htmlFor={name}>{label}</label>
            {showError && <p style={{ color: 'red', fontSize: '12px' }}>{errors[name]}</p>}
        </div>
    );
}

function InputField2(props) {
    const { field, form, type, label, placeholder, disabled, min, max } = props;

    const { name, value, onChange, onBlur } = field;

    return (
        <div className="form-floating mb-3">
            <input type={type} className="form-control" id={name} placeholder={placeholder} value={value}
                onChange={onChange} onBlur={onBlur} disabled={disabled} min={min} max={max}
                style={{ minWidth: '200px' }} />
            <label htmlFor={name}>{label}</label>
        </div>
    );
}

function TextareaField(props) {
    const { field, form, type, label, placeholder, disabled } = props;
    const { name, value, onChange, onBlur } = field;

    return (
        <div className="form-floating mt-2 bg-light">
            <textarea
                className="form-control"
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                disabled={disabled}
            />
            <label htmlFor={name}>{label}</label>
        </div>
    );
}

function SelectField(props) {
    const { field, form, type, label, placeholder, disabled, mapData } = props;
    const { name, value, onChange, onBlur } = field;

    return (
        <div mt={2}>
            <select className="form-select form-select-lg mb-3"
                name={name}
                style={{ minHeight: '58px', minWidth: '200px' }}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}>
                <option defaultValue value={''}>Open this select menu</option>
                {mapData && mapData.map(item => (
                    <option key={item.key} value={item.key}>{item.value}</option>
                ))}
            </select>
        </div>
    );
}

function SelectField1(props) {
    const { field, form, type, label, placeholder, disabled, mapData } = props;
    const { name, value, onChange, onBlur } = field;

    return (
        <div className="mt-3">
            <select className="form-select form-select-lg mb-3 rounded-pill"
                name={name}
                style={{ minHeight: '58px', minWidth: '200px' }}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}>
                <option defaultValue value={''}>Open this select menu</option>
                {mapData && mapData.map(item => (
                    <option key={item.key} value={item.key}>{item.value}</option>
                ))}
            </select>
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

export default { 
    InputField, 
    TextareaField, 
    FileField, 
    InputField1, 
    InputField2, 
    SelectField,
    SelectField1
};
