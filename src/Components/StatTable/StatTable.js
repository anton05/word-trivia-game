import UserStat from "../UserStat/UserStat";

import styled from "@emotion/styled";

const StatTable = ({ usersData }) => {
  return (
    <Wrap>
      {usersData.map((item, index) => (
        <UserStat key={index} place={index + 1} user={item} />
      ))}
    </Wrap>
  );
};

export default StatTable;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  padding: 0 4vw 56px;
  margin-bottom: 3vh;
  gap: 3vh;
`;