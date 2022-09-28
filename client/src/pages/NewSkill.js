import React, {useState} from "react";
import {Table, Row, Col} from "react-bootstrap";
import axios from "axios";
import '../css/NewSkill.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import {Skill_URL} from '../constants';

const MySwal = withReactContent(Swal);

function NewSkill () {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [level1, setLevel1] = useState("");
    const [level2, setLevel2] = useState("");
    const [level3, setLevel3] = useState("");
    const [level4, setLevel4] = useState("");
    const [level5, setLevel5] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        var data = {
            name: name,
            des: description,
            levels: [
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
        await axios.post(Skill_URL, data)
                .then((res) => {
                    if (res.status === 200 || res.status === 201){
                        MySwal.fire({
                            title: 'Success!',
                            text: 'The skill has been added.',
                            icon: 'success',
                            confirmButtonColor: '#7FCFFF',
                            allowOutsideClick: false,
                            allowEscapeKey: false
                          }).then((result) => {
                            if (result.isConfirmed){
                                window.location.reload();
                            }
                          })
                    }else{
                        MySwal.fire({
                            title: 'Something went wrong!',
                            text: `Status ${res.status} (${res.statusText})`,
                            icon: 'error',
                            confirmButtonColor: '#7FCFFF',
                            allowOutsideClick: false,
                            allowEscapeKey: false
                          })
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        
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
                        <button type="submit" value="Submit" className="submit-btn" >save new skill</button>  
                    </div>      
                </form>
            </div>

        </div>
    )
}

export default NewSkill;