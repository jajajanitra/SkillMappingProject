import {RiFileEditLine, RiBriefcase2Line, RiSurveyLine, RiPhoneFindLine} from 'react-icons/ri';

function Instruction(){

    return (
        <div className='p-4 m-4 card'>
            <div>
                <h5 className='text-3xl text-center text-dark-purple-font'>อย่าลืมกรอกข้อมูลให้ครบ!</h5>
            </div>
            <a href='\student_fillinformation' className='no-underline'>
                <div className='flex justify-center'>
                    {/* <div className='grid justify-items-center m-2'>
                        <a href='\student_fillinformation' className='grid justify-items-center no-underline text-gray-800'>
                            <RiFileEditLine className='h-16 w-16 text-amber-400'></RiFileEditLine>
                            <p className='m-1 text-xl'>กรอกข้อมูล</p>    
                        </a>
                        

                    </div>
                    <div className='grid justify-items-center m-2'>
                        <RiSurveyLine className='h-16 w-16 text-purple-500'></RiSurveyLine>
                        <p className='m-1 text-xl'>เลือกเมนูที่ต้องการ</p>

                    </div>
                    <div className='m-2'>
                        <a href='\student_careers' className='grid justify-items-center no-underline text-gray-800'>
                            <RiPhoneFindLine className='h-16 w-16 text-amber-400'></RiPhoneFindLine>
                            <p className='m-1 text-xl'>ดูข้อมูลของอาชีพที่สนใจ</p>     
                        </a>
                        

                    </div>
                    <div className='grid justify-items-center m-2'>
                        <a href='\student_suggestion' className='grid justify-items-center no-underline text-gray-800'>
                            <RiBriefcase2Line className='h-16 w-16 text-purple-500'></RiBriefcase2Line>
                            <p className='m-1 text-xl'>ดูว่าอาชีพไหนน่าจะเหมาะกับคุณ</p>    
                        </a>
                        
                    </div> */}

                    <div className='grid justify-items-center p-2 md:mx-8 mt-2'>
                        <h6 className='inline-block align-middle bg-gray-100 rounded-full text-6xl w-16 h-16 text-center text-white bg-gradient-to-r from-sky-500 to-purple-500'>1</h6>
                        <p className='bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-purple-500 text-xl text-center'>รายวิชาที่เรียน</p>
                    </div>
                    <div className='grid justify-items-center p-2 md:mx-8 mt-2'>
                        <h6 className='inline-block align-middle bg-gray-100 rounded-full text-6xl w-16 h-16 text-center text-white bg-gradient-to-r from-sky-500 to-purple-500'>2</h6>
                        <p className='bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-purple-500 text-xl text-center'>ระดับทักษะ</p>
                    </div>
                    <div className='grid justify-items-center p-2 md:mx-8 mt-2'>
                        <h6 className='inline-block align-middle bg-gray-100 rounded-full text-6xl w-16 h-16 text-center text-white bg-gradient-to-r from-sky-500 to-purple-500'>3</h6>
                        <p className='bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-purple-500 text-xl text-center'>ความชอบ</p>
                    </div>
                </div>
            </a>
            
        </div>
    )
};

export default Instruction;