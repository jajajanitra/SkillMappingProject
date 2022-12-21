import '../css/Home.css';

function Home () {
    return (
        <div className="Home">
            <h1 className="home-text">Welcome to CPE skill mapping</h1>
            <div className='text-center'>This is a part of the 2022 CPE senior project<br />
                <b>"Development of a skill-based career recommendation website using learner-career skill mapping techniques"</b>
                <br />by Kantika Khampan, Janitra Chaikird.
            </div>
            <p>Advisor: Dr.Thanatip Chankong</p>
            <a href="/achievedSkill">
                <button className="normal-btn">Add achieved skills from course </button>
            </a>
        </div>
    )
}

export default Home;