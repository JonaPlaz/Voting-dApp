"useClient";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";

import { contractAddress, contractAbi } from "@/constants";

const EndVotingSession = () => {
  const { data: hash, error, isPending: goIsPending, writeContract } = useWriteContract({});

  const { data: workflowStatus } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "workflowStatus",
  });

  const statusDescription =
    workflowStatus === 0
      ? "Registering Voters"
      : workflowStatus === 1
      ? "Proposals Registration Started"
      : workflowStatus === 2
      ? "Proposals Registration Ended"
      : workflowStatus === 3
      ? "Voting Session Started"
      : workflowStatus === 4
      ? "Voting Session Ended"
      : workflowStatus === 5
      ? "Votes Tallied"
      : "Statut Inconnu";

  const handleEndVotingSession = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "endVotingSession",
    });
  };

  return (
    <>
      <h2 className="text-2xl">Terminer la Session Votes</h2>
      <p>{statusDescription}</p>
      <Button disabled={goIsPending} onClick={handleEndVotingSession}>
        {goIsPending ? "En cours de lancement" : "Go"}
      </Button>
    </>
  );
};

export default EndVotingSession;
