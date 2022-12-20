import {AiOutlineHome, AiOutlineLike, AiOutlineBulb, AiOutlineFileSearch, AiOutlineUser} from 'react-icons/ai';
import {BiBookAdd} from 'react-icons/bi';
import {GiHamburgerMenu} from 'react-icons/gi';
import {TbClipboardCheck} from 'react-icons/tb';

import { useState } from 'react';

function SideBar () {
    const [open, setOpen] = useState(true);
    return (
        <div className={`bg-gradient-to-b from-dark-purple-bg to-dark-blue-bg p-3 min-h-screen ${open ? "w-72" : "w-16"}
        duration-300 relative`}>
            
            <div className='inline-flex mb-2'>
                <GiHamburgerMenu className='text-white text-3xl cursor-pointer mr-2'
            onClick={() => setOpen(!open) }></GiHamburgerMenu>
            <h6 className={`text-white origin-left text-xl font-bold ${!open && "scale-0"}`}>เมนู</h6>
            </div>

            <ul className={`${!open && "hidden"} ml-0`}>
                <li className='text-white text-sm flex-items-center gap-x-4 p-2
                    hover:bg-dark-purple-hv rounded-md mt-1'>
                    <a href="/student_home"
                    className='text-white no-underline'>
                        <div>
                        <span className={`block float-left text-xl mr-2 `}><AiOutlineHome/></span>
                        <span className={`text-base font-medium flex-1 `}>หน้าแรก</span>      
                        </div>                      
                    </a>
                </li>

                <li className='text-white text-sm flex-items-center gap-x-4 p-2
                    hover:bg-dark-purple-hv rounded-md mt-1'>
                    <a href="/student_fillInformation"
                    className='text-white no-underline'>
                        <div>
                        <span className={`block float-left text-xl mr-2 `}><BiBookAdd /></span>
                        <span className={`text-base font-medium flex-1 `}>กรอกข้อมูล</span>
                        </div>
                    </a>
                </li>

                <li className='text-white text-sm flex-items-center gap-x-4 p-2
                    hover:bg-dark-purple-hv rounded-md mt-1'>
                    <a href="/student_careers"
                    className='text-white no-underline'>
                        <div>
                        <span className={`block float-left text-xl mr-2 `}><AiOutlineFileSearch /></span>
                        <span className={`text-base font-medium flex-1 `}>ข้อมูลอาชีพ</span>   
                        </div>                         
                    </a>
                </li>

                <li className='text-white text-sm flex-items-center gap-x-4 p-2
                    hover:bg-dark-purple-hv rounded-md mt-1'>
                    <a href="/student_suggestion"
                    className='text-white no-underline'>
                        <div>
                        <span className={`block float-left text-xl mr-2 `}><AiOutlineBulb /></span>
                        <span className={`text-base font-medium flex-1 `}>แนะนำอาชีพ</span>
                        </div>
                    </a>
                </li>

                <li className='text-white text-sm flex-items-center gap-x-4 p-2
                    hover:bg-dark-purple-hv rounded-md mt-1'>
                    <a href="/student_user"
                    className='text-white no-underline'>
                        <div>
                        <span className={`block float-left text-xl mr-2 `}><AiOutlineUser /></span>
                        <span className={`text-base font-medium flex-1 `}>ข้อมูลผู้ใช้</span>
                        </div>
                    </a>
                </li>

            </ul>
        </div>

    );
}

export default SideBar;