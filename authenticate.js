const Company = require('./schemas/company')

const admin = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.permission === 'admin') {
            next()
        } else {
            res.json({ message: "잘못된 권환" })
        }
    } else {
        res.json({ message: '로그인 하세요' })
    }
}

const user = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.json({ message: '로그인 하세요' })
    }
}
const company = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.permission === 'company' | req.user.permission === 'admin') {
            next()
        } else {
            res.json({ message: "잘못된 권환" })
        }
    } else {
        res.json({ message: '로그인 하세요' })
    }
}

const signUp = (req, res, next) => {
    Company.findOne({ companyNum: req.body.companyNum }, (err, result) => {
        if (err) {
            console.log(err)
            res.json({ error: "서버 에러" })
        } else if (!result) {
            res.json({ message: "기업인이 아닙니다." })
        } else {
            next()
        }
    })
}

module.exports = {
    admin,
    user,
    company,
    signUp
}