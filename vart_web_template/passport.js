const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./schemas/user')

let passportfnc = function () {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        Users.findById(id, function (err, user) {
            done(err, user);
        });
    });
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: true,
        passReqToCallback: false,
    }, (email, password, done) => {

        Users.findOne({ email: email }, (findError, user) => {

            if (findError) return done(findError); // 서버 에러 처리
            if (!user) return done(null, false, { message: '존재하지 않는 아이디입니다' }); // 임의 에러 처리

            return user.comparePassword(password, (passError, isMatch) => {
                if (isMatch) {

                    return done(null, user); // 검증 성공
                }
                return done(null, false, { message: '비밀번호가 틀렸습니다' });
            })
        }
        )
    }))

}
module.exports = passportfnc