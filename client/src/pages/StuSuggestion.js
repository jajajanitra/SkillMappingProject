import { Server_URL } from "../constants";

import SideBar from "../components/SideBar";

function StuSuggestion () {

    return (
        <div className="flex">
            <SideBar></SideBar>
            <div className="p-4 w-full">
                <h4>แนะนำอาชีพ</h4>
            </div>
        </div>
    )
}

export default StuSuggestion;