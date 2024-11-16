import { contractAddress, contractAbi } from "@/constants";
import { useReadContract, useAccount } from "wagmi";
import Owner from "./Owner/Owner";
import Voter from "./Voter/Voter";
import Winner from "./Winner";

const Voting = () => {
  const { address } = useAccount();

  const { data: ownerAddress } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "owner",
    watch: true,
  });

  const isOwner = address?.toLowerCase() === ownerAddress?.toLowerCase();

  const { data: voterData } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getVoter",
    args: [address],
    watch: true,
  });

  return (
    <>
      <Winner />
      {isOwner ? <Owner /> : <div>Vous n'êtes pas autorisé à accéder à la section OWNER.</div>}
      {voterData?.isRegistered ? <Voter /> : <div>Vous n'êtes pas autorisé à accéder à la section VOTER.</div>}
    </>
  );
};

export default Voting;
