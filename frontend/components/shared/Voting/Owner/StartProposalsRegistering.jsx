"useClient";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";

import { contractAddress, contractAbi } from "@/constants";

const StartProposalsRegistering = () => {
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

  const handleStartProposalsRegistering = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "startProposalsRegistering",
    });
  };

  return (
    <>
      <h2 className="text-2xl">Démarrer la Session de registering des proposals</h2>
      <p>{statusDescription}</p>
      <Button disabled={goIsPending} onClick={handleStartProposalsRegistering}>
        {goIsPending ? "En cours de lancement" : "Go"}
      </Button>
    </>
  );
};

export default StartProposalsRegistering;
