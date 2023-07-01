import { Link } from "react-router-dom";

import User from "../../Components/User/User";
import LeadersTableContainer from "../../Components/LeadersTable/LeadersTableContainer";
import Button from "@mui/material/Button";

import styled from "@emotion/styled";

const Home = () => {  
  return (
    <Wrap>
      <GreenRow>
        <User />
        <Link to="/game">
          <Button variant="contained">New game</Button>
        </Link>
      </GreenRow>

      <TopWrap>
        <Title>Top players</Title>
        <Link to="/leaderboard">See full table</Link>
        <LeadersTableContainer />
      </TopWrap>
    </Wrap>
  );
};

export default Home;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const GreenRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4vh;
  width: 100vw;
  height: auto;
  min-height: 20vh;
  padding: 4vh 0;
  background: aquamarine;
  border-bottom-left-radius: 100%30px;
  border-bottom-right-radius: 100%30px;
`;

const TopWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 90vw;
  margin-top: 5vw;
  padding: 4vh 4vw;
  height: 52vh;
  background: white;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 28px;
  margin-bottom: 8px;
`;