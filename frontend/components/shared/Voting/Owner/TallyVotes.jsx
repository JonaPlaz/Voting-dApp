"useClient";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";

import { contractAddress, contractAbi } from "@/constants";

const TallyVotes = () => {
  const {
    data: winningProposalID,
    isLoading: isWinningLoading,
    isError: isWinningError,
  } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "winningProposalID",
  });

  const { data: hash, error, isPending: goIsPending, writeContract } = useWriteContract({});

  const handleTallyVotes = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "tallyVotes",
    });
  };

  return (
    <>
      <h2 className="text-2xl">Compter les votes</h2>
      <Button disabled={goIsPending} onClick={handleTallyVotes}>
        {goIsPending ? "En cours de lancement" : "Go"}
      </Button>
      <p>ID de la proposition gagnante : {winningProposalID?.toString()}</p>
    </>
  );
};

export default TallyVotes;
