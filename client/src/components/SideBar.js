import {AiOutlineHome, AiOutlineLike, AiOutlineBulb, AiOutlineFileSearch, AiOutlineUser} from 'react-icons/ai';
import {BiBookAdd} from 'react-icons/bi';
import {GiHamburgerMenu} from 'react-icons/gi';
import {TbClipboardCheck} from 'react-icons/tb';

import { useState } from 'react';

const SideBar = () => {
    const [open, setOpen] = useState(true);
    return (
        <div className="flex">

            <div className={`bg-gradient-to-b from-dark-purple-bg to-dark-blue-bg h-screen p-3 ${open ? "w-64" : "w-16"}
            duration-300 relative`}>
                
                <div className='inline-flex mb-2'>
                    <GiHamburgerMenu className='text-white text-3xl cursor-pointer mr-2'
                onClick={() => setOpen(!open) }></GiHamburgerMenu>
                <h6 className={`text-white origin-left text-xl font-bold ${!open && "scale-0"}`}>เมนู</h6>
                </div>

                <ul className={`${!open && "hidden"} ml-0`}>
                    <li className='text-white text-sm flex-items-center gap-x-4 p-2
                      hover:bg-dark-purple-hv rounded-md mt-1'>
                        <span className={`block float-left text-xl mr-2 `}><AiOutlineHome/></span>
                        <span className={`text-base font-medium flex-1 `}>หน้าแรก</span>
                    </li>

                    <li className='text-white text-sm flex-items-center gap-x-4 p-2
                      hover:bg-dark-purple-hv rounded-md mt-1'>
                        <span className={`block float-left text-xl mr-2 `}><BiBookAdd /></span>
                        <span className={`text-base font-medium flex-1 `}>รายวิชาที่เรียน</span>
                    </li>

                    <li className='text-white text-sm flex-items-center gap-x-4 p-2
                      hover:bg-dark-purple-hv rounded-md mt-1'>
                        <span className={`block float-left text-xl mr-2 `}><TbClipboardCheck /></span>
                        <span className={`text-base font-medium flex-1 `}>ประเมินทักษะ</span>
                    </li>

                    <li className='text-white text-sm flex-items-center gap-x-4 p-2
                      hover:bg-dark-purple-hv rounded-md mt-1'>
                        <span className={`block float-left text-xl mr-2 `}><AiOutlineLike /></span>
                        <span className={`text-base font-medium flex-1 `}>ประเมินความชอบ</span>
                    </li>

                    <li className='text-white text-sm flex-items-center gap-x-4 p-2
                      hover:bg-dark-purple-hv rounded-md mt-1'>
                        <span className={`block float-left text-xl mr-2 `}><AiOutlineFileSearch /></span>
                        <span className={`text-base font-medium flex-1 `}>ข้อมูลอาชีพ</span>
                    </li>

                    <li className='text-white text-sm flex-items-center gap-x-4 p-2
                      hover:bg-dark-purple-hv rounded-md mt-1'>
                        <span className={`block float-left text-xl mr-2 `}><AiOutlineBulb /></span>
                        <span className={`text-base font-medium flex-1 `}>แนะนำอาชีพ</span>
                    </li>

                    <li className='text-white text-sm flex-items-center gap-x-4 p-2
                      hover:bg-dark-purple-hv rounded-md mt-1'>
                        <span className={`block float-left text-xl mr-2 `}><AiOutlineUser /></span>
                        <span className={`text-base font-medium flex-1 `}>ข้อมูลผู้ใช้</span>
                    </li>

                </ul>
            </div>

        </div>
    );
}

export default SideBar;