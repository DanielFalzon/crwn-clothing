import React from 'react'

import CollectionItem from '../collection-item/collection-item.component';
import { withRouter } from 'react-router-dom';

import './collection-preview.styles.scss';

//Performance concern since all the function calls will always get called with every re render of the component 
const CollectionPreview = ({items, title, routeName, history}) => { 
    console.log(history);
    return (
    <div className='collection-preview'>
        <h1 className='title collection-preview-link' onClick={() =>
            history.push(`${history.location.pathname}/${routeName}`)
        }>
            {title.toUpperCase()}
        </h1>
        <div className='preview'>
            {
                items.filter(
                    (item, idx) => idx < 4).map(
                        (item) => (
                        <CollectionItem key={item.id} item={item} />
                    ))
            }
        </div>
    </div>
)
}
export default withRouter(CollectionPreview);