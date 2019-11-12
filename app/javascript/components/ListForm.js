import React, { Component } from 'react';

class ListForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id: props.id || '',
        title: props.title || '',
        description: props.description || ''
      };
    }
  
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        this.props.handleSubmit(this.state.title, this.state.description, this.state.id);
        e.preventDefault();
        this.setState({
          title: '',
          description: ''
        });
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="newListTitle">List Title</label>
          <input id="newListTitle" className="form-control" name="title" type="text" value={this.state.title} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="newListDescription">List Description</label>
          <textarea id="newListDescription" className="form-control" name="description" value={this.state.description} onChange={this.handleChange} />
        </div>
          <input type="submit" className="btn btn-primary" value="New List" />
        </form>
      );
    }
  }

  export default ListForm;