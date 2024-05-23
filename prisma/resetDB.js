// "resetDB": "node prisma/resetDB.js" ใส่ใน script ไฟล์ package.json
// npm run resetDB => คำสั่งนี้คือ ลบ database
// ถ้าต้องการเอา database กลับมาใช้คำสั่ง
// npx prisma db push => npx prisma db seed
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
  await prisma.$executeRawUnsafe("DROP Database cc17_todo");
  await prisma.$executeRawUnsafe("CREATE Database cc17_todo");
}
console.log("Reset DB..");
run();
