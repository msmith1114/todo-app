import React, { Component } from 'react';
import axios from 'axios';
import ListItem from './ListItem';


class List extends Component { 
    constructor(props){
        super(props)
        this.state = {
            listItems: [],
            newItem: ''
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
            this.setState({
                listItems: listItems,
                newItem: ''
            })
            console.log("state of list")
            console.log(this.state)
            
        })
        .catch(error => {
            console.log(error)
        })
    }

    removeListItem = (listItem_id) => {
        console.log("listItem_id :" + listItem_id);
        axios.delete(`/api/v1/list_items/${listItem_id}`)
        .then(response => {
            console.log(response);
            const listItems = this.state.listItems.filter(
                listItem => listItem.id !== listItem_id
            )
            this.setState({listItems})
            
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleChange = (e) => {
        this.setState({ newItem: e.target.value });
      }
    
    render() {
        return (
            <div  key={this.props.list.id}>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{this.props.list.title}</h4>
                    <p className="card-text">{this.props.list.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    {this.state.listItems.map( listItem => {
                        return <li className="list-group-item" key={listItem.id}><ListItem listItem={listItem} removeListItem={this.removeListItem}/></li>
                    })}
                </ul>
            </div>
                <form>
                    <div className="form-group listitem-input">
                        <input className="form-control" placeholder="...." value={this.state.newItem} onChange={this.handleChange}/>
                    </div>
                        <button type="button" className="btn btn-primary btn-sm mx-1" onClick={() => this.addNewListItem(this.props.list.id, this.state.newItem)}>Add Item</button>
                        <button type="button" className="btn btn-info btn-sm mx-1" onClick={() => this.props.UpdateList(this.props.list.id)}>Update</button>
                        <button type="button" className="btn btn-danger btn-sm mx-1" onClick={() => this.props.RemoveList(this.props.list.id)}>Erase</button>
                </form>
            </div>
            
        )
    }
}
    
export default List;