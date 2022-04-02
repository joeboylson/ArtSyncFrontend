import PageWrapper from "../../components/PageWrapper";
import Loading from '../../components/Loading';
import UserGalleries from "../../layouts/UserGalleries";
import { useMemo } from 'react';
import { useParams } from "react-router-dom";
import { useProfileContext } from "../../context/ProfileContext";
import { useUserById } from "../../hooks/useUserById";

import './style.scss'

const Profile = () => {

  const { profile, loading } = useProfileContext();
  const { userId } = useParams();

  const isSelfProfile = useMemo(() => {
    if (!userId || !profile) return false;
    return Number(userId) === profile.id;
  }, [profile, userId]);

  const { user } = useUserById(isSelfProfile ? null : userId);

  const displayUser = useMemo(() => {
    return isSelfProfile ? profile : user;
  }, [isSelfProfile, profile, user])

  return (
    <PageWrapper>
      <Loading loading={loading}>
        <div>
          <h1>{ displayUser?.name }</h1>
        </div>
        <p>IS SELF: { isSelfProfile ? "YES" : "NO" }</p>
        <p>USER ID: { userId }</p>

        <p>{ JSON.stringify(displayUser) }</p>

        { userId && <UserGalleries userId={userId}/> }
      </Loading>
    </PageWrapper>
  );
};

export default Profile;