const LocalStrategy = require('passport-local').Strategy;
const Users = require('./schemas/user')

let passportfnc = function (passport) {
    passport.serializeUser(function (user, done) {
        const result = {
            email: user.email,
            permission: user.permission
        }

        done(null, result);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: true,
        passReqToCallback: false,
    }, (email, password, done) => {

        Users.findOne({ email }, (findError, user) => {
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