/*
 * SPDX-License-Identifier: Apache-2.0
 */

const readPublicinfo = async (request) => {
  let readData = await request.contract.evaluateTransaction(
    'readPublicinfo',
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
  const readData = await request.contract.evaluateTransaction('readAllPublicinfo');

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
  readAllPublicinfo,
  readPublicinfo,
  addPublicinfo,
  updatePublicinfo
};
