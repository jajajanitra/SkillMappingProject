
function UserType() {

    return (
        <div>

            <div>
                <h3 className="text-center">คุณเป็นคนที่...</h3>
            </div>

            <div className="grid justify-items-center md:flex md:justify-evenly">
                <div class="user-card">
                    <a href="/student_careers" className="card-link">
                        <img src={require("../images/CareerDestination.png")} class="rounded-t-lg p-2" alt="CareerDestination" />
                        <div class="p-4">
                            <h5 class="card-subheader">มีอาชีพที่สนใจ</h5>
                        </div>    
                    </a>
                </div>

                <div class="user-card">
                    <a href="/student_suggestion" className="card-link">
                        <img src={require("../images/CareerSuggestion.png")} class="rounded-t-lg p-2" alt="CareerDestination" />
                        <div class="p-4">
                            <h5 class="card-subheader">ยังไม่รู้ว่าอยากทำอาชีพอะไร</h5>
                        </div>    
                    </a>
                </div>
            </div>  

        </div>
    )

}

export default UserType;