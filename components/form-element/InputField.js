import React from "react";

const InputField = ({ value, label, name, placeholder, type = text, onChange, readonly = "", error = null }) => (

    <div className="form-group">
        {label && <label htmlFor="input-field">{label}</label>}
        <input
            type={type}
            value={value}
            name={name}
            className="form-control form-control-sm"
            placeholder={placeholder}
            onChange={onChange}
            readOnly={readonly}
        />
        {error && <small className="text-danger">{error}</small>}
    </div >
);

export default InputField;