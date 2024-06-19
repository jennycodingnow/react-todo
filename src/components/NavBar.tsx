import { Link } from 'react-router-dom';
import "./NavBar.css"; 

const NavBar: React.FC = () => {
    return (
        <nav className="navBar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/aboutme">About Me</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
