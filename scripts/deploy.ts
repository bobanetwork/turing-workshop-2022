import hre, {artifacts, ethers} from "hardhat";
import {ContractFactory, providers, Wallet} from "ethers";
import TuringHelperJson from "../artifacts/contracts/TuringHelper.sol/TuringHelper.json";
import LendingJson from "../artifacts/contracts/Lending.sol/Lending.json";
const cfg = hre.network.config

async function main() {
  const local_provider = new providers.JsonRpcProvider(cfg['url'])
  const testPrivateKey = process.env.PRIVATE_KEY ?? '0x___________'
  const testWallet = new Wallet(testPrivateKey, local_provider)

  const Factory__Helper = new ContractFactory(
    TuringHelperJson.abi,
    TuringHelperJson.bytecode, testWallet)

  const helper = await Factory__Helper.deploy()
  console.log("Turing Helper contract deployed at", helper.address)

  const Factory__Lending = new ContractFactory(
      LendingJson.abi,
      LendingJson.bytecode, testWallet)

  const lending = await Factory__Lending.deploy(helper.address)
  console.log("Lending contract deployed at", lending.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
