"useClient";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import { contractAddress, contractAbi } from "@/constants";

const SetVote = () => {
  const [proposalId, setProposalId] = useState("");

  const { data: hash, error, isPending: setIsPending, writeContract } = useWriteContract({});

  const handleSetVote = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "setVote",
      args: [proposalId],
    });
  };

  const { isLoading: isConfirming, isSuccess, error: errorConfirmation } = useWaitForTransactionReceipt({ hash });

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl mb-4">Set vote</h2>
        <div className="flex items-center mb-4">
          <Input
            className="mr-2"
            placeholder="Proposal description"
            onChange={(e) => setProposalId(e.target.value)}
            value={proposalId}
          />
          <Button
            disabled={setIsPending}
            onClick={() => {
                handleSetVote();
              setProposalId("");
            }}
            className="px-12"
          >
            {setIsPending ? "En cours d'ajout" : "Vote"}
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
          {errorConfirmation && (
            <Alert className="mb-4 bg-lime-200">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorConfirmation.shortMessage || errorConfirmation.message}</AlertDescription>
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

export default SetVote;
