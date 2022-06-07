const RecordsContract = artifacts.require("RecordsContract.sol");

module.exports = function (deployer) {
  deployer.deploy(RecordsContract);
};
