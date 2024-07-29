import Task from "../Task"
import Button from "./common/Button"

const TaskList = ({ taskList = [], toggleCreateForm, showCreateForm, updateTodoStatus, deleteTodo }) => {

    return (
        <section className="task_list w-full flex gap-4 flex-col lg:px-2 mt-6">
            <div>
                <h3 className="text-xl font-semibold">TASKS 💪🏽</h3>
            </div>
            {taskList.map(task => (
                <Task
                    task={task}
                    updateTodoStatus={updateTodoStatus}
                    key={task?.id}
                    deleteTodo={deleteTodo}
                />
            ))}

            {!taskList.length ? (
                <div className="flex items-center flex-col">
                    <h3 className="text-center">No Tasks</h3>
                    <div className="w-1/3">
                        {!showCreateForm ? <Button onClick={toggleCreateForm}>Create Task</Button> : null}
                    </div>
                </div>
            ) : null}
        </section>
    )
}

export default TaskList