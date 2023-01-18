import { Server_URL } from "../constants";

import NavBar from "../components/NavBar";
import useToken from '../components/UseToken';

function StuSuggestion () {
    const { token} = useToken();
    
    return (
        <div>
            <NavBar></NavBar>
            <div className="content-div">
                <h4 className="page-header mb-6">แนะนำอาชีพ</h4>
                <div className="overflow-x-auto lg:grid lg:grid-cols-2 lg:gap-12">
                    <div className="mt-2 mb-4">
                        <h6 className="text-xl border-solid border-l-4 border-stone-500 pl-2 mb-4">อาชีพที่แนะนำจากรายวิชาที่เรียน</h6>
                        <div className="px-2">
                            <a class="career-sugg-card border-blue-700 " href="" >Dev</a>
                        </div>
                    </div>
                    <div className="mt-2 mb-4">
                        <h6 className="text-xl border-solid border-l-4 border-stone-500 pl-2 mb-4">อาชีพที่แนะนำจากการประเมินตนเอง</h6>
                        <div className="px-2">
                            <a class="career-sugg-card border-orange-500 " href="" >Dev</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StuSuggestion;