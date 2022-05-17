

import { useDispatch, useSelector } from 'react-redux'
import Link from "next/link"
import { getTodos } from "../../redux/slices/todo"
import { useEffect } from 'react'
import { deleteTodo, markAsDone } from '../../redux/slices/todo'

export default function Todos() {

    const state = useSelector(state => state.todo)

    const dispatch = useDispatch()



    useEffect(() => {
        fetch('http://localhost:8080/todos')
            .then(res => res.json())
            .then(data => dispatch(getTodos(data)))
    }, [])


    const onDelete = (id) => {

        fetch(`http://localhost:8080/todos/${id}`,
            {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                  },
            }).then(() => {
                dispatch(deleteTodo({id}))
            })

    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-6 offset-3">
                    <Link href="/todos/create">
                        <button className="btn btn-primary my-3">create new Todo </button>
                    </Link>
                </div>
            </div>
            <div className="row">

                <div className="col-6 offset-3">
                    <ul className="list-group">
                        {state.todos.map(({ title, done, id }, x) => (
                            <li key={x} className="list-group-item d-flex justify-content-between align-items-start">
                                <span className={done ? 'text-decoration-line-through' : ''}>  {title}</span>
                                <p>

                                    <button className="btn btn-light" onClick={() => onDelete(id)}>delete</button>
                                    <button className="btn btn-light" onClick={() => dispatch(markAsDone({ title }))} > mark as complate</button>
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    )
}

