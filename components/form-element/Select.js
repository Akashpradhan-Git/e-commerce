import React from "react";

const Select = ({ value, label, name, placeholder, type = text, onChange, readonly = "", error = null }) => (

    <div className="form-group">
        {label && <label htmlFor="input-field">{label}</label>}
        <select name="status" disabled onChange={(evnt) => (handleChange(index, evnt))} className="form-control">
            {
                selectValue.map((data, index) => {
                    return (
                        <option key={index} value={data.isActive}>{data.isActive ? "True" : "False"}</option>
                    )
                })
            }
        </select>
        {error && <small className="text-danger">{error}</small>}
    </div >
);

export default Select;