const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const User = require('./user.model.js');

module.exports = (app) => {
  app.use(cookieParser('passportExample'));
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: 'passportExample',
      cookie: {
        httpOnly: true,
        secure: false,
      },
    })
  );


  /* passport middleware */
  app.use(passport.initialize()); // passport 초기화
  app.use(passport.session()); // passport session 연동

  // 세션 처리 - 로그인에 성공했을 경우 딱 한번 호출되어 사용자의 식별자를 session에 저장
  passport.serializeUser(function (user, done) {
    console.log('serializeUser', user);
    done(null, user.userid); // 사용자의 userid를 식별자로 사용
  });

  // 세션 처리 - 로그인 후 페이지 방문 마다 사용자의 실제 데이터 주입
  passport.deserializeUser(async function (userid, done) {
    console.log('deserializeUser');
    try {
      const user = await User.findOne({ userid: userid });
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
  passport.use(
    new LocalStrategy(
      async (username, password, done) => {
        try {
          const user = await User.findOne({ userid: username });
          if (username === user.userid) { // username OK
            if (password === user.userpassword) { // password OK
              console.log('passport local strategy success');
              console.log(user);
              return done(null, user);
            } else {
              return done(null, false, { message: "password incorrect" });
            }
          } else {
            return done(null, false, { message: "username incorrect" });
          }
        } catch (err) {
          return done(null, false, { message: "username incorrect" });
        }
      }
    )
  );

  /* 라우터 설정 */
  /* Passport Login : Strategy-Local */
  /* Authenticate Requests */

  app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      // err는 서버의 에러
      if (err) {
        console.error(err);
        return next(err);
      }
      // info는 로직 상의 에러
      if (info) {
        console.log(req.isAuthenticated());
        return res.send({ code: 0 });
      }
      // 위의 모든 에러가 없다면 로그인 성공
      // req.login을 하면 서버쪽에 세션과 쿠키로 저장이 된다.
      return req.login(user, (loginErr) => {
        // loginErr가 터지면 next로 보내버리고
        if (loginErr) return next(loginErr);
        // 정상적이라면 비밀번호를 제외한 유저 정보를 클라이언트에게 보낸다.
        console.log(req.isAuthenticated());
        req.session.save((err) => {
          if (err) {
            console.error(err)
            next(err)
          } else {
            if (user.userid === 'choo') {
              $socket.emit('socketEvent', { type: 'login',username: user.userid});
              res.send({ code: 2, isLogin: true, username: user.userid});
            }
            else {
              $socket.emit('socketEvent', { type: 'login', username : user.username });
              res.send({ code: 1, isLogin: true, username: user.userid});
            }
          }
        });
      });
    })(req, res, next); //미들웨어 내의 미들웨어에는 (req,res,next)를 붙인다.
  });

  app.get('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
      if (err) {
        console.error(err);
        return next(err);
      }
      res.clearCookie('connect.sid', { httpOnly: true, secure: false }); // 쿠키 설정 옵션 적용
      res.redirect('/');
    });
  });

}