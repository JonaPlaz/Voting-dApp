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
      <div className="flex flex-row justify-evenly mb-8">
        <div className="w-2/5 bg-slate-200 p-6 rounded-md">
          <h2 className="text-2xl mb-4 font-semibold">PROPOSALS</h2>
          <StartProposalsRegistering />
          <EndProposalsRegistering />
        </div>
        <div className="w-2/5 bg-slate-200 p-6 rounded-md">
          <h2 className="text-2xl mb-4 font-semibold">VOTING</h2>
          <StartVotingSession />
          <EndVotingSession />
        </div>
      </div>
      <div className="flex justify-center">
        <TallyVotes />
      </div>
    </>
  );
};

export default Owner;
