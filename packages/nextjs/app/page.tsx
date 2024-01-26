"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { Address, AddressInput, IntegerInput } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState<bigint>(BigInt(0));

  const { data: minterAddress } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "minter",
  });

  const { writeAsync: mint } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "mint",
    args: [receiver, amount],
  });

  return (
    <>
      <div className="flex flex-col items-center p-8 gap-4">
        <Address address={minterAddress} />
        <AddressInput onChange={setReceiver} value={receiver} placeholder="Input recipient address" />
        <IntegerInput
          value={amount}
          onChange={updatedAmount => {
            setAmount(BigInt(updatedAmount));
          }}
          placeholder="value (wei)"
        />
        <button onClick={() => mint()} className="btn btn-primary">
          Mint
        </button>
      </div>
    </>
  );
};

export default Home;
