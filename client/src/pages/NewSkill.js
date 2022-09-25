import React, {useState} from "react";
import {Table, Row, Col} from "react-bootstrap";
import '../css/NewSkill.css';

function NewSkill () {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [level1, setLevel1] = useState("");
    const [level2, setLevel2] = useState("");
    const [level3, setLevel3] = useState("");
    const [level4, setLevel4] = useState("");
    const [level5, setLevel5] = useState("");

    const handleSubmit = (event) => {
        var data = {
            skill_name: name,
            skill_des: description,
            skill_level: [
                {
                    level_id: 1,
                    level_des: level1},
                {
                    level_id: 2,
                    level_des: level2},
                {
                    level_id: 3,
                    level_des: level3},
                {
                    level_id: 4,
                    level_des: level4},
                {
                    level_id: 5,
                    level_des: level5},
            ]
        }
        console.log(data);
        event.preventDefault();
    };

    return (
        <div>
            
            <h4 className="top-header">Add new skill</h4>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="skill-input">
                        <Row>
                            <Col>
                                <h6>Skill name:</h6> 
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <input 
                                    className="textbox"
                                    type="text"
                                    onChange={e => setName(e.target.value)}
                                    required
                                    /> 
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>
                                <h6>Skill description:</h6>  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <textarea
                                    className="level-textbox"
                                    onChange={e => setDescription(e.target.value)}
                                    required/> 
                            </Col> 
                        </Row>
                    </div>

                    <div className="skill-table">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th className="level-col" >Skill level</th>
                                    <th className="level-col" >Skill description</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="level-col" >1</td>
                                    <td><textarea className="level-textbox" onChange={e => setLevel1(e.target.value)} required/></td>
                                </tr>
                                <tr>
                                    <td className="level-col" >2</td>
                                    <td><textarea className="level-textbox" onChange={e => setLevel2(e.target.value)} required/></td>
                                </tr>
                                <tr>
                                    <td className="level-col" >3</td>
                                    <td><textarea className="level-textbox" onChange={e => setLevel3(e.target.value)} required/></td>
                                </tr>
                                <tr>
                                    <td className="level-col" >4</td>
                                    <td><textarea className="level-textbox" onChange={e => setLevel4(e.target.value)} required/></td>
                                </tr>
                                <tr>
                                    <td className="level-col" >5</td>
                                    <td><textarea className="level-textbox" onChange={e => setLevel5(e.target.value)} required/></td>
                                </tr>
                            </tbody>
                        </Table>    
                        <button type="submit" className="submit-btn">save new skill</button>  
                    </div>
                </form>     
            </div>

        </div>
    )
}

export default NewSkill;