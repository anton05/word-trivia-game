import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import Form from "../../Components/Form/Form";
import { UserError } from "../Register/Register";

import styled from "@emotion/styled";

const Login = () => {
  const [loginData, setLoginData] = useState({ name: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(loginData.name, loginData.password);
      navigate("/")
     } catch {
      setError(true);
     }
     setLoading(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setLoginData({...loginData, [name]: value});
  };

  return (
    <>
      <Wrapper>
        <FormWrap onSubmit={handleSubmit}>
          <Title>Log in</Title>
          { error 
            ? <UserError>Failed to sign in</UserError>
            : null
          }
          <Form userData={loginData} handleChange={handleChange} />
          <Button disabled={loading} >Sign In</Button>
          <Link to='/register'>Or register</Link>
        </FormWrap>
      </Wrapper>
    </>
  );
};

export default Login;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 28px;
  margin-bottom: 20px;
`;

const FormWrap = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Button = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: blue;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
`;