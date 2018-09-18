import React, { Component } from 'react';
import Todo from './Todo/Todo';
import TodoForm from './TodoForm/TodoForm';
import { DB_CONFIG } from './config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('todos');

    // We're going to setup the React state of our component
    this.state = {
      todos: [],
    }
  }

  componentWillMount(){
    const previousTodos = this.state.todos;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousTodos.push({
        id: snap.key,
        todoContent: snap.val().todoContent,
      })

      this.setState({
        todos: previousTodos
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousTodos.length; i++){
        if(previousTodos[i].id === snap.key){
          previousTodos.splice(i, 1);
        }
      }

      this.setState({
        todos: previousTodos
      })
    })
  }

  addTodo(todo){
    this.database.push().set({ todoContent: todo});
  }

  removeTodo(todoId){
    console.log("from the parent: " + todoId);
    this.database.child(todoId).remove();
  }

  render() {
    return (
      <div className="todoWrapper">
        <div className="todoHeader">
          <div className="heading">React & Firebase To-Do List</div>
        </div>
        <div className="todoBody">
          {
            this.state.todos.map((todo) => {
              return (
                <Todo todoContent={todo.todoContent} 
                todoId={todo.id} 
                key={todo.id} 
                removeTodo ={this.removeTodo}/>
              )
            })
          }
        </div>
        <div className="todoFooter">
          <TodoForm addTodo={this.addTodo} />
        </div>
      </div>
    );
  }
}

export default App;

