import '../css/Home.css';

function Home () {
    return (
        <div className="Home">
            <h1>Welcome to skill mapping</h1>
            <a href="/achievedSkill">
                <button className="normal-btn">Add achieved skills from course </button>
            </a>
        </div>
    )
}

export default Home;