const express = require('express') // express 모듈을 가져온다
const app = express() // function을 이용해 새로운 express app을 만든다
const port = 5000 // 포트 지정

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://oooo4124:zxc153@study.diecjsh.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true // 오류방지
}).then(() => console.log('MongoDB Connected..')) // 연결이 잘 되었을 경우
  .catch(err => console.log(err)) // 연결 실패
 

app.get('/', (req, res) => {
  res.send('Hello World!!!!ㅁㄴㅇㅁ')
})  // '/' 루트 디렉터리에 오면 hello world를 출력해준다.

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) // 앱이 port에 listen하게되면 콘솔 출력