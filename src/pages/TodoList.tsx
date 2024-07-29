import { useEffect, useId, useState } from "react"
import CreateTask from "../components/CreateTask"
import ListJumbotron from "../components/ListJumbotron"
import Navbar from "../components/navigation/Navbar"
import TaskList from "../components/TaskList"
import useInput from "../hooks/useInput"
import { TODO_STATUS } from "../utils/enums"
import { LOCAL_STORAGE_KEY } from "../utils/constants"
import useFetch from "../hooks/useFetch"

// const TASKS = [
//     {
//         topic: "Change the PS5 controller settings to use analog only",
//         description: "Use the big plybox to take out the controller. Then follow the steps in the videos that have been listed on YouTube playlists to make sense of it all Lorem ipsum dolor sit amet consectetur adipisicing elit.At, dolor!",
//         status: "in-progress",
//         dateCreated: "12 Mon June 2024", // use today if date created is today
//         id: 1
//     },
//     {
//         topic: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, maiores?",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ducimus sint quia officia reiciendis repellendus? Minima, quibusdam nobis incidunt voluptatem eligendi provident doloremque officiis reprehenderit quaerat deleniti nesciunt, quisquam obcaecati voluptatum excepturi soluta consequatur, inventore blanditiis. Cumque nesciunt voluptates non libero impedit, nisi, commodi optio blanditiis maiores nostrum deleniti! Eligendi?",
//         status: "done",
//         dateCreated: "12 Mon June 2024",
//         id: 2
//     },
//     {
//         topic: "Lorem ipsum dolor sit amet",
//         description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa dolores ullam rem nisi! Fugit cumque optio eius neque dicta obcaecati quam sed laudantium quibusdam, eaque aut voluptatibus fugiat. Explicabo dolor voluptas sapiente alias doloremque nostrum, ducimus natus eum eos, tempora animi blanditiis maiores error saepe vero voluptatem eius aut reiciendis corrupti corporis beatae! Obcaecati modi nesciunt ratione error, in natus?",
//         status: "not-started",
//         dateCreated: "16 June 2024",
//         id: 3
//     },
//     {
//         topic: "Lorem, ipsum dolor",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, alias corporis maiores odit velit ullam error accusamus molestiae, quidem eos libero odio quae sed distinctio, eum earum perspiciatis quod aliquam dolor laborum nobis est. Odit, autem voluptatibus omnis molestias magni, dolorum cum est dignissimos ipsa amet aspernatur, voluptatem harum praesentium doloribus aperiam quod exercitationem reiciendis ipsam. Aut necessitatibus ducimus, voluptate aliquam aliquid dolorem labore iure natus, obcaecati nihil soluta, deserunt totam sit corrupti ullam pariatur illo non perspiciatis impedit error.",
//         status: "done",
//         dateCreated: "14 Mon June 2024",
//         id: 4
//     },
// ]

// const TASKS = []


const TodoList = () => {
    const [taskList, setTaskList] = useState<[]>([])
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false)
    const taskTopic = useInput("")
    const taskDescription = useInput("")
    const [loading, setLoading] = useState<boolean>(false)
    // const {data} = useFetch('https://jsonplaceholder.typicode.com/posts')

    const toggleCreateForm = () => setShowCreateForm(show => !show)

    const loadSavedTasks = () => {
        const tasks = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (tasks)
            setTaskList(JSON.parse(tasks))
    }

    useEffect(() => {
        // Load tasks if any
        loadSavedTasks()
    }, [])

    const getTaskID = () => {
        if (!taskList.length) return 1
        const lastTaskID = taskList[taskList.length - 1]?.id
        return Number(lastTaskID) + 1
    }

    const createTodo = () => {
        // take topic and description and store in localStorage
        setLoading(true)

        const newTodo = {
            topic: taskTopic?.value,
            description: taskDescription?.value,
            dateCreated: new Date(),
            status: TODO_STATUS.NOT_STARTED,
            id: getTaskID()
        }

        taskTopic.reset()
        taskDescription.reset()

        const createdTodo = [...taskList, newTodo]

        setTaskList(createdTodo)

        setTimeout(() => setLoading(false), 100)

        // store list to local storage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(createdTodo))
    }

    const deleteTodo = (id: number) => {
        const filteredTasks = taskList.filter(task => task?.id !== id)
        setTaskList(filteredTasks)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredTasks))
    }

    const determineNextStatus = (currentStatus: string) => {
        switch (currentStatus) {
            case TODO_STATUS.NOT_STARTED:
                return TODO_STATUS.IN_PROGRESS
            case TODO_STATUS.IN_PROGRESS:
                return TODO_STATUS.COMPLETED
            default:
                return TODO_STATUS.NOT_STARTED
        }
    }

    const updateTodoStatus = (id: number) => {
        if (!id) console.error('ID Required')
        const tasks = taskList.map(task => task?.id === id ? { ...task, status: determineNextStatus(task?.status) } : task)
        setTaskList(tasks)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
    }

    return (
        <div className="todo_list w-full md:w-3/4 mx-auto px-2">
            {/* <Navbar /> */}
            <header className="todo_header pt-2 w-full mx-auto">
                <ListJumbotron taskList={taskList} />
            </header>
            <main className="w-full md:w-2/3 lg:w-2/4 2xl:w-2/6  mx-auto">
                {taskList.length || showCreateForm ? (
                    <CreateTask
                        loading={loading}
                        createTodo={createTodo}
                        topic={{ value: taskTopic.value, handleTopic: taskTopic.onInputChange }}
                        description={{ value: taskDescription.value, handlDescription: taskDescription.onInputChange }} />
                ) : null}
                <TaskList
                    updateTodoStatus={updateTodoStatus}
                    deleteTodo={deleteTodo}
                    taskList={taskList ?? []}
                    showCreateForm={showCreateForm}
                    toggleCreateForm={toggleCreateForm}
                />
            </main>

        </div>
    )
}

export default TodoList