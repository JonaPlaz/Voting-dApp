"useClient";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import { contractAddress, contractAbi } from "@/constants";

// owner : 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
// 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
// 0x90F79bf6EB2c4f870365E785982E1f101E93b906
const AddVoter = () => {
  const [address, setAddress] = useState("");

  const { data: hash, error, isPending: addIsPending, writeContract } = useWriteContract({});

  const handleAddVoter = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "addVoter",
      args: [address],
    });
  };

  const { isLoading: isConfirming, isSuccess, error: erroConfirmation } = useWaitForTransactionReceipt({ hash });

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl mb-4">Ajouter un votant</h2>
        <div className="flex items-center mb-4">
          <Input placeholder="Adresse" onChange={(e) => setAddress(e.target.value)} value={address} />
          <Button
            disabled={addIsPending}
            onClick={() => {
              handleAddVoter();
              setAddress("");
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

export default AddVoter;
