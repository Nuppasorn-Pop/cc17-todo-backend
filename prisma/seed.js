// npx prisma db seed => Insert data ลงใน Table
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const password = bcrypt.hashSync("123456");
// hashSync("123456") => hash ครั้งเดียว เลยทำให้ password ใน database ของแต่ละ username จึงซ้ำกัน ดังนั้นตอนทำโปรเจคต้อง hash แยก
const userData = [
  { username: "andy", password, email: "andy@ggg.mail" },
  { username: "bobby", password, email: "bobby@ggg.mail" },
  { username: "candy", password, email: "candy@ggg.mail" },
];

const todoData = [
  { title: "Learn HTML", dueDate: new Date(), userId: 1 },
  { title: "Learn CSS", dueDate: new Date(), userId: 1 },
  { title: "Learn JS", dueDate: new Date(), userId: 2 },
  { title: "Learn React", dueDate: new Date(), userId: 3 },
];

const run = async () => {
  await prisma.user.createMany({ data: userData });
  await prisma.todo.createMany({ data: todoData });
};

run();
