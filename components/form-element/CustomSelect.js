import React from 'react'
import Select from 'react-select'

const CustomSelect = ({ label, name, options, onChange, defaultValue = null, isMulti, error = null, reference, required = false }) => {

    return <div className="form-group">
        {label && <label htmlFor="input-field" className={required ? 'required' : ""}>{label}</label>}
        <Select
            isMulti={isMulti}
            options={options}
            name={name}
            onChange={onChange}
            defaultValue={defaultValue !== null && !isMulti ? options.filter(e => e.value == defaultValue)[0] : null}
            id="long-value-select"
            instanceId="long-value-select"
            ref={reference}
        />
        {error && <small className="text-danger">{error}</small>}
    </div>
}

export default CustomSelect