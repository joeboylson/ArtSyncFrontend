import { ArrowBackOutlined } from "@material-ui/icons";

import './style.scss';

const goBack = () => window.history.back();

const BackButton = () => (
  <button className="back-button" onClick={goBack}>
    <ArrowBackOutlined/>
  </button>
)

export default BackButton;