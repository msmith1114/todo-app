import React, { Component } from 'react';

const ListItem = (props) =>
    <div className="list-item" >
        <p>List Item:{props.listItem.content}</p>
    </div>
    
export default ListItem;