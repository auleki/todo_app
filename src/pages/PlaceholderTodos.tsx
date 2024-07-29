import { useEffect, useState } from "react"
import useFetch from "../hooks/useFetch"

const PlaceholderTodos = () => {
    const {data, isLoading} = useFetch('https://jsonplaceholder.typicode.com/posts')
    const [todos, setTodos] = useState<[]>([])

    useEffect(() => {
        setTodos(data)
    }, [data])
    
  return (
    // <div>PlaceholderTodos - {data.length}</div>
    <div className="p-2">
        <section className="text-2xl font-bold mb-10">JSON Placeholder Todos</section>
        <section>
        {data.map(todo => (
            <div key={todo?.id} className="mb-4">
                <h3 className="text-xl">Title: {todo?.title}</h3>
                <p>Body: {todo?.body}</p>
                <hr />
            </div>
        ))}
        </section>
    </div>
  )
}

export default PlaceholderTodos