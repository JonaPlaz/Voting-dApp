import AddVoter from "./AddVoter";
import StartProposalsRegistering from "./StartProposalsRegistering";
import EndProposalsRegistering from "./EndProposalsRegistering";
import StartVotingSession from "./StartVotingSession";
import EndVotingSession from "./endVotingSession";
import TallyVotes from "./TallyVotes";

const Owner = () => {
  return (
    <>
      <h1 className="title flex-center">Owner</h1>
      <AddVoter />
      <StartProposalsRegistering />
      <EndProposalsRegistering />
      <StartVotingSession />
      <EndVotingSession />
      <TallyVotes />
    </>
  );
};

export default Owner;
