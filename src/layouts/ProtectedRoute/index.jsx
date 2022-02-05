import { useEffect } from "react";
import { useHistory } from "react-router";
import { useRequest } from "../../utils/request";
import Loading from "../../components/Loading";

import "./style.scss"

const ProtectedRoute = ({children}) => {
  const {loading, data} = useRequest('/user_is_authorized');
  const { push } = useHistory();

  useEffect(() => {
    if (data && !data.authorized) push('/login') 
  }, [data, push])

  return (
    <div id="route-loading">
      <Loading loading={loading}>
        { children }
      </Loading>
    </div>
    );
}

export default ProtectedRoute;