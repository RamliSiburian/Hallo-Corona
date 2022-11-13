import React from 'react'
import { Form } from 'react-bootstrap';

function GlobalForm({ defaultValue, name, onChange, className, type, placeholder, required, autofocus, autocomplete, disabled, hidden, id }) {
    return (
        <Form.Control
            name={name}
            onChange={onChange}
            className={className}
            defaultValue={defaultValue}
            type={type}
            hidden={hidden}
            placeholder={placeholder}
            required={required}
            autoFocus={autofocus}
            autoComplete={autocomplete}
            disabled={disabled}
        />
    )
}

export default GlobalForm;