"useClient";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWriteContract } from "wagmi";
import { contractAddress, contractAbi } from "@/constants";

const AddVoter = () => {
  const [address, setAddress] = useState("");

  const { writeContract } = useWriteContract({});

  const handleAddVoter = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "addVoter",
      args: [address],
    });
  };

  //   0x70997970C51812dc3A010C7d01b50e0d17dc79C8

  return (
    <>
      <h2 className="text-2xl">Ajouter un votant</h2>
      <div className="flex items-center">
        <Input placeholder="Adresse" onChange={(e) => setAddress(e.target.value)} value={address} />
        <Button onClick={handleAddVoter}>Add</Button>
      </div>
    </>
  );
};

export default AddVoter;
