import { useEffect, useState } from "react";
import LeadersTableContainer from "../../Components/LeadersTable/LeadersTableContainer";
import User from "../../Components/User/User";
import StatTable from "../../Components/StatTable/StatTable";
import ArrowBack from "../../Components/ArrowBack/ArrowBack";
import Loader from "../../Components/Loader/Loader";
import { IconWrap } from "../Profile/Profile";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../Contexts/AuthContext";
import { Score } from "../../Components/RecentlyPlayed/Row";

import styled from "@emotion/styled";

const Leaderboard = () => {
  const [usersData, setUsersData] = useState([]);
  const [bestUserResult, setBestUserResult] = useState(0);
  const [place, setPlace] = useState(0);

  const { currentUser } = useAuth();
  const usersCollection = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollection);
      const response = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const uniqueNames = [];

      let Leaders = response
        .sort((a, b) => b.score - a.score)
        .filter((element) => {
          const isDuplicate = uniqueNames.includes(element.name);

          if (!isDuplicate) {
            uniqueNames.push(element.name);

            return true;
          }

          return false;
        });

      setBestUserResult(
        Leaders.find((el, index) => {
          setPlace(index + 1);
          return el.name === currentUser.email;
        })?.score || 0
      );

      setUsersData(Leaders);
    };

    getUsers();
  }, []);

  return (
    <Wrap>
      <GreenRow>
        <IconWrap>
          <ArrowBack />
        </IconWrap>
        <LeadersTableContainer />
      </GreenRow>
      <BestText>This is your best result</BestText>
      <TopWrap>
        <User />
        <TextWrap>
          <Score>{place}</Score>
          <Text>Place</Text>
        </TextWrap>
        <TextWrap>
          <Score>{bestUserResult}</Score>
          <Text>Score</Text>
        </TextWrap>
      </TopWrap>
      {usersData.length ? <StatTable usersData={usersData} /> : <Loader />}
    </Wrap>
  );
};

export default Leaderboard;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const GreenRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4vh;
  width: 100vw;
  height: 30vh;
  background: aquamarine;
  border-bottom-left-radius: 100%30px;
  border-bottom-right-radius: 100%30px;
`;

const TopWrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  width: 100vw;
  padding: 2vh 2vw;
  margin-bottom: 6vh;
`;

const BestText = styled.span`
  font-size: 28px;
  font-weight: 600;
  color: forestgreen;
  margin-top: 4vh;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.span`
  font-size: 12px;
`;