import React, { Component } from 'react';
import './Todo.css';
import PropTypes from 'prop-types';

class Todo extends Component{

    constructor(props){
        super(props);
        this.todoContent = props.todoContent; 
        this.todoId = props.todoId; 
        this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
    }

    handleRemoveTodo(id){
        this.props.removeTodo(id);
    }

    render(){
        return(
            <div className="todo fade-in">
                <span className="closebtn" 
                      onClick={() => this.handleRemoveTodo(this.todoId)}>
                      &times;
                </span>
                <p className="todoContent">{ this.todoContent }</p>
            </div>
        )
    }
}

Todo.propTypes = {
    todoContent: PropTypes.string
}

export default Todo;