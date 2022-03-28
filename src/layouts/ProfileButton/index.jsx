import { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useProfileContext } from '../../context/ProfileContext';

import "./style.scss";

const ProfileButton = () => {

  const { profile, loading } = useProfileContext();
  const [isOpen, setIsOpen] = useState(false);

  const settingsBlockProps = isOpen ? { className: "open" } : {};
  // const toggleOpen = () => setIsOpen(!isOpen);
  const toggleOpen = () => console.log("DO NOTHING")

  return (
    <div id="profile">

      <button id="profile-settings-toggle" onClick={toggleOpen}>
        <img src={`https://i.pravatar.cc/300?img=${profile?.id}`} alt="" />
      </button>

      <div id="profile-settings-block" {...settingsBlockProps}>
        { loading ? (
          <p>loading . . .</p>
          ) : (
          <Link to={`/profile/${profile?.id}`}>Profile</Link>
        )}
        <p>Logout</p>
      </div>

    </div>
  );
};

export default ProfileButton;
