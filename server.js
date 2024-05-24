const express = require("express");
const app = express();
const authRouter = require("./routes/auth-route");
const todosRouter = require("./routes/todos-route");
// require = ไป read express FN ที่ libary node_module และสั่งให้ FN ทำงานใน server.js เลย
const notFound = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error-middleware");
const authenticate = require("./middlewares/authenticate");

app.use(express.json()); // ==> ทำให้เกิด req.body
// พวก PostAPI, Browser มันจะส่ง requst เป็น string json (object)

app.use("/auth", authRouter);
app.use("/todos", authenticate, todosRouter);
// app.use("/todos",(req,res,next)=>{next{}} ,todosRouter);

app.use(notFound);
app.use(errorMiddleware);

require("dotenv").config();
// dotenv ==> มันจะไป read .env file (read มาเป็น undefined (text))และถ้าจะสิ่งที่อยู่ .env มารันใน server.js ต้องใช้คำสั่ง .config()
// node server.js PORT=8889 (วิธีเรียกใช้งานแบบเก่า ตอนนี้ไม่ใช้แล้ว ใช้ dotenv)
// console.log(process.env.PORT);
// ==> 8889
// console.log(process.env.DATABASE_URL);
// ==> mysql://root:Popzama005$@localhost:3306/cc17_todo
// console.log(process.env.JWT_SECRET);
// ==> TheSeCRET

let port = process.env.PORT || 8000;
app.listen(port, () => console.log("Server on", port));
