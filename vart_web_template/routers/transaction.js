/*
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";
const { FileSystemWallet, Gateway } = require("fabric-network");
const fs = require("fs");
const path = require("path");

const ccpPath = path.resolve(__dirname, "../../network/connection.json");
const ccpJSON = fs.readFileSync(ccpPath, "utf8");
const ccp = JSON.parse(ccpJSON);

const wallet = async () => {
  try {
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists("user1");
    if (!userExists) {
      console.log(
        'An identity for the user "user1" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "user1",
      discovery: { enabled: false },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("vart");

    return contract

  } catch (error) {
    console.error(`Wallet Error: ${error}`);

    result = {
      result: false,
      data: error
    }

    return result
  }
}
var result
const readPublicinfo = async (request) => {
  let readData = await request.contract.evaluateTransaction(
    request.function,
    request.id,
  );

  result = {
    result: true,
    data: readData
  }

  return result
}


const addPublicinfo = async (request) => {
  try {
    await request.contract.submitTransaction(
      "addPublicinfo",
      request.company.id,
      request.company.name,
      request.company.establishmentDate,
      request.company.location,
      request.company.jurisdiction,
      request.company.token.name,
      request.company.token.projectType,
      request.company.executive.name,
      request.company.executive.education,
      request.company.executive.experience,
      request.company.developerleader.name,
      request.company.developerleader.education,
      request.company.developerleader.experience
    );

    return true

  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`)

    return false
  }
}

const readAllPublicinfo = async (request) => {
  const readData = await request.contract.evaluateTransaction(request.function);

  var result = {
    result: true,
    data: readData
  }

  return result
}

const updatePublicinfo = async (request) => {
  try {
    await request.contract.submitTransaction(
      "updatePublicinfo",
      request.company.id,
      request.company.name,
      request.company.establishmentDate,
      request.company.location,
      request.company.jurisdiction,
      request.company.token.name,
      request.company.token.projectType,
      request.company.executive.name,
      request.company.executive.education,
      request.company.executive.experience,
      request.company.developerleader.name,
      request.company.developerleader.education,
      request.company.developerleader.experience
    );

    return true

  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`)

    return false
  }
}


module.exports = {
  wallet,
  addPublicinfo,
  updatePublicinfo,
  readPublicinfo,
  readAllPublicinfo
};
