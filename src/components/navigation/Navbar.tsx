import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="px-2 pt-2 flex items-center justify-center gap-2">
      <Link to={"/"}>Home</Link> 
      <Link to={"/use-fetch"}>Use Fetch</Link>
    </div>
  )
}

export default Navbar