import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styled from "@emotion/styled";
import { useAuth } from "../../Contexts/AuthContext";

const User = ({ name }) => {
  const { currentUser } = useAuth();
  return (
    <Wrap>
      <UserAvatar />
      <UserName>{name ?? currentUser.email}</UserName>
    </Wrap>
  );
};

export default User;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserName = styled.span`
  font-weight: 500;
  font-size: 22px;
  margin-left: 1vw;
`;

const UserAvatar = styled(AccountCircleIcon)`
  height: 30px;
  width: 30px;
`;