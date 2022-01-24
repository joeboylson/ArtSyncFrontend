import Loading from "../../components/Loading";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { objectToFormData, usePost } from "../../utils/request";

import './style.scss'

const Login = () => {
    
  const { handleSubmit, control } = useForm();
  const { post, loading, result } = usePost();
  const { push } = useHistory();

  useEffect(() => {
    if (result && result.data.success) push('/');
  }, [result, push])

  const onSubmit = data => {
    const formData = objectToFormData(data)
    post('/login', formData, true);
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} id="login">
      <Loading loading={loading}>
        { result && !result.data.success &&
          <p>{result.data.message}</p>
        }

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange } }) => (
            <input 
              name="email" 
              placeholder="Email"
              onChange={onChange}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange } }) => (
            <input 
              name="password" 
              placeholder="Password"
              type="password"
              onChange={onChange}
            />
          )}
        />

        <button>Login</button>

        <Link to="/register">Register</Link>
      </Loading>
    </form>
  );
}

export default Login;