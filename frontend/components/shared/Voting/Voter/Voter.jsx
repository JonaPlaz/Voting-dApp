import GetVoter from "./GetVoter";
import GetOneProposal from "./GetOneProposal";
import AddProposal from "./AddProposal";
import SetVote from "./SetVote";

const Voter = () => {
  return (
    <>
      <GetVoter />
      <GetOneProposal />
      <AddProposal />
      <SetVote />
    </>
  );
};

export default Voter;
