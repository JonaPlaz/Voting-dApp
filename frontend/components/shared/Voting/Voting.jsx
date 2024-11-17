import { useAccount, useReadContract } from "wagmi";
import { contractAddress, contractAbi } from "@/constants";
import Owner from "./Owner/Owner";
import Voter from "./Voter/Voter";
import Winner from "./Winner";

const Voting = () => {
  const { address } = useAccount();

  const { data: ownerAddress, isLoading: isOwnerLoading } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "owner",
    watch: true,
  });

  const isOwner = address?.toLowerCase() === ownerAddress?.toLowerCase();

  const { data: voterData, isLoading: isVoterLoading } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getVoter",
    args: [address],
    account: address,
    watch: true,
  });

  return (
    <>
      <Winner />
      {isOwnerLoading || isVoterLoading ? (
        <div>Chargement des données...</div>
      ) : (
        <>
          {isOwner ? <Owner /> : <div>Vous n'êtes pas autorisé à accéder à la section OWNER.</div>}
          {voterData?.isRegistered ? <Voter /> : <div>Vous n'êtes pas autorisé à accéder à la section VOTER.</div>}
        </>
      )}
    </>
  );
};

export default Voting;
