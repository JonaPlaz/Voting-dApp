import GetVoter from "./GetVoter";
import GetOneProposal from "./GetOneProposal";
import AddProposal from "./AddProposal";
import SetVote from "./SetVote";

const Voter = () => {
  return (
    <>
      <GetVoter />
      <AddProposal />
      <GetOneProposal />
      <SetVote />
    </>
  );
};

export default Voter;
