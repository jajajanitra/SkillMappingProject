import UserType from "../components/UserType";
import NavBar from "../components/NavBar";
import Instruction from "../components/Instrction";

function StuHome () {
    return (
        <div>
            <NavBar></NavBar>
            <div className="content-div">
                <div>
                    <div className="card shadow-md bg-white p-4 m-4 ">
                        <h5 className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-600 text-2xl w-fit">Skill Mapping คืออะไร?</h5>
                        <p className="text-xl text-gray-600 p-2">&nbsp; &nbsp; Skill Mapping คือ เว็บไซต์ที่จะเป็นตัวช่วยสำหรับนักศึกษาวิศวกรรมคอมพิวเตอร์ให้ไปสู่อาชีพที่ต้องการ เพื่อให้นักศึกษาได้รู้ถึงทักษะของตนเองจากรายวิชาที่เคยเรียน ซึ่งสามารถดูได้จากเมนูสรุปข้อมูล 
                        สำหรับนักศึกษาที่มีอาชีพที่สนใจสามารถดูข้อมูลเกี่ยวกับอาชีพได้ที่เมนูวิเคราะห์อาชีพ และนักศึกษาที่ยังไม่มีอาชีพที่สนใจสามารถใช้เมนูแนะนำอาชีพเพื่อให้ช่วยแนะนำอาชีพที่น่าจะเหมาะสมกับทักษะที่ตนเองมีได้</p>
                    </div>
                </div>
                <div>
                    <Instruction></Instruction>
                </div>
                <div>
                    <UserType></UserType>
                </div>
            </div>
        </div>
    );
}

export default StuHome;