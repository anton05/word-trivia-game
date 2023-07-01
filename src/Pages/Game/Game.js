import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../../Contexts/AuthContext";
import User from "../../Components/User/User";
import GameForm from "../../Components/GameForm/GameForm";
import GameOver from "../../Components/GameOver/GameOver";

import styled from "@emotion/styled";
import Loader from "../../Components/Loader/Loader";

const Game = () => {
  //arr of answers and words
  const [answers, setAnswers] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const [score, setScore] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  //currentWord
  const [currentWord, setCurrentWord] = useState();
  const [isGameOver, setIsGameOver] = useState(false);

  const { currentUser } = useAuth();

  let data = [];

  useEffect(() => {
    if (wrongGuesses === 3) {
      //setResult to fairbase
      const addData = async () => {
        await addDoc(collection(db, "users"), {
          name: currentUser.email,
          score: score,
          date: Date.now(),
        });
      };
      addData();
      return setIsGameOver(true);
    }
    const fetchData = async () => {
      setLoading(true);

      while (data.length < 4) {
        //fetch word
        const responseWord = await fetch(
          "https://random-word-api.herokuapp.com/word"
        );
        const word = await responseWord.json();

        //checking whether the word has an explanation
        const responseExplanation = await fetch(
          ` https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        ).then((res) => {
          if (res.ok) {
            return res.json();
          }
          return false;
        });

        if (responseExplanation) {
          let Explanation =
            responseExplanation[0].meanings[0].definitions[0].definition;
          data.push({ word: word[0], explanation: Explanation });
        }
      }
      if (data.length === 4) {
        setAnswers(data);
        setLoading(false);
      }
    };

    fetchData().catch((e) => console.log(e));
  }, [score, wrongGuesses]);

  useEffect(() => {
    if (!answers) return;
    //set random
    let randNum = Math.floor(Math.random() * 4);
    setCurrentWord(answers[randNum].word);
  }, [answers]);

  return (
    <Wrap>
      <Header>
        <User />
        <AnswerWrap>
          <Text>Score</Text> <Score>{score}</Score> <Text>Wrong guesses</Text>
          <Wrong>{wrongGuesses}</Wrong>
        </AnswerWrap>
      </Header>
      {answers && !loading ? (
        <>
          <Word>{currentWord}</Word>
          <Question>What does this word mean ?</Question>
          <GameForm
            answers={answers}
            currentWord={currentWord}
            score={score}
            setScore={setScore}
            wrongGuesses={wrongGuesses}
            setWrongGuesses={setWrongGuesses}
          />
        </>
      ) : (
        <Loader />
      )}
      <GameOver
        isOpen={isGameOver}
        handleClose={() => {
          window.location.reload();
        }}
        score={score}
      />
    </Wrap>
  );
};

export default Game;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2vw 2vh;
  margin-bottom: 56px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2vh 0;
`;

const AnswerWrap = styled.div`
  display: flex;
  flex-direction: row;
  height: min-content;
`;

export const Text = styled.span`
  margin-left: 2vw;
`;

const Score = styled.div`
  margin-left: 4px;
  padding: 0 4px;
  background: green;
`;

const Wrong = styled(Score)`
  background: red;
`;

const Word = styled.span`
  font-size: 46px;
  font-weight: 600;
  text-transform: capitalize;
  margin: 4vh 0 2vh;
`;

const Question = styled(Word)`
  font-size: 28px;
  margin: 0;
`;