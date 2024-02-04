import React from 'react'
const capatilized = (word) => {
    if(word==='danger')
    {
        word = 'danger'
    }
    let lower = word.toLowerCase();
    return lower[0].toUpperCase() + lower.slice(1);
}
const Alert = (props) => {
    return (
        <div style={{height:"50px"}}>
            {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
                <strong>{capatilized(props.alert.type)}:{props.alert.message}</strong>
            </div>}
        </div>
    )
}

export default Alert
