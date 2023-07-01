import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { GreenRow } from "../Home/Home";

import User from "../../Components/User/User";
import RecentlyPlayed from "../../Components/RecentlyPlayed/RecentlyPlayed";
import ArrowBack from "../../Components/ArrowBack/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";
import Loader from "../../Components/Loader/Loader";
import LogoutIcon from '@mui/icons-material/Logout';

import styled from "@emotion/styled";

const Profile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [topScore, setTopScore] = useState(0);

  const { currentUser, logout } = useAuth();

  const usersCollection = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollection);
      const response = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      // if user haven't played yet
      if (!response.map(u => u.name).includes(currentUser.email)) {
        setUserInfo([{score: 0, date: null}]);
        return;
      }
      setUserInfo(response.filter(({ name }) => name === currentUser.email));
    };
    
    getUsers();
  }, []);

  useEffect(() => {
    if (!userInfo.length) return;
    const { score } = userInfo.reduce((acc, curr) =>
      acc.score > curr.score ? acc : curr
    );

    setTopScore(score);
  }, [userInfo]);

  return (
    <Wrap>
      <GreenRow>
        <IconWrap>
          <ArrowBack />
        </IconWrap>
        <SettingsWrap>
          <Link to="/update">
            <SettingsIcon />
          </Link>
        </SettingsWrap>
        <LogWrap onClick={logout}>
          <LogoutIcon />
        </LogWrap>
        <User />
        <Title>Top score</Title>
        <TopScore>{topScore}</TopScore>
      </GreenRow>
      {userInfo.length ? <RecentlyPlayed playedGames={userInfo} /> : <Loader />}
    </Wrap>
  );
};

export default Profile;

export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 28px;
  margin-bottom: 8px;
`;

const TopScore = styled.span`
  background: orange;
  padding: 1vh;
`;

export const IconWrap = styled.div`
  position: absolute;
  top: 25px;
  left: 25px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const SettingsWrap = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const LogWrap = styled.div`
  position: absolute;
  top: 25px;
  right: 65px;
  cursor: pointer;
  &:hover{transform: scale(1.2)}
`