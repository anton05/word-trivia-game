import React from "react";
import Row from "./Row";

import styled from "@emotion/styled";

const RecentlyPlayed = ({ playedGames }) => {

  const recentlyGames = playedGames.sort((a, b) => {
    return b.date - a.date;
  })

  return (
    <Wrap>
      <Title>Recently played</Title>
      <RowWrap>
        {recentlyGames.map(({ score, date }, index) => (
          <Row key={index} score={score} date={date} />
        ))}
      </RowWrap>
    </Wrap>
  );
};

export default RecentlyPlayed;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  padding: 0 4vw 56px;
  margin: 8vh 0;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 32px;
  margin-bottom: 8px;
  align-self: flex-start;
`;

const RowWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  gap: 2vh;
  padding: 0 4vw;
  margin-top: 8vh;
`;
