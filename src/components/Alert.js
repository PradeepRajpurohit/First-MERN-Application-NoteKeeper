import React from 'react'

export default function Alert(props) {
        const capital = (type) =>{
            let newType = type.toLowerCase();
            return newType.charAt(0).toUpperCase() + newType.slice(1);
        }
        return (
            <div style={{height : 50}}>
            {props.alert && <div className={`alert alert-${props.alert.type} fade show`} role="alert">
                <strong>{capital(props.alert.type)}</strong> : {props.alert.msg}
            </div>}
            </div>
    )
}
