const express = require('express') // express 모듈을 가져온다
const app = express() // function을 이용해 새로운 express app을 만든다
const port = 5000 // 포트 지정
const bodyParser = require('body-parser');

const config = require('./config/key')

const {User} = require("./models/User");

// application/x-www-form-urlencoded 정보를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.urlencoded({extended: true}));

// application/json 정보를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true // 오류방지
}).then(() => console.log('MongoDB Connected..')) // 연결이 잘 되었을 경우
  .catch(err => console.log(err)) // 연결 실패
 

app.get('/', (req, res) => {
  res.send('hello world')
})  // '/' 루트 디렉터리에 오면 hello world를 출력해준다.

app.post('/register', (req, res) =>{

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) // 앱이 port에 listen하게되면 콘솔 출력