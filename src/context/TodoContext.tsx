import { createContext, useState } from "react"

export const TodoContext = createContext({})

const TodoContextProvider = (props) => {
    const [newTaskTopic, setNewTaskTopic] = useState("")
    const [newTaskDescription, setNewTaskDescription] = useState("")

    function changeTaskTopic(topic: string) {
        setNewTaskTopic(topic)
    }

    function changeTaskDescription(description: string) {
        setNewTaskDescription(description)
    }

    const contextActions = {
        changeTaskDescription,
        changeTaskTopic,
        taskTopic: newTaskTopic,
        taskDescription: newTaskDescription
    }
    
    return (
        <TodoContext.Provider value={contextActions}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoContextProvider