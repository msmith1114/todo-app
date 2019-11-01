import React, { Component } from 'react';

const ListItem = ({list ,addNewListItem=f=>f}) =>
    <div className="list-item" >
    <button onClick={() => addNewListItem(list.id, "test")}>Add</button>
    </div>
    
export default ListItem;