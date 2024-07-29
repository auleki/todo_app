import Button from "./common/Button"

const CreateTask = ({createTodo, topic, description, loading, updateTodoStatus}) => {
    return (
        <div className="create_task mt-2 w-full lg:px-2">
            <section className="input_group mb-8">
                <label htmlFor="topic" className="text-sm text-gray-400">Topic({topic?.value})</label>
                <input
                    type="text"
                    placeholder="Walk Khady"
                    value={topic?.value}
                    onChange={topic?.handleTopic}
                    className="p-2 text-orange-400 text-base bg-black rounded-md border-transparent  focus:outline-none focus:ring-0 focus:border-transparent"
                />
            </section>
            <section className="input_group">
                <label htmlFor="" className="text-sm text-gray-400">Description({description?.value})</label>
                <textarea
                    name=""
                    id=""
                    onChange={description?.handlDescription}
                    value={description?.value}
                    className="bg-black rounded-md p-2 text-base text-orange-400"
                    placeholder="Take my dog on a morning walk"></textarea>
            </section>

            <Button onClick={createTodo}>{!loading ? "Add Task" : "Including new task..."}</Button>
        </div>
    )
}

export default CreateTask