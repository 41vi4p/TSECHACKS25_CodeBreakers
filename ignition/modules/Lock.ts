// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DeployModule = buildModule("TokenModule", (e) => {
  const sample = e.contract("LoanManagement");
  return sample;
});

module.exports = DeployModule;