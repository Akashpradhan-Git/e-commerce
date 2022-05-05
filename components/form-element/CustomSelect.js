import React from 'react'
import Select from 'react-select'

const CustomSelect = ({ label, name, options, onChange, defaultValue = null, isMulti, error = null, onBlur }) => {
    return <div className="form-group">
        {label && <label htmlFor="input-field">{label}</label>}
        <Select
            isMulti={isMulti}
            options={options}
            name={name}
            onChange={onChange}
            defaultValue={defaultValue}
            id="long-value-select"
            instanceId="long-value-select"

        />
        {error && <small className="text-danger">{error}</small>}
    </div>
}

export default CustomSelect