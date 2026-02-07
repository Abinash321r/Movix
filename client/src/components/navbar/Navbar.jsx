import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Searchbar from '../serchbar/Searchbar';
import logo from '../../assets/9ksHG8-LogoMakr.png';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Signup_login from '../signup_login/Signup_login';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Navbar() {
  const [state, setState] = useState();
  const [searchicon, setSearchIcon] = useState();
  const [searchbar, setSearchBar] = useState(false);
  const [showmenu, setShowMenu] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false); // 👈 NEW
  const profileUrl = useSelector((state) => state.home.profile_url);
  const navigate = useNavigate();


  console.log('profileUrl', profileUrl)
  useEffect(() => {
    const checkSize = () => {
      setState(window.innerWidth <= 850);
      setSearchIcon(window.innerWidth <= 500);
    };
    
    checkSize();
    window.addEventListener('resize', checkSize);
    
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return (
    <>
      <nav>
        <div id='logo'  onClick={() => navigate("/")}>
          <img src={logo} alt="logo"/>
          <h2>MoVIX</h2>
        </div>

        {searchicon !== undefined && (
          searchicon ? (
            <div id='searchicons'>
              <SearchIcon onClick={() => setSearchBar(!searchbar)} />
              {searchbar && <Searchbar />}
            </div>
          ) : (
            <Searchbar />
          )
        )}

        {state ? (
          <div id='menu'>
            <MenuIcon onClick={() => setShowMenu(!showmenu)} />
            {showmenu && (
              <div id='dropdown'>
                <div>Genres</div>
                <div>Upcoming</div>
                <div onClick={() => navigate("/ongoing")}>Ongoing</div>
                <div>Top Rated</div>

                {/* Login/Signup Button */}
                {profileUrl!==null ? (
                  <img src={profileUrl} onClick={() => setShowSignupModal(true)} className="nav-profile" alt="Profile" />
                ) : (
                  <div onClick={() => setShowSignupModal(true)}>Login / Signup</div>
                )}
                
              </div>
            )}
          </div>
        ) : (
          <>
            <div>Genres</div>
            <div>Upcoming</div>
            <div id='ongoing' onClick={() => navigate("/ongoing")}>Ongoing</div>
            <div>Top Rated</div>

            {/* Login/Signup Button */}
           {profileUrl!==null ? (
                  <img src={profileUrl} onClick={() => setShowSignupModal(true)} className="nav-profile" alt="Profile" />
                  
                ) : (
                  <div onClick={() => setShowSignupModal(true)}>Login / Signup</div>
                )}

          </>
        )}

      </nav>

      {/* Modal Mount 👇 */}
      <Signup_login
        show={showSignupModal}
        onClose={() => setShowSignupModal(false)}
      />

    </>
  );
}

export default Navbar;
