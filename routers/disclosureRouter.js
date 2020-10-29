const router = require("express").Router();
const authenticate = require('../authenticate')
const utils = require("./utils")
const disclosureinfotx = require("./disclosureinfotx")

//조회
router.get("/query", async (req, res) => {
    console.log('공시 조회')

    let data = {
        contract: await utils.wallet('disclosure'),
        no: req.body.no,
    };

    let result = await disclosureinfotx.readDisclosure(data);

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
    console.log('공시 조회')

    var data = {
        contract: await utils.wallet('disclosure')
    };

    let result = await disclosureinfotx.readAllDisclosure(data); // buffer

    if (result.result) {
        const show = result.data.toString('utf-8') // string(JSON)
        const realresult = JSON.parse(show) // object

        const projection = {
            no: 1,
            reportTitle: 1,
            date: 1

        }

        for (let info of realresult) {
            await utils.selectProperties(info, projection)
        }

        res.json(realresult);

    } else {
        console.log(`Error : ${result.data}`)
        res.status(401).json(JSON.parse(result.data))
    }
});

//공시 정보 입력(코인 이름, 코인 가격, 상장 여부 등등)
router.post("/invoke", async (req, res) => {
    console.log('공시정보입력')
    let request = {
        contract: await utils.wallet('disclosure')
    }

    let result = await disclosureinfotx.readAllDisclosure(request); // buffer

    if (result.result) {
        const show = result.data.toString('utf-8') // string(JSON)
        const realresult = JSON.parse(show) // object

        let max = 0;
        for (let info of realresult) {
            max = info.no > max ? info.no : max
        }

        max++
        req.body.no = max.toString()

        request = {
            contract: await utils.wallet('disclosure'),
            disclosure: req.body
        }
        result = await disclosureinfotx.addDisclosure(request);

        if (result) {
            res.status(200).json({ message: 'Success' })
        } else {
            res.status(401).json({ error: "Failed to submit transaction" })
        }
    } else {
        console.log(`Error : ${result.data}`)
        res.status(401).json(JSON.parse(result.data))
    }
})

//공시 정보 업데이트
router.post("/update", async (req, res) => {
    console.log('공시 정보')
    const request = {
        contract: await utils.wallet('disclosure'),
        recentinfo: req.body
    }

    const result = await disclosureinfotx.updateDisclosure(request);

    if (result) {
        res.status(200).send('성공')
    } else {
        console.log(result)
        res.status(401).json(JSON.parse(result))
    }
});

module.exports = router