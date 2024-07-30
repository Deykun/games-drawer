import { Link } from "wouter";

const Home = () => {
    return (
        <>
          <ol>
            <li><Link to="/games-drawer/rover" className="text-lg text-blue-700">Rover</Link></li>
          </ol>
        </>
    )
}

export default Home
