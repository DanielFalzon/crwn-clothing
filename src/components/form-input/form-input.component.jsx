import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps}) => (
    <div className="group">
        <input className='form-input' onChange={handlechange} {...otherProps} />
        {
            label ? 
            (<label className={`${otherProps.value.length}` ? 'strink' : ''} form-input-label>

            </label>)
            : null
        }
    </div>
)
