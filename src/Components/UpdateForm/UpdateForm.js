import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
// import Form from "../../Components/Form/Form";
import { Button, Title } from "../../Pages/Login/Login"

import styled from "@emotion/styled";

const UpdateForm = () => {
  const [updateData, setUpdateData] = useState({ name: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { 
    updateUserEmail,
    updateUserPassword,
    currentUser } = useAuth();

  const handleChange = e => {
    const { name, value } = e.target;
    setUpdateData({...updateData, [name]: value});
  };

  const emailSubmit = (e) => {
    e.preventDefault();
    if (updateData.name !== currentUser.email) {
        setLoading(true);
        updateUserEmail(updateData.name).then(() => {
            setLoading(false);
            navigate("/");
        }).catch((e) => { console.log(e); })
    };
};

  const passwordSubmit = (e) => {
    e.preventDefault();
    if (updateData.password) {
        setLoading(true);
        updateUserPassword(updateData.password).then(() => {
            setLoading(false);
            navigate("/");
        }).catch((e) => { console.log(e); })
    };
  };

  return (
    <>
      <Wrapper>
        <FormsWrap>
          <Title>Update info</Title>
          <Form onSubmit={emailSubmit}>
            <Input
                type="text"
                name="name"
                placeholder="New name..."
                value={updateData.email}
                onChange={handleChange}
            />
            <Button disabled={loading} >Update email</Button>
          </Form>
          <Form onSubmit={passwordSubmit}>
            <Input
                type="password"
                name="password"
                placeholder="Upadte password..."
                value={updateData.password}
                onChange={handleChange}
            />
            <Button disabled={loading} >Update password</Button>
          </Form>
        </FormsWrap>
      </Wrapper>
    </>
  );
};

export default UpdateForm;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const FormsWrap = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Form = styled.form`
display: flex;
flex-direction: column;
gap: 15px;
justify-content: center;
align-items: strength;
margin-bottom: 15px;
height: 100%;
width: 100%;
`;
