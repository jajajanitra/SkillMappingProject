
function StuLogin () {
    
    return (
        <div className="h-screen flex justify-center align-middle items-center">
            <div className="grid grid-cols-1">
                <img src={require("../images/SkillMappingName.png")} class="h-40 lg:h-64 mx-4" alt="SkillMapping Name Logo " />
                <a href={process.env.REACT_APP_NEXT_PUBLIC_CMU_OAUTH_URL} className="grid justify-items-center no-underline my-3">
                    <button className="login-btn">เข้าสู่ระบบโดย CMU Account</button>
                </a>
                
            </div>

        </div>
    )

}

export default StuLogin;