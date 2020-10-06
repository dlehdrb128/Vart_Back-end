const router = require("express").Router();
const transaction = require("transaction");

//한명 조회
router.get("/query/:infoKey", async (req, res) => {
  const { infoKey } = req.params;
  console.log(infoKey);

  var data = {
    function: "readPublicinfo",
    infoKey: infoKey,
  };

  var result = await transaction(data);

  console.log(result);
  res.json(result);
});

//전체 조회
router.get("/queryAll", async (req, res) => {
  var data = {
    function: "readAllPublicinfo",
  };

  var result = await transaction(data);

  console.log(result);
  res.json(result);
});

//공시 정보 입력
router.post("/invoke", async (req, res) => {
  var data = {
    function: "addPublicinfo",
    infoKey: req.body.infoKey,
    basicinfo: {
      companyname: req.body.basicinfo.companyname,
      establishment: req.body.basicinfo.establishment,
      location: req.body.basicinfo.location,
      statejurisdiction: req.body.basicinfo.statejurisdiction,
    },
    tokenprofile: {
      tokenname: req.body.tokenprofile.tokenname,
      projecttype: req.body.tokenprofile.projecttype,
    },
    executives: {
      name: req.body.executives.name,
      education: req.body.executives.education,
      experience: req.body.executives.experience,
    },
    developerleaders: {
      name: req.body.developerleaders.name,
      education: req.body.developerleaders.education,
      experience: req.body.developerleaders.experience,
    },
  };

  await transaction(data);

  res.sendStatus(200);
});

//공시 정보 업데이트
router.post("/update", async (req, res) => {
  var data = {
    function: "updatePublicinfo",
    infoKey: req.body.infoKey,
    basicinfo: {
      companyname: req.body.basicinfo.companyname,
      establishment: req.body.basicinfo.establishment,
      location: req.body.basicinfo.location,
      statejurisdiction: req.body.basicinfo.statejurisdiction,
    },
    tokenprofile: {
      tokenname: req.body.tokenprofile.tokenname,
      projecttype: req.body.tokenprofile.projecttype,
    },
    executives: {
      name: req.body.executives.name,
      education: req.body.executives.education,
      experience: req.body.executives.experience,
    },
    developerleaders: {
      name: req.body.developerleaders.name,
      education: req.body.developerleaders.education,
      experience: req.body.developerleaders.experience,
    },
  };
  await transaction(data);

  res.sendStatus(200);
});

module.exports = router;
