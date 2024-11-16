"useClient";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useReadContract } from "wagmi";

import { contractAddress, contractAbi } from "@/constants";

// owner : 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
// 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
// 0x90F79bf6EB2c4f870365E785982E1f101E93b906
const GetVoter = () => {
  const [address, setAddress] = useState("");
  const [input, setInput] = useState("");

  const { data: voterData } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getVoter",
    args: [address],
  });

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl mb-4">Get voter</h2>
        <div className="flex items-center mb-4">
          <Input
            className="mr-2"
            placeholder="Adresse"
            onChange={(e) => {
              setAddress(e.target.value);
              setInput(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col w-full">
          {voterData && input != "" && (
            <Alert className="mb-4 bg-lime-200">
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                <ul>
                  Votant : {address}
                  <li>status : {voterData.isRegistered.toString()}</li>
                  <li>à voté : {voterData.hasVoted.toString()}</li>
                  <li>
                    Proposal choisie :{" "}
                    {voterData.votedProposalId.toString() == "0" ? "ras" : voterData.votedProposalId.toString()}
                  </li>
                </ul>{" "}
              </AlertDescription>
            </Alert>
          )}
          {!voterData && input != "" && (
            <Alert className="bg-red-200">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Cette adresse ne correspond pas à un votant</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};

export default GetVoter;
