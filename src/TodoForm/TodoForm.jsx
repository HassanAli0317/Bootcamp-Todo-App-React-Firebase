import React, { Component } from 'react';
import './TodoForm.css';

class TodoForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            newTodoContent: '',
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeTodo = this.writeTodo.bind(this)
    }

    handleUserInput(e){
        this.setState({
            newTodoContent: e.target.value,  //value of text input
        })
    }

    writeTodo(){
        //call method set todo content.
        this.props.addTodo(this.state.newTodoContent)

        this.setState({
            newTodoContent: '',
        })
    }

    render(){
        return(
            <div className="formWrapper">
                <input className="todoInput"
                placeholder="Enter Todo text.."
                value={this.state.newTodoContent}
                onChange={this.handleUserInput}/>
                <button className="todoButton"
                onClick={this.writeTodo}>Add Todo</button>
            </div>
        )
    }
}

export default TodoForm;

