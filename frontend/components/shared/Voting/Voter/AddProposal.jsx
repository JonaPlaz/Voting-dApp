"useClient";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import { contractAddress, contractAbi } from "@/constants";

const AddProposal = () => {
  const [description, setDescription] = useState("");

  const { data: hash, error, isPending: addIsPending, writeContract } = useWriteContract({});

  const handleAddProposal = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "addProposal",
      args: [description],
    });
  };

  const { isLoading: isConfirming, isSuccess, error: errorConfirmation } = useWaitForTransactionReceipt({ hash });

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl mb-4">Add proposal</h2>
        <div className="flex items-center mb-4">
          <Input className="mr-2" placeholder="Proposal description" onChange={(e) => setDescription(e.target.value)} value={description} />
          <Button
            disabled={addIsPending}
            onClick={() => {
              handleAddProposal();
              setDescription("");
            }}
            className="px-12"
          >
            {addIsPending ? "En cours d'ajout" : "Add"}
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

export default AddProposal;
