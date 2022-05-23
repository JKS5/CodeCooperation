require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const express = require("express");
const app = express();
const indexRouter = require("./controllers/index");

// 시퀄라이즈 모델 테스트
const models = require("./models/index");
models.sequelize
  .sync({ alter:true }) 
  .then(() => {
    console.log("DB연결");
  })
  .catch((err) => {
    console.log("DB연결 실패");
    console.log(err);
  });

// 미들웨어
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(
  cors({
    origin: ["http://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST", "OPTION", "PUT", "DELETE", "PATCH"],
  })
);

// 라우터
app.use("/", indexRouter);

// 서버 실행
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log(`🧶서버가 ${app.get("port")} 포트로 열렸습니다!`);
});

module.exports = app;
