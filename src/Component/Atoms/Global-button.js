import React from 'react'
import { Button } from 'react-bootstrap'

function GlobalButton({ name, type, className, variant, bgColor, onClick }) {
    return (
        <Button
            variant={variant}
            type={type}
            className={className}
            onClick={onClick}
        >
            {name}
        </Button>
    )
}

export default GlobalButton;