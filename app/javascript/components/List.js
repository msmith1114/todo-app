import React, { Component } from 'react';
import axios from 'axios';
import ListItem from './ListItem';

const addNewListItem = (list_id, content) => {
    axios.post(`/api/v1/lists/${list_id}/list_items`, {
        content: content
      })
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
}

const List = ({list, onRemoveList=f=>f, onUpdateList=f=>f}) =>
    <div className="single-list" key={list.id}>
        <h4>{list.title}</h4>
        <p>{list.description}</p>
        {console.log(list)}
        <ListItem list={list} addNewListItem={addNewListItem}/>
        <button onClick={() => onRemoveList(list.id)}>Erase</button>
        <button onClick={() => onUpdateList(list.id)}>Update</button>
    </div>
    
export default List;