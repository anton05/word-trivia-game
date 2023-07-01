import { GreenRow } from "../Home/Home";
import { IconWrap, Wrap } from "../Profile/Profile";
import User from "../../Components/User/User";
import ArrowBack from "../../Components/ArrowBack/ArrowBack";
import UpdateForm from "../../Components/UpdateForm/UpdateForm";

import styled from "@emotion/styled";

const UserUpdate = () => {
    return (
        <Wrap>
            <GreenRow>
                <IconWrap>
                    <ArrowBack />
                </IconWrap>
                <User />
            </GreenRow>
            
            <FormWrap>
                <UpdateForm />
            </FormWrap>
        </Wrap>
    );
};

export default UserUpdate;

const FormWrap = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
`
