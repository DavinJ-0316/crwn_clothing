import React from 'react';
import './menu-item.styles.scss';
import { withRouter } from 'react-router-dom';

const MenuItem = ({title, imageUrl, size, history, linkUrl, match})=>(
    <div className={`${size}  menu-item`} onClick={()=>{history.push(`${match.url}${linkUrl}`)}}>
            <div className='background-image'style={{
                backgroundImage: `url(${imageUrl}`
            }}/>
            <div className='content'>
                    <h1 className='title'>{title.toUpperCase()}</h1>
                    <span className='subtitle'>SHOP NOW</span>
            </div>
    </div>
)
export default withRouter(MenuItem);
// it would return us back a super powered menu item component 
//with access to those location match and history props that we need access to