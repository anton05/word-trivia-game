import React, { useState } from "react";
import { Form, Formik } from "formik";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import styled from "@emotion/styled";

const GameForm = ({
  answers,
  currentWord,
  score,
  setScore,
  wrongGuesses,
  setWrongGuesses,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Formik
      initialValues={""}
      onSubmit={() => {
        if (value === currentWord) {
          return setScore(score + 1);
        }

        if (value !== currentWord) {
          return setWrongGuesses(wrongGuesses + 1);
        }
      }}
    >
      {({ handleSubmit }) => (
        <Wrap onSubmit={handleSubmit}>
          <RadioWrap
            aria-label="game"
            name="game1"
            value={value}
            onChange={handleChange}
          >
            {answers.map(({ word, explanation }) => (
              <RadioControl
                key={word}
                value={word}
                control={<Radio />}
                label={explanation}
              />
            ))}
          </RadioWrap>
          <Button isDisabled={!value} disabled={!value} type="submit">Submit</Button>
        </Wrap>
      )}
    </Formik>
  );
};

export default GameForm;

const Wrap = styled(Form)`
  font-size: 28px;
  margin-top: 4vh;
`;

const RadioWrap = styled(RadioGroup)`
  height: min-content;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 2vh;
`;
const RadioControl = styled(FormControlLabel)`
  margin: 0 !important;
  min-height: 12vh;
  padding: 2vh 2vw;
  height: auto;
  border-radius: 12px;
  background: #fff;
  box-shadow: 1px 1px 4px 0 #636262;
`;

const Button = styled.button`
  width: 100%;
  height: 6vh;
  margin-top: 2vh;
  color:  ${props => props.isDisabled ? "gray" : "#fff"};
  background: ${props => props.isDisabled ? "transparent" : "forestgreen"};
  border: ${props => props.isDisabled ? "1px solid gray" : "none"};
  border-radius: 12px;
  cursor: pointer;
`;