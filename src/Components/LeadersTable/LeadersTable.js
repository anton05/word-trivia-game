import styled from "@emotion/styled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const LeadersTable = ({ stats }) => {
  return (
    <Wrap>
      {stats.map(({ name, score }, index) => (
        <Leader key={index}>
          <LeaderAvatar />
          <Olive src={`icons/${index + 1}.svg`} />
          <Name>{name}</Name>
          <Score>{score}</Score>
        </Leader>
      ))}
    </Wrap>
  );
};

export default LeadersTable;

const Wrap = styled.div`
  width: 100%;
  margin-top: 6vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: relative;
`;

const Leader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LeaderAvatar = styled(AccountCircleIcon)`
  height: 80px;
  width: 80px;
`;

const Olive = styled.img`
  position: absolute;
  height: 80px;
  width: 80px;
`;

const Name = styled.span`
  margin: 2vh 0;
`;

const Score = styled.span`
  color: green;
`;