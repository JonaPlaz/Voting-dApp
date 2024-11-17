import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useReadContract } from "wagmi";

import { contractAddress, contractAbi } from "@/constants";

const Winner = () => {
  const { data: hash, error, isPending: goIsPending, writeContract } = useReadContract({});

  const { data: winner } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "winningProposalID",
  });

  return (
    <>
      <div className="flex flex-col w-1/4">
        {winner !== 0 && (
          <Alert className="mb-4 bg-lime-200">
            <AlertTitle>Id du Winner</AlertTitle>
            <AlertDescription>Winner : {winner}</AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
};

export default Winner;
