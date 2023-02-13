import Web3 from "web3";

const PRIVATE_KEY =
  "a3fec6292ba607f0b35b5cda1de1cedb8beda0c0595b72015e7d17746f8e8111";

const RPC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/";

const CONTRACT_ADDRESS = "0xc06fdEbA4F7Fa673aCe5E5440ab3d495133EcE7a";

const CONTRACT_ABI = [
  {
    inputs: [],
    name: "get",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "data", type: "string" }],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const main = async () => {
  const web3 = new Web3(RPC_URL);

  const account = web3.eth.accounts.wallet.add(PRIVATE_KEY).address;

  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  const gas = await contract.methods.set("Ho Duc Thang").estimateGas({
    from: account,
  });

  await contract.methods.set("Ho Duc Thang").send({
    from: account,
    gas: gas,
  });

  const fullName = await contract.methods.get().call();

  console.log(fullName);
};

main();
