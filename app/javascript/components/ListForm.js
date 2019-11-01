import React, { Component } from 'react';

class ListForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id: props.id,
        title: props.title,
        description: props.description
      };
      console.log("Form state:")
      console.log(this.state)
    }
  
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        this.props.handleSubmit(this.state.title, this.state.description, this.state.id);
        e.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={this.state.description} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default ListForm;