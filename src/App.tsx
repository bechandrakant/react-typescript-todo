import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

type formElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string,
  completed: boolean
}

function App(): JSX.Element {
  const [value, setValue] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])

  const handleSubmit = (e: formElem) => {
    e.preventDefault()
    addTodo(value)
    setValue('')
  }

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, {text, completed: false}]
    console.log(newTodos)
    setTodos(newTodos)
  }

  useEffect(() => {}, [todos])

  const removeTodo = (index: number): void => {
    console.log(todos.splice(index, 1));
    console.log(todos)
    setTodos(todos)
  }

  return (
    <Fragment>
      <h1>Todo List App in React and Typescript</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' value={value} onChange={e => setValue(e.target.value)} placeholder='add todo..' required/>
        <button>Add todo</button>
      </form>
      <section>
        {
          todos.map((todo: ITodo, index: number) => 
            <div className='todo-item' key={index}>
              <input type='checkbox' {...todo.completed && 'checked'} onClick={e => {todo.completed = !todo.completed; console.log(todos)}}/>
              {todo.text}

              <button className='remove' onClick={e => removeTodo(index)}>x</button>
            </div>)
        }
      </section>
    </Fragment>
  );
}

export default App;
