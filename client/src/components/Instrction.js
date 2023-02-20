import {RiFileEditLine, RiBriefcase2Line, RiSurveyLine, RiPhoneFindLine} from 'react-icons/ri';

function Instruction(){

    return (
        <div className='p-4 m-4 card'>
            <div>
                <h5 className='text-xl md:text-3xl text-center text-dark-purple-font'>อย่าลืมกรอกข้อมูลให้ครบ!</h5>
            </div>
            <a href='\student_fillinformation' className='no-underline'>
                <div className='flex justify-center'>
                    <div className='grid justify-items-center p-2 md:mx-8 mt-2'>
                        <h6 className='inline-block align-middle bg-gray-100 rounded-full text-6xl w-16 h-16 text-center text-white bg-gradient-to-r from-sky-500 to-purple-500'>1</h6>
                        <p className='bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-purple-500 md:text-xl text-center '>รายวิชาที่เรียน</p>
                    </div>
                    <div className='grid justify-items-center p-2 md:mx-8 mt-2'>
                        <h6 className='inline-block align-middle bg-gray-100 rounded-full text-6xl w-16 h-16 text-center text-white bg-gradient-to-r from-sky-500 to-purple-500'>2</h6>
                        <p className='bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-purple-500 md:text-xl text-center'>ระดับทักษะ</p>
                    </div>
                    <div className='grid justify-items-center p-2 md:mx-8 mt-2'>
                        <h6 className='inline-block align-middle bg-gray-100 rounded-full text-6xl w-16 h-16 text-center text-white bg-gradient-to-r from-sky-500 to-purple-500'>3</h6>
                        <p className='bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-purple-500 md:text-xl text-center'>ความชอบ</p>
                    </div>
                </div>
            </a>
            
        </div>
    )
};

export default Instruction;