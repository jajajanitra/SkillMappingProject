import axios from "axios";
import jwt from "jsonwebtoken";
import StudentModel from '../models/studentmodent.js';
import SkillsModel from '../models/skillmodel.js';

export const login = async (req,res) =>{
    const authorizationCode = req.body.authorizationCode;
    // console.log(authorizationCode);

    // const authorizationCode = 'Av37sKx4ZKWyW29YF8eDMnWPxQ8SXAw8';
    async function getOAuthAccessTokenAsync(authorizationCode){
        try {
            const response = await axios.post(
                process.env.CMU_OAUTH_GET_TOKEN_URL,null,{
                    params: {
                        code: authorizationCode,
                        redirect_uri: process.env.CMU_OAUTH_REDIRECT_URL,
                        client_id: process.env.CMU_OAUTH_CLIENT_ID,
                        client_secret: process.env.CMU_OAUTH_CLIENT_SECRET,
                        grant_type: "authorization_code",
                    }
                }
            );
            return response.data.access_token;
        } catch (err) {
            console.log(err);
            return null;
        }
    };
      
    async function getCMUBasicInfoAsync(accessToken) {
        try {
            const response = await axios.get(
                process.env.CMU_OAUTH_GET_BASIC_INFO,{
                    headers: { Authorization: "Bearer " + accessToken },
                }
            );
            return response.data ;
        } catch (err) { 
            return null;
        }
    };
        //validate authorizationCode
        if (typeof authorizationCode !== "string"){
            return res.status(400).json({ ok: false, message: "Invalid authorization code" });
        };
        
        //get access token
        const accessToken = await getOAuthAccessTokenAsync(authorizationCode);
        if (!accessToken){
            return res.status(401).json({ ok: false, message: "Cannot get OAuth access token" });
        };
            
        //get basic info
        const cmuBasicInfo = await getCMUBasicInfoAsync(accessToken);
        if (!cmuBasicInfo){
            return res.status(402).json({ ok: false, message: "Cannot get cmu basic info" });
        };
    
    try{
        const token = jwt.sign(
            {
                cmuAccount: cmuBasicInfo.cmuitaccount,
                firstName: cmuBasicInfo.firstname_EN,
                lastName: cmuBasicInfo.lastname_EN,
                studentId: cmuBasicInfo.student_id, //Note that not everyone has this. Teachers and CMU Staffs don't have student id!
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h", // Token will last for one hour only
            }
        );

        const student_id = cmuBasicInfo.student_id;
        // console.log(typeof student_id);

        const studentfind =  await StudentModel.find({student_id :student_id});
        // console.log(studentfind);
        const skill =  await SkillsModel.find();
        var skills = [];
        for(let i=0; i<skill.length;i++){
            skills[i] = {
                skill_name : skill[i].name,
                level_id : 0,
                skill_like : 2,
                skill_self : 0 
            };
        };
        let date = new Date();
        let dd = date.getDate();
        let mm = date.getMonth();
        let yy = date.getFullYear();
        mm = mm+1;
        date = dd +"/" +mm +"/"+yy;
        // console.log(date);


        if(studentfind.length === 0){
            const student = new StudentModel({token : accessToken,
                student_name : cmuBasicInfo.firstname_EN +" "+ cmuBasicInfo.lastname_EN,
                student_id : cmuBasicInfo.student_id,
                time_stamp : date,
                skills : skills})
            try {
                await student.save();
                var obj = {
                    token: accessToken,
                    cmuAccount: cmuBasicInfo.cmuitaccount,
                    student_name : cmuBasicInfo.firstname_EN +" "+ cmuBasicInfo.lastname_EN,
                    studentId: cmuBasicInfo.student_id,
                };
                res.status(201).json (obj);
            } catch (error) {
                res.status(409).json({ message: error.message });
            }
        } else { 
            const updatedtoken = { token : accessToken };
            await StudentModel.findOneAndUpdate({student_id: student_id}, updatedtoken, { new: true });
            var obj = {
                token: accessToken,
                cmuAccount: cmuBasicInfo.cmuitaccount,
                student_name : cmuBasicInfo.firstname_EN +" "+ cmuBasicInfo.lastname_EN,
                studentId: cmuBasicInfo.student_id,
            };
            // console.log(obj);
            res.status(201).json (obj);
        };


        //   res.status(200).json(cmuBasicInfo.firstname_EN);

    } catch(error){
        res.status(500).json({ message: error.message });
    };
};