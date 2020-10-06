const mongoose = require("mongoose");
const dotenv = require("dotenv");


const connect = () => {
  mongoose.set("debug", true);

  mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
    },
    (error) => {
      if (error) {
        console.log("몽고디비 연결 에러", error);
      } else {
        console.log("몽고디비 연결 성공");
      }
    }
  );
};
mongoose.connection.on("connecting", () => {
  console.log("몽고디비 연결 시도중!");
});
mongoose.connection.on("error", (error) => {
  console.error("몽고디비 연결 에러", error);
});
mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  connect();
});

module.exports = connect;
