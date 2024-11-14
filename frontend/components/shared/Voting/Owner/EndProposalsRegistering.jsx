import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import { contractAddress, contractAbi } from "@/constants";

const EndProposalsRegistering = () => {
  const { data: hash, error, isPending: goIsPending, writeContract } = useWriteContract({});

  const handleEndProposalsRegistering = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "endProposalsRegistering",
    });
  };

  const { isLoading: isConfirming, isSuccess, error: erroConfirmation } = useWaitForTransactionReceipt({ hash });

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-row justify-between mb-4">
          <h2 className="text-2xl mr-4">End proposals registering</h2>
          <Button className="w-20" disabled={goIsPending} onClick={handleEndProposalsRegistering}>
            {goIsPending ? "in progress.." : "End"}
          </Button>
        </div>
        <div className="flex flex-col w-full">
          {hash && (
            <Alert className="mb-4 bg-lime-200">
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>Transaction Hash : {hash}</AlertDescription>
            </Alert>
          )}
          {isConfirming && (
            <Alert className="mb-4 bg-lime-200">
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>Waiting for confirmation...</AlertDescription>
            </Alert>
          )}
          {isSuccess && (
            <Alert className="mb-4 bg-lime-200">
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>Transaction Confirmed.</AlertDescription>
            </Alert>
          )}
          {erroConfirmation && (
            <Alert className="mb-4 bg-lime-200">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{erroConfirmation.shortMessage || erroConfirmation.message}</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert className="bg-lime-200">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.shortMessage || error.message}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};

export default EndProposalsRegistering;
