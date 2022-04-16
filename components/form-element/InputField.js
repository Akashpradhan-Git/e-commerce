import React from "react";

const InputField = ({ value, label, name, placeholder, type = text, onChange, readonly = "" }) => (
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
    </div>
);

export default InputField;