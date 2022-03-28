import { AddOutlined } from "@material-ui/icons";
import { useCallback, useState } from 'react';
import AddEditGalleryModal from "../AddEditGalleryModal";

import "./style.scss";

const NewGalleryButton = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = useCallback(() => setModalIsOpen(true), []);
  const closeModal = useCallback(() => setModalIsOpen(false), []);

  if (modalIsOpen) {
    return (
      <AddEditGalleryModal handleCancel={closeModal}/>
    )
  }

  return (
    <button onClick={openModal} className="new-gallery-button">
      <AddOutlined/>
    </button>
  );
};

export default NewGalleryButton;