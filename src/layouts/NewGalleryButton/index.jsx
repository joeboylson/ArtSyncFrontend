import { Link } from 'react-router-dom';
import { AddOutlined } from "@material-ui/icons";

import "./style.scss";

const NewProfileButton = () => {

  return (
    <Link to="/gallery/new" className="new-gallery-button">
      <AddOutlined/>
    </Link>
  );
};

export default NewProfileButton;