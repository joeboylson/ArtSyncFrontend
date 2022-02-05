import Loading from "../../components/Loading";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { objectToFormData, usePost } from "../../utils/request";
import './style.scss'
import PageWrapper from "../../components/PageWrapper";

const Register = () => {
    
    const { handleSubmit, control } = useForm();
    const { post, loading, result } = usePost()
    const { push } = useHistory();

    useEffect(() => {
      if (result && result.data.success) push('/')
    }, [result, push])

    const onSubmit = data => {
        const formData = objectToFormData(data)
        post('/register', formData, true);
    }
  
    return (
      <PageWrapper hideHeader>
        <form onSubmit={handleSubmit(onSubmit)} id="register">
          <Loading loading={loading}>

            <h1>Register</h1>

            { result && !result.data.success &&
                <p>{result.data.message}</p>
            }

            <Controller
              name="name"
              control={control}
              render={({ field: { onChange } }) => (
                <input 
                  name="name" 
                  placeholder="Name"
                  onChange={onChange}
                />
              )}
            />

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

            <button type="submit">Register</button>

            <Link to="/login">Already registered?</Link>
          </Loading>
        </form>
      </PageWrapper>
    );
  }

export default Register;