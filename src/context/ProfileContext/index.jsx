import { createContext, useContext } from 'react';
import { useProfile } from '../../hooks/useProfile';

const ProfileContext = createContext(null);

const ProfileContextWrapper = ({children}) => {

  const useProfileValue = useProfile();

  return (
    <ProfileContext.Provider value={useProfileValue}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextWrapper;

export const useProfileContext = () => {
  const profileContextValue = useContext(ProfileContext);
  return profileContextValue;
};