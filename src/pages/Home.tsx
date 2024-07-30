import { Link } from "wouter";

const Home = () => {
    return (
        <>
          <h1 className="mt-10 text-lg">My random attempts to write some Canvas logic.</h1>
          <br />
          <ol>
            <li><Link to="/games-drawer/rover" className="text-lg text-blue-700">01. 🌕 Rover</Link></li>
            <li><Link to="/games-drawer/blocks" className="text-lg text-blue-700">02. 🟩 Blocks</Link></li>
            <li><Link to="/games-drawer/gekko" className="text-lg text-blue-700">03. 🦎 Gekko</Link></li>
          </ol>
        </>
    )
}

export default Home
