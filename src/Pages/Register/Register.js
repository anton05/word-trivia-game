import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import Form from "../../Components/Form/Form";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import styled from "@emotion/styled";

const Register = () => {
  const [registerData, setRegisterData] = useState({ name: "", password: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usersName, setUsersName] = useState([]);

  const navigate = useNavigate();
  const { signUp } = useAuth();

  const usersCollection = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollection);
      const response = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const names = response.map(u => u.name);
      setUsersName(names);
    };
    getUsers();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usersName.includes(registerData.name)) {
      setError(true);
      return;
    }

    try {
      setLoading(true);
      await signUp(registerData.name, registerData.password);
      navigate("/login");
     } catch {
      console.log('Failed to create an account');
     }
     setLoading(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setRegisterData({...registerData, [name]: value});
  };

  return (
    <>
      <Wrapper>
        <FormWrap onSubmit={handleSubmit}>
          <Title>Register</Title>
          { error 
            ? <UserError>User with the same name already exists!</UserError>
            : null
          }
          <Form userData={registerData} handleChange={handleChange} />
          <Button disabled={loading} >To register</Button>
          <Link to='/login'>Log in</Link>
        </FormWrap>
      </Wrapper>
    </>
  );
};

export default Register;


const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Title = styled.div`
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

const Button = styled.button`
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

export const UserError = styled.div`
  padding: 10px 0px;
  color: red;
`;