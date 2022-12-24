import {AiOutlineHome, AiOutlineLike, AiOutlineBulb, AiOutlineFileSearch, AiOutlineUser} from 'react-icons/ai';
import {BiBookAdd} from 'react-icons/bi';


function NavBar (){
    return (
        <div>
            <nav class="bg-white boder border-b-2 px-2 sm:px-4 py-2.5 rounded fixed w-full z-20 top-0 left-0 border-gray-200">
                <div class=" flex flex-wrap items-center justify-between mx-4 lg:mx-16 lg:px-2">
                <a href="" class="flex items-center no-underline">
                    <img src="../Images/SkillMappingLogo.png" class="h-12 mr-3" alt="SkillMapping Logo" />
                    <span class="text-xl text-purple-600">Skill Mapping</span>
                </a>
                <div class="flex items-center lg:order-2">
                    <button type="button" class="flex mr-3 text-sm rounded-full lg:mr-0 focus:ring-4 focus:ring-gray-300 " id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span class="sr-only">Open user menu</span>
                        <img class="w-10 h-10 rounded-full" src="../Images/Panda.jpg" alt="user photo" />
                    </button>
                    {/* for user */}
                    <div class="z-50 hidden my-3 mr-2 text-base list-none bg-white divide-y divide-gray-100 rounded shadow" id="user-dropdown">
                        <div class="px-4 py-3">
                        <span class="block text-sm text-gray-900 ">Bonnie Green</span>
                        <span class="block text-sm font-medium text-gray-500 truncate ">name@flowbite.com</span>
                        </div>
                        <ul class="py-1" aria-labelledby="user-menu-button">
                        

                        </ul>
                    </div>
                    <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 " aria-controls="mobile-menu-2" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6 text-dark-purple-font" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>

                <div class="items-center justify-between hidden w-full h-fit lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul class="flex flex-col p-2  my-2 rounded-lg bg-purple-50 lg:flex-row lg:space-x-8  lg:text-sm md:font-medium  lg:bg-white ">
                        <li className='text-sm flex-items-center gap-x-4 p-2
                           rounded-md mt-1'>
                            <a href="/student_home"
                            className='no-underline text-gray-700 hover:text-dark-purple-font'>
                                <div>
                                <span className={`block float-left text-xl mr-2 `}><AiOutlineHome/></span>
                                <span className={`text-base font-medium flex-1 `}>หน้าแรก</span>      
                                </div>                      
                            </a>
                        </li>

                        <li className='text-sm flex-items-center gap-x-4 p-2
                           rounded-md mt-1'>
                            <a href="/student_fillInformation"
                            className='no-underline text-gray-700 hover:text-dark-purple-font'>
                                <div>
                                <span className={`block float-left text-xl mr-2 `}><BiBookAdd /></span>
                                <span className={`text-base font-medium flex-1 `}>กรอกข้อมูล</span>
                                </div>
                            </a>
                        </li>

                        <li className='text-sm flex-items-center gap-x-4 p-2
                           rounded-md mt-1'>
                            <a href="/student_careers"
                            className='no-underline text-gray-700 hover:text-dark-purple-font'>
                                <div>
                                <span className={`block float-left text-xl mr-2 `}><AiOutlineFileSearch /></span>
                                <span className={`text-base font-medium flex-1 `}>ข้อมูลอาชีพ</span>   
                                </div>                         
                            </a>
                        </li>

                        <li className='text-sm flex-items-center gap-x-4 p-2
                           rounded-md mt-1'>
                            <a href="/student_suggestion"
                            className='no-underline text-gray-700 hover:text-dark-purple-font'>
                                <div>
                                <span className={`block float-left text-xl mr-2 `}><AiOutlineBulb /></span>
                                <span className={`text-base font-medium flex-1 `}>แนะนำอาชีพ</span>
                                </div>
                            </a>
                        </li>

                        <li className='text-sm flex-items-center gap-x-4 p-2
                           rounded-md mt-1'>
                            <a href="/student_user"
                            className='no-underline text-gray-700 hover:text-dark-purple-font'>
                                <div>
                                <span className={`block float-left text-xl mr-2 `}><AiOutlineUser /></span>
                                <span className={`text-base font-medium flex-1 `}>สรุปข้อมูล</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                </div>
            </nav>


        </div>
    )
};

export default NavBar;