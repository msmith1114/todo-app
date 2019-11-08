import React, { Component } from 'react';
import axios from 'axios';
import ListItem from './ListItem';


class List extends Component { 
    constructor(props){
        super(props)
        this.state = {
            listItems: []
        }
    }

    componentDidMount() {
        axios.get(`/api/v1/lists/${this.props.list.id}/list_items.json`)
        .then(response => {
            console.log("Getting List 'listitems'")
            console.log(response.data)
            console.log(this.state.listItems)
            this.setState({
                listItems: response.data
            })
            console.log(this.state)
        })
        .catch(error => console.log(error))
    }

    addNewListItem = (list_id, content) => {
        axios.post(`/api/v1/lists/${list_id}/list_items`, {
            content: content
          })
        .then(response => {
            console.log(response)
            const listItems = [ ...this.state.listItems, response.data ]
            this.setState({listItems})
            console.log("state of list")
            console.log(this.state)
            
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    render() {
        return (
            <div className="single-list" key={this.props.list.id}>
                <h4>{this.props.list.title}</h4>
                <p>{this.props.list.description}</p>
                {console.log(this.props.list)}
                {this.state.listItems.map( listItem => {
                    return <ListItem key={listItem.id} listItem={listItem}/>
                })}
                <button onClick={() => this.props.onRemoveList(this.props.list.id)}>Erase</button>
                <button onClick={() => this.props.onUpdateList(this.props.list.id)}>Update</button>
                <button onClick={() => this.addNewListItem(this.props.list.id,"test")}>Add</button>
            </div>
        )
    }
}
    
export default List;