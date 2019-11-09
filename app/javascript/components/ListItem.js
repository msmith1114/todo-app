import React, { Component } from 'react';

const ListItem = (props) =>
    <div className="list-item" >
        {props.listItem.content}
        <button className="float-right btn btn-outline-danger btn-sm" onClick={() => props.removeListItem(props.listItem.id)}>Delete</button>
    </div>
    
export default ListItem;