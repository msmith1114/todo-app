import React, { Component } from 'react';
import axios from 'axios';
import List from './List';
import ListForm from './ListForm'

class ListContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            lists: []
        }
    }


    componentDidMount() {
        axios.get('/api/v1/lists.json')
        .then(response => {
            console.log(response.data)
            this.setState({
                lists: response.data.map(list => list = {...list, isEditing: false})
            })
            console.log(this.state)
        })
        .catch(error => console.log(error))
    }

    addNewList = (title, description) => {
        axios.post('/api/v1/lists.json', {
            title: title,
            description: description
          })
        .then(response => {
            console.log(response)
            console.log(...this.state.lists)
            console.log(this.state.lists)
            const lists = [ ...this.state.lists, response.data ]
            this.setState({lists})
        })
        .catch(error => {
            console.log(error)
        })
    }

    editList = (id) => {
        console.log(`Setting ${id} to editable`)
        const lists = this.state.lists.map((list) => {
            if(list.id == id)
            {
                list.isEditing = true
            }
            return list
        })
        console.log(lists)
        this.setState({lists})
        console.log("Updated lists")
        console.log(this.state)
    }

    updateList = (title, description, id) => {
        console.log(`Updating list ${id}`)
        axios.put('/api/v1/lists/' + id, {
            title: title,
            description: description
        })
        .then(response => {
            console.log(response)
            const lists = this.state.lists.map((list) => {
                if(list.id === id)
                {
                    list.title = title
                    list.description = description
                    list.isEditing = false
                }
                return list
            })
            this.setState({lists})
        })
        .catch(error => {
            console.log(error)
        })

    }

    removeList = (id) => {
        axios.delete( '/api/v1/lists/' + id )
        .then(response => {
            const lists = this.state.lists.filter(
                list => list.id !== id
            )
            this.setState({lists})
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="lists-container">
                <div className="row mt-4">
                    {this.state.lists.map( list => {
                        if(list.isEditing == true)
                            {
                                
                                return (
                                    <div className="col-6 mt-2 mb-2" key={list.id} >
                                        <ListForm handleSubmit={this.updateList} title={list.title} description={list.description} id={list.id}  />
                                    </div>
                                )
                            }
                        else
                            {
                                
                                return (
                                    <div className="col-6 mt-2 mb-2" key={list.id} >
                                        <List list={list}onRemoveList={this.removeList} UpdateList={this.editList} />
                                    </div>
                                )
                            }
                    })}
                </div>
                <div className="lists-new-form mt-5">
                    <ListForm handleSubmit={this.addNewList} />
                </div>
            </div>
        )
    }
}

export default ListContainer;