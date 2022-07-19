const express = require('express') // express 모듈을 가져온다
const app = express() // function을 이용해 새로운 express app을 만든다
const port = 5000 // 포트 지정
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key')
const {auth} = require('./middleware/auth')
const {User} = require("./models/User");

// application/x-www-form-urlencoded 정보를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.urlencoded({extended: true}));

// application/json 정보를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.json())
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true // 오류방지
}).then(() => console.log('MongoDB Connected..')) // 연결이 잘 되었을 경우
  .catch(err => console.log(err)) // 연결 실패
 

app.get('/', (req, res) => {
  res.send('hello world')
})  // 루트 디렉터리에 오면 hello world를 출력해준다.

app.get('/api/hello', (req, res) => {
  res.send("안녕하세요")
})

app.post('/api/users/register', (req, res) =>{

  //회원가입 할 때 필요한 정보들을 클라이언트에서 가져오면
  //그것들을 데이터베이스에 넣어준다.
   const user =  new User(req.body)

   user.save((err, userInfo) =>{
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
   })
})

app.post('/api/users/login', (req, res) =>{

  //요청된 아이디 찾기
  User.findOne({ email: req.body.email }, (err, user) =>{
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "해당 아이디는 존재하지 않습니다."
      })
    }

    //해당 아이디가 존재한다면 비밀번호가 일치하는지 확인
    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch){
        return res.json({loginSuccess: false, message:"비밀번호가 일치하지 않습니다."})
      }

      //비밀번호가 맞다면 토큰 생성
      user.generateToken((err, user)=>{
        if(err) return res.status(400).send(err);

        //토큰을 저장한다. (쿠키 or 로컬 or 세션)
        res.cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess: true, userId: user._id})
    })
  })
}) 
})


app.get('/api/users/auth', auth, (req, res) => { // 여기 auth는 middleware

  // 미들웨어 통과한 경우 Authentication이 True
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) =>{

  User.findOneAndUpdate({_id: req.user._id},
    {token: ""},
    (err, user)=>{
      if(err) return res.json({success: false, err});
      return res.status(200).send({
        success: true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) // 앱이 port에 listen하게되면 콘솔 출력