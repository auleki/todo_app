import { TODO_STATUS } from "../utils/enums"

const ListJumbotron = ({taskList}) => {
    const filterCompleteTasks = taskList.filter(task => task.status === TODO_STATUS.COMPLETED)
    return (
        <div className="jumbotron">
            <section className="text">
                <h2 className="md:text-2xl text-xl">Tasks Completed</h2>
                <p className="text-orange-200 text-opacity-80 text-sm">keep it up</p>
            </section>
            <section className="task_tally">
                <span className="text-white">{filterCompleteTasks.length}/{taskList.length}</span>
            </section>
        </div>
    )
}

export default ListJumbotron