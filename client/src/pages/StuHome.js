import UserType from "../components/UserType";
import NavBar from "../components/NavBar";
import Instruction from "../components/Instrction";

function StuHome () {
    return (
        <div>
            <NavBar></NavBar>
            <div className="content-div">
                <h4 className="page-header">หน้าแรก</h4>
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