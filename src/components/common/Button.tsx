const Button = ({onClick, children}) => {
    return (
        <button
            onClick={onClick}
            className="button rounded-sm hover:bg-white hover:text-orange-600 bg-orange-600 focus:outline-orange-600 py-2 w-full my-2">
            {children}
        </button>
    )
}

export default Button