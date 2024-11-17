"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useWriteContract, useWaitForTransactionReceipt,useWatchContractEvent } from "wagmi";

import { contractAddress, contractAbi } from "@/constants";

const StartVotingSession = () => {
  const { data: hash, error, isPending: goIsPending, writeContract } = useWriteContract({});

  const handleStartVotingSession = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "startVotingSession",
    });
  };

  const { isLoading: isConfirming, isSuccess, error: errorConfirmation } = useWaitForTransactionReceipt({ hash });

  const [hasDisplayed, setHasDisplayed] = useState(false);

  useWatchContractEvent({
    address: contractAddress,
    abi: contractAbi,
    eventName: "WorkflowStatusChange",
    onLogs: (logs) => {
      if (!hasDisplayed && logs[0]?.args?.newStatus === 3) {
        setHasDisplayed(true);
        toast({
          title: "Status Changed",
          description: "Voting Session Started",
          className: "bg-lime-200",
        });
      }
    },
  });

  const { toast } = useToast();

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-row justify-between mb-4">
          <h2 className="text-2xl mr-4">Start voting session</h2>
          <Button className="w-20" disabled={goIsPending} onClick={handleStartVotingSession}>
            {goIsPending ? "in progress.." : "Start"}
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

export default StartVotingSession;
