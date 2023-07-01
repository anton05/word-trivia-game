import React from "react";
import { Modal } from "@mui/material";
import styled from "@emotion/styled";

const GameOver = ({ isOpen, handleClose, score }) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Body>
        <Header>
          <HeaderText>Game Over</HeaderText>
          <Close onClick={handleClose} src="icons/close.svg" />
        </Header>

        <Goblet src="icons/goblet.svg" />

        <Text>Congratulations!</Text>
        <CurrentScore>You scored {score} points </CurrentScore>
      </Body>
    </Modal>
  );
};

export default GameOver;

const Goblet = styled.img`
  height: 160px;
  width: auto;
  margin: 12vh 0 4vh;
`;

const Close = styled.img`
  height: 40px;
  width: 40px;
  cursor: pointer;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderText = styled.span``;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  background: #fff;
  width: 40vw;
  top: 10vh;
  left: 30vw;
  padding: 2vh 2vw 4vh;
  outline: none;
`;

const Text = styled.span`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 4vh;
`;

const CurrentScore = styled.span``;