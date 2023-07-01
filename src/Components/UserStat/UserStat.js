import User from "../../Components/User/User";

import styled from "@emotion/styled";

const UserStat = ({ user, place }) => {
  return (
    <Wrap>
      <UserWrap>
        <Place>{place}</Place>
        <User name={user.name} />
      </UserWrap>
      <Score>{user.score}</Score>
    </Wrap>
  );
};

export default UserStat;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 90vw;
  padding: 2vh 2vw;
  background: white;
`;

const Place = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 2vw;
`;
const Score = styled.div`
  margin-right: 1vw;
  color: green;
`;

const UserWrap = styled.div`
  display: flex;
  flex-direction: row;
`;