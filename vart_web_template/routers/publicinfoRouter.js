const router = require("express").Router();
const transaction = require('./transaction')
const Publicinfo = require('../schemas/publicinfo')
const authenticate = require('../authenticate')

const selectProperties = (object, projection) => {
  let isProjection = false

  for (let value of Object.values(projection)) {
    isProjection = isProjection | value
  }


  if (isProjection) {
    for (let objKey of Object.keys(object)) {
      let isKey = false

      for (let [proKey, proValue] of Object.entries(projection)) {
        if (objKey === proKey) {
          if (proValue) {
            isKey = true
          } else {
            delete object[objKey]
          }
        }
      }

      if (!isKey) {
        delete object[objKey]
      }
    }
  } else {
    for (let objKey of Object.keys(object)) {
      for (let [proKey, proValue] of Object.entries(projection)) {
        if (objKey === proKey) {
          if (!proValue) {
            delete object[objKey]
          }
        }
      }
    }
  }
}

//조회
router.get("/query/:infoKey", async (req, res) => {
  const { infoKey } = req.params;
  console.log(infoKey);

  let data = {
    contract: await transaction.wallet(),
    function: "readPublicinfo",
    id: infoKey,
  };

  let result = await transaction.readPublicinfo(data);

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
router.get("/list", async (req, res) => {
  var data = {
    contract: await transaction.wallet(),
    function: "readAllPublicinfo",
  };

  let result = await transaction.readAllPublicinfo(data); // buffer

  if (result.result) {
    const show = result.data.toString('utf-8') // string(JSON)
    const realresult = JSON.parse(show) // object

    const projection = {

      Developerleader: 0,
      Executive: 0


    }

    for (let info of realresult) {
      console.log(info)
      await selectProperties(info, projection)
    }

    res.json(realresult);

  } else {
    console.log(`Error : ${result.data}`)
    res.status(401).json(JSON.parse(result.data))
  }
});

//공시 정보 입력(코인 이름, 코인 가격, 상장 여부 등등)
router.post("/invoke", authenticate.company, async (req, res) => {
  req.body.company.id = `${Date.now()}_${req.body.company.token.name}`

  const request = {
    contract: await transaction.wallet(),
    company: req.body.company
  }

  const result = await transaction.addPublicinfo(request);

  if (result) {
    const publicinfo = new Publicinfo(req.body.company)

    publicinfo.save((err) => {
      if (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal error please try again' })
      } else {
        res.status(200).json({ message: 'Success' })
      }
    })
  } else {
    res.status(401).json({ error: "Failed to submit transaction" })
  }
})

//공시 정보 업데이트
router.post("/update", authenticate.company, async (req, res) => {

  const request = {
    contract: await transaction.wallet(),
    company: req.body.company
  }

  const result = await transaction.updatePublicinfo(request);

  if (result) {
    res.status(200).send('성공')
  } else {
    console.log(reulst)
    res.status(401).json(JSON.parse(result))
  }
});

module.exports = router;


