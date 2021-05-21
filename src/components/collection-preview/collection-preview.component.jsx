import React from 'react'

import './collection-preview.styles.scss';

//Performance concern since all the function calls will always get called with every re render of the component 
const CollectionPreview = ({title, items}) => (
    <div className='collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview'>
            {
                items
                    .filter((item, idx) => idx < 4)
                    .map((item) => (
                        <div key={item.id} >{item.name}</div>
                    ))
            }
        </div>
    </div>
)

export default CollectionPreview;