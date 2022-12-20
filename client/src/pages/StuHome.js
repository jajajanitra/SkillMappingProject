import SideBar from "../components/SideBar";

function StuHome () {
    return (
        <div className="flex">
            <SideBar></SideBar>
            <div className="w-full p-4">
                <h4>หน้าแรก</h4>
            </div>
        </div>
    );
}

export default StuHome;