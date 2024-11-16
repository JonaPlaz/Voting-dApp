"useClient";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useReadContract } from "wagmi";

import { contractAddress, contractAbi } from "@/constants";

const GetVoter = () => {
  const [proposalId, setProposalId] = useState("");
  const [input, setInput] = useState("");

  const { data: proposalData } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getOneProposal",
    args: [proposalId],
  });

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl mb-4">Get one proposal</h2>
        <div className="flex items-center mb-4">
          <Input
            className="mr-2"
            placeholder="Adresse"
            onChange={(e) => {
              setProposalId(e.target.value);
              setInput(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col w-full">
          {proposalData && input != "" && (
            <Alert className="mb-4 bg-lime-200">
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                <ul>
                  Votant : {proposalId}
                  <li>description : {proposalData.description}</li>
                  <li>Nombre de votes : {proposalData.voteCount.toString()}</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}
          {!proposalData && input != "" && (
            <Alert className="bg-red-200">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Cette id ne correspond pas à une proposal</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};

export default GetVoter;
