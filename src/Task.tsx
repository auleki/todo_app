import { useState } from "react"
import { PiCaretCircleDownFill, PiCaretCircleUpFill, PiTrashFill } from "react-icons/pi";
import { TODO_STATUS } from "./utils/enums";

const Task = ({ task, updateTodoStatus, deleteTodo }) => {
    const [showDescription, setShowDescription] = useState<boolean>(false)

    const toggleShowDescription = () => setShowDescription(show => !show)

    const formatDateText = (date: Date) => {
        if (new Date(date).toDateString() === new Date().toDateString())
            return 'Today'
        else
            return task.dateCreated.toDateString()

    }

    const determineStatusColor = (status: string) => {
        switch (status) {
            case TODO_STATUS.IN_PROGRESS:
                return 'text-orange-400'
            case TODO_STATUS.COMPLETED:
                return 'text-green-400'
            default:
                return ''
        }
    }

    // const closeDescription = () => setShowDescription(false)

    return (
        <div className="task flex flex-col">
            <section className="flex flex-col">

                <div className="flex items-start justify-between gap-2 hover:bg-black p-1 cursor-pointer rounded-md">
                    <p className={`${task?.status === TODO_STATUS.COMPLETED ? 'line-through text-orange-200' : ''} task_topic`}>
                        {task?.topic}
                    </p>
                    <div className="flex gap-1">
                        <button onClick={() => deleteTodo(task?.id)} className="hover:text-orange-600 mt-1"><PiTrashFill /></button>
                        <button
                            onClick={toggleShowDescription}
                            className="hover:text-orange-600 mt-1"
                        >
                            {showDescription ? <PiCaretCircleUpFill /> : <PiCaretCircleDownFill />}
                        </button>
                    </div>
                </div>
                {showDescription
                    ? (<p className="task_description mt-1 ml-1 text-sm text-orange-300">
                        {task?.description}
                    </p>
                    ) : null
                }
            </section>
            <div className="flex items-center justify-between">
                <p
                    className={`${showDescription ? 'ml-1' : 'ml-1'} task_created justify-end text-sm text-gray-500`}>
                    {formatDateText(task?.dateCreated)}
                </p>
                <p className={`${determineStatusColor(task?.status)} text-xs cursor-pointer`} onClick={() => updateTodoStatus(task?.id)}>
                    {task?.status.toUpperCase()}
                </p>
            </div>

        </div>
    )
}

export default Task