import { Link } from "react-router-dom"

const RootPage = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <Link to="about">About Us</Link><span> | </span>
      <Link to="login">Login</Link>
    </div>
  )
}

export default RootPage
