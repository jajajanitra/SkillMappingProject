import React, {useState, useEffect} from "react";
import {Card, Table, Row, Col} from "react-bootstrap";
import '../css/NewSkill.css';

function NewSkill () {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [level1, setLevel1] = useState("");
    const [level2, setLevel2] = useState("");
    const [level3, setLevel3] = useState("");
    const [level4, setLevel4] = useState("");
    const [level5, setLevel5] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleLevel1Change = (event) => {
        setLevel1(event.target.value);
    };
    const handleLevel2Change = (event) => {
        setLevel2(event.target.value);
    };
    const handleLevel3Change = (event) => {
        setLevel3(event.target.value);
    };
    const handleLevel4Change = (event) => {
        setLevel4(event.target.value);
    };
    const handleLevel5Change = (event) => {
        setLevel5(event.target.value);
    };


    return (
        <div>

            <h4 className="top-header">Add new skill</h4>
            <div class="normal-card">
                <form>
                    <div class="skill-input">
                        <Row class="skill-input">
                            <Col>
                                <label>Skill name:</label> 
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <input 
                                    class="textbox"
                                    type="text"
                                    onChange={handleNameChange}
                                    /> 
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>
                                <label>Skill description:</label>  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <textarea
                                    class="level-textbox"
                                    onChange={handleDescriptionChange}/> 
                            </Col> 
                        </Row>
                    </div>

                    <div class="skill-table">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th class="level-col" >Level</th>
                                    <th class="level-col" >Description</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td class="level-col" >1</td>
                                    <td><textarea class="level-textbox" onChange={handleLevel1Change}/></td>
                                </tr>
                                <tr>
                                    <td class="level-col" >2</td>
                                    <td><textarea class="level-textbox" onChange={handleLevel2Change}/></td>
                                </tr>
                                <tr>
                                    <td class="level-col" >3</td>
                                    <td><textarea class="level-textbox" onChange={handleLevel3Change}/></td>
                                </tr>
                                <tr>
                                    <td class="level-col" >4</td>
                                    <td><textarea class="level-textbox" onChange={handleLevel4Change}/></td>
                                </tr>
                                <tr>
                                    <td class="level-col" >5</td>
                                    <td><textarea class="level-textbox" onChange={handleLevel5Change}/></td>
                                </tr>
                            </tbody>
                        </Table>    
                    </div>
                    
                </form>     
            </div>
                
            <button type="submit" className="submit-btn">save new skill</button>  

        </div>
    )
}

export default NewSkill;