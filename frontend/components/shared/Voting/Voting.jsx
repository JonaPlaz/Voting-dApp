import { contractAddress, contractAbi } from "@/constants";
import { useReadContract, useAccount } from "wagmi";
import Owner from "./Owner/Owner";

const Voting = () => {
  const { address } = useAccount();

  const { data: ownerAddress } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "owner",
    watch: true,
  });

  const isOwner = address?.toLowerCase() === ownerAddress?.toLowerCase();

  return <>{isOwner ? <Owner /> : <div>Vous n'êtes pas autorisé à accéder à cette section.</div>}</>;
};

export default Voting;
