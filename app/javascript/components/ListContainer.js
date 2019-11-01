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
            console.log("Response")
            console.log(response)
            const lists = this.state.lists.map((list) => {
                if(list.id == id)
                {
                    list.isEditing = false
                }
                return list
            })
            //this.setState({lists})
        })
        .catch(error => {
            console.log(error)
        })
        this.setState({lists})
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
            {console.log(this.state)}
                {this.state.lists.map( list => {
                    if(list.isEditing == false)
                        {
                            return (<List list={list} key={list.id} onRemoveList={this.removeList} onUpdateList={this.editList} />)
                        }
                    else
                        {
                            return (<ListForm handleSubmit={this.updateList} key={list.id} title={list.title} description={list.description} id={list.id}  />)
                        }

                })}
                <ListForm handleSubmit={this.addNewList} />
            </div>
        )
    }
}

export default ListContainer;