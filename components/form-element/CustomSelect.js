import React from 'react'
import Select from 'react-select'

const CustomSelect = ({ label, options, onChange, defaultValue, isMulti, error = null }) => {
    console.log("---->>>>>", defaultValue);
    return <div className="form-group">
        {label && <label htmlFor="input-field">{label}</label>}
        <Select
            isMulti={isMulti}
            options={options}
            onChange={onChange}
            defaultValue={defaultValue}
            id="long-value-select" instanceId="long-value-select"
        />
        {error && <small className="text-danger">{error}</small>}
    </div>
}

export default CustomSelect