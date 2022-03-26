import { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

const ModalContextWrapper = ({children}) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={{modalIsOpen, setModalIsOpen}}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextWrapper;

export const useModalContext = () => {
  const ModalContextValue = useContext(ModalContext);
  return ModalContextValue;
};