import React, { useState } from 'react';
import { TbLogout } from 'react-icons/tb';
import { IoNotificationsSharp } from 'react-icons/io5';
import TeamUP from '../assets/Team UP Logo BnW.png';
import { Link } from 'react-router-dom';
import { logout } from '../utils/fetch';

function Header({ onLogout, clickNotif }) {
  const [activeMenuItem, setActiveMenuItem] = useState('');

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <header className="z-[100] bg-blue-500 shadow fixed top-0 left-0 h-[60px] w-full box-border flex flex-row justify-between items-center px-6">
      <div className="header__logo">
        <img src={TeamUP} alt="" className="h-9" />
      </div>
      <ul className="header__menu flex flex-row justify-center gap-x-5 font-medium list-none">
        <Link to="/" className={`text-white ${activeMenuItem === 'Home' ? 'underline' : ''}`} onClick={() => handleMenuItemClick('Home')}>
          <li>Home</li>
        </Link>
        <Link to="/myteam" className={`text-white ${activeMenuItem === 'MyTeam' ? 'underline' : ''}`} onClick={() => handleMenuItemClick('MyTeam')}>
          <li>My Team</li>
        </Link>
        <Link
          to="/exploreteam"
          className={`text-white ${activeMenuItem === 'ExploreTeam' ? 'underline' : ''}`}
          onClick={() => handleMenuItemClick('ExploreTeam')}
        >
          <li>Explore Team</li>
        </Link>
        <Link to="/myprofile" className={`text-white ${activeMenuItem === 'Profile' ? 'underline' : ''}`} onClick={() => handleMenuItemClick('Profile')}>
          <li>Profile</li>
        </Link>
      </ul>
      <div className="text-white text-3xl">
        <button className="mx-2 px-0 pb-0 pt-2" onClick={() => clickNotif()}>
          <IoNotificationsSharp />
        </button>
        <button className="mx-2 px-0 pb-0 pt-2" onClick={onLogout}>
          <TbLogout />
        </button>
      </div>
    </header>
  );
}

export default Header;
