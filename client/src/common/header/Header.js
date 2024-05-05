import './header.css';
import { useNavigate } from "react-router-dom";

  function Header() {
    const navigate = useNavigate();
    
    return (
      <header>
          <button className='logo' onClick={() => navigate("/")}>
                TaskForge
          </button>
      </header>
    );
  }

export default Header;