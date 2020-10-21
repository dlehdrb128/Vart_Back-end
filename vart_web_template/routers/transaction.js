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

async function transaction(data) {
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
    let result
    let readData
    console.log(data)
    switch (data.function) {
      case "readPublicinfo":
        readData = await contract.evaluateTransaction(
          data.function,
          data.infoKey
        );

        result = {
          result: true,
          data: readData
        }

        return result;
      case "initLedgerPubilcinfo":
        await contract.submitTransaction(data.function);
        await gateway.disconnect();
        result = {
          result: true
        }
        return result

      case "addPublicinfo":
        await contract.submitTransaction(
          data.function,
          data.infoKey,
          data.basicinfo.establishment,
          data.basicinfo.location,
          data.basicinfo.statejurisdiction,
          data.tokenprofile.tokenname,
          data.tokenprofile.projecttype,
          data.executives.name,
          data.executives.education,
          data.executives.experience,
          data.developerleaders.name,
          data.developerleaders.education,
          data.developerleaders.experience
        );
        await gateway.disconnect();

        result = {
          result: true
        }

        return result;
      case "readAllPublicinfo":
        console.log(data.function)
        console.log("AA")
        readData = await contract.evaluateTransaction(data.function);
        console.log(readData)

        result = {
          result: true,
          data: readData
        }

        return result;
      case "updatePublicinfo":
        await contract.submitTransaction(
          data.function,
          data.infoKey,
          data.basicinfo.establishment,
          data.basicinfo.location,
          data.basicinfo.statejurisdiction,
          data.tokenprofile.tokenname,
          data.tokenprofile.projecttype,
          data.executives.name,
          data.executives.education,
          data.executives.experience,
          data.developerleaders.name,
          data.developerleaders.education,
          data.developerleaders.experience
        );
        await gateway.disconnect();

        result = {
          result: true
        }
        return result
      default:
        result = {
          result: false,
          data: "함수를 찾을 수 없습니다."
        }
        return result
    }
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);

    result = {
      result: false,
      data: error
    }

    return result
  }
}

module.exports = transaction;
