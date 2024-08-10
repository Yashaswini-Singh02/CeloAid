import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FundingModule = buildModule("FundingModule", (m) => {
  const minContribution = m.getParameter("minContribution", 0);
  const maxContribution = m.getParameter("maxContribution", 1000);

  const funding = m.contract("Funding", [minContribution, maxContribution]);

  return { funding };
});

export default FundingModule;
