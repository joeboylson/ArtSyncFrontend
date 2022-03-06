import { useState } from 'react';

import "./style.scss";

const ProfileButton = () => {

  const [isOpen, setIsOpen] = useState(false);

  const settingsBlockProps = isOpen ? { className: "open" } : {};
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div id="profile">

      <button id="profile-settings-toggle" onClick={toggleOpen}>
        <img src={`https://i.pravatar.cc/300?img=${10}`} alt="" />
      </button>

      <div id="profile-settings-block" {...settingsBlockProps}>
        <p>Profile</p>
        <p>Logout</p>
      </div>

    </div>
  );
};

export default ProfileButton;
