import React, { useState , useEffect, useRef} from "react";
import './Dropdown.css';

function DropdownMenu(props) {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [currentLabel, setLabel] = useState("python");
    const onClick = () => setIsActive(!isActive);

    useEffect(() => {
        const pageClickEvent = (e) => {
            if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
                setIsActive(!isActive);
              }
        };

        if (isActive) {
            window.addEventListener('click', pageClickEvent);
        }
    
        return () => {
            window.removeEventListener('click', pageClickEvent);
        }

    }, [isActive]);

    const reactToDropdownClick = (label) => {
        setIsActive(!isActive);
        setLabel(label);
        props.onClickButton(label)
      };
  
    return (
        <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span>{currentLabel}</span>
        </button>
        <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
            <ul>
                <li><p onClick={() => reactToDropdownClick("python")}>python</p></li>
                <li><p onClick={() => reactToDropdownClick("swift")}>swift</p></li>
            </ul>
        </nav>
      </div>
    );
  };

  export default DropdownMenu;