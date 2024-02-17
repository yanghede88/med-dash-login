import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tabNames } from '../menuItemsData';
import '@/assets/DropDownMenu.css'; // Assuming you have a CSS file for styles

const DropDownMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (url) => {
    navigate(url);
    setIsOpen(false); // Close the dropdown after navigation
  };

  return (
    <div className="dropdown-container">
      <button onClick={toggleDropdown} className="dropdown-trigger">
      User Menu
        <span className="arrow-down">▼</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {tabNames.map((item, index) => (
            <li key={index} className="dropdown-item" onClick={() => handleItemClick(item.url)}>
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownMenu;