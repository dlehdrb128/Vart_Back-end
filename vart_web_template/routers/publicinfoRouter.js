const router = require("express").Router();
const transaction = require("./transaction");

//조회
router.get("/query/:infoKey", async (req, res) => {
  const { infoKey } = req.params;
  console.log(infoKey);

  let data = {
    function: "readPublicinfo",
    infoKey: infoKey,
  };

  let result = await transaction(data);

  if (result.result) {
    const show = result.data.toString('utf-8') // string(JSON)
    const realresult = JSON.parse(show) // object
    res.json(realresult);
  } else {
    console.log(`Error : ${result.data}`)
    res.status(401).json(JSON.parse(result.data))
  }
});

//전체 조회
router.get("/queryAll", async (req, res) => {
  var data = {
    function: "readAllPublicinfo",
  };

  let result = await transaction(data); // buffer
  if (result.result) {
    const show = result.data.toString('utf-8') // string(JSON)
    const realresult = JSON.parse(show) // object
    res.json(realresult);
  } else {
    console.log(`Error : ${result.data}`)
    res.status(401).json(JSON.parse(result.data))
  }
});

//공시 정보 입력(코인 이름, 코인 가격, 상장 여부 등등)
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

  const result = await transaction(data);

  if (result.result) {
    res.status(200).send('성공')
  } else {
    console.log(reulst.data)
    res.status(401).json(JSON.parse(result.data))
  }
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
  }
  const result = await transaction(data);

  if (result.result) {
    res.status(200).send('성공')
  } else {
    console.log(reulst.data)
    res.status(401).json(JSON.parse(result.data))
  }
});

module.exports = router;


