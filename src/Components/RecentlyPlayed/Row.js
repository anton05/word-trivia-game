import React from "react";
import { Text as Prop } from "../../Pages/Game/Game";

import styled from "@emotion/styled";

const Row = ({ date, score }) => {
  return (
    <Wrap>
      <Medal src="icons/medal.svg" />{" "}
      <ScoreWrap>
        <Score>{score}</Score> <Text>Score</Text>
      </ScoreWrap>
      <DateWrap>
        {date ? new Date(date).toString().substring(4, 25) : <NotPlayed>You haven't played yet</NotPlayed>}
      </DateWrap>
    </Wrap>
  );
};

export default Row;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2vh 4vw;
  background: #fff;
  width: 100%;
`;

const Medal = styled.img`
  width: 80px;
  height: 80px;
`;

const ScoreWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Score = styled.span`
  color: green;
  padding-bottom: 1vh;
`;

const Text = styled(Prop)`
  margin-left: 0;
`;

const DateWrap = styled.span``;

const NotPlayed = styled.div``