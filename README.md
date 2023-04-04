# การติดตั้ง
## ส่วน Client
1. เข้าไปที่โฟลเดอร์ client
2. สร้างไฟล์ .env ซึ่งในไฟล์จะต้องใส่ค่าตัวแปร ตามไฟล์ example_env.txt ในโฟลเดอร์ client ซึ่งจะเป็นข้อมูลเกี่ยวข้องกับ cmuOauth
3. เปลี่ยนตัวแปร สำหรับ path ของ server ในไฟล์ constants
4. เปิด terminal ที่โฟลเดอร์ client
5. ใช้คำสั่ง npm install เพื่อติดตั้ง dependency
6. ใช้คำสั่ง npm start เพื่อเริ่ม ซึ่งจะทำงานอยู่ที่ locallhost:3000
สำหรับการ build ใช้คำสั่ง npm run build

## ส่วน Server
1. เข้าไปที่โฟลเดอร์ server
2. สร้างไฟล์ .env ซึ่งในไฟล์จะต้องใส่ค่าตัวแปร ตามไฟล์ example_env.txt ในโฟลเดอร์ server ซึ่งจะเป็นข้อมูลเกี่ยวข้องกับ cmuOauth
3. เปิด terminal ที่โฟลเดอร์ server
4. ใช้คำสั่ง npm install เพื่อติดตั้ง dependency
5. ใช้คำสั่ง npm start เพื่อเริ่ม ซึ่งจะทำงานอยู่ที่ locallhost:5001

## ส่วน Database ใน Server
1. ไฟล์ข้อมูล database อยู่ในโฟลเดอร์ Database
2. ดาวน์โหลดไฟล์Collection ทั้งหมดในโฟลเดอร์
3. Import Collection ลง Mongodb
4. Connect Database และนำลิงค์connect มาเปลี่ยนที่ index.js /mongoose.connect('LINK DATABASE', { useNewUrlParser: true })/
