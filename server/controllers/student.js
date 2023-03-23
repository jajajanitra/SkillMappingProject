import StudentModel from '../models/studentmodent.js';
import CoursesModel from '../models/coursesmodel.js';
import SkillsModel from '../models/skillmodel.js';

//show datastudent
export const getStudent = async (req,res) =>{
    // const token = 12345;
    const  token_id  = req.params.token;
    try{

        const student =  await StudentModel.find({student_id : token_id});
        const check = await SkillsModel.find();
        var skillslist =[];
        for(let i=0;i<check.length;i++){
            for(let j=0;j<student[0].skills.length;j++){
                if(check[i].name === student[0].skills[j].skill_name){
                    skillslist[i] = {
                        skill_name : student[0].skills[j].skill_name,
                        level_id : student[0].skills[j].level_id,
                        skill_like : student[0].skills[j].skill_like,
                        skill_self :student[0].skills[j].skill_self
                    };
                };
            };
        };

        var obj = {
            student,
            skillslist
        };

            res.status(200).json(obj);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};


//add like skill
export const addLikeskills = async (req,res) =>{
    // sent array 
        const {token,skill} = req.body;

        // console.log(token);
        // console.log(skill);
        try{
            let date = new Date();
            let dd = date.getDate();
            let mm = date.getMonth();
            let yy = date.getFullYear();
            mm = mm+1;
            date = dd +"/" +mm +"/"+yy;
            const updatedate = { time_stamp : date};
            await StudentModel.findOneAndUpdate({student_id: token}, updatedate, { new: true });
            // console.log(token,skill);
            const find = await StudentModel.find({student_id :token});

            const n = find[0].skills.length;
            const m = skill.length;

            for(let i = 0;i < find[0].skills.length;i++){
                for(let j =0; j< skill.length;j++){
                    // console.log(skill[j]);
                    if(find[0].skills[i].skill_name === skill[j].skill_name){
                        // courseskill[j] = true;
                        const dropLikeskills = { $pull: { skills : find[0].skills[i]}};
                        await StudentModel.findOneAndUpdate({student_id :token},dropLikeskills,{ new: true });
    
                        const addLikeskills = { $push: { skills : {_id : find[0].skills[i]._id, skill_name: find[0].skills[i].skill_name, 
                            level_id : find[0].skills[i].level_id,skill_like : skill[j].skill_like,skill_self :find[0].skills[i].skill_self}}};
                        await StudentModel.findOneAndUpdate({student_id :token},addLikeskills,{ new: true });
                    };
                };
            };
 
            const final = await StudentModel.find({student_id :token});
            const check = await SkillsModel.find();
    
            var skills =[];
            for(let i=0;i<check.length;i++){
                for(let j=0;j<final[0].skills.length;j++){
                    if(check[i].skill_name === final[0].skills[j].skill_name){
                        skills[i] = {
                            skill_name : final[0].skills[j].skill_name,
                            level_id : final[0].skills[j].level_id,
                            skill_like : final[0].skills[j].skill_like,
                            skill_self :final[0].skills[j].skill_self
                        };
                    };
                };
            };
    
            var obj = {
                final,
                skills
            };
    
                res.status(200).json(obj);
        } catch(error){
            res.status(404).json( {message: error.message });
        }
    };

//add skill_self
export const addSelfkills = async (req,res) =>{
    // sent array 
        const {token,skill} = req.body;
        // console.log(token,skill);
        try{
        let date = new Date();
        let dd = date.getDate();
        let mm = date.getMonth();
        let yy = date.getFullYear();
        mm = mm+1;
        date = dd +"/" +mm +"/"+yy;
        const updatedate = { time_stamp : date};
        await StudentModel.findOneAndUpdate({student_id: token}, updatedate, { new: true });

        const find = await StudentModel.find({student_id :token});
        
        // console.log(n);
        // console.log(m);
        // var courseskill = [];
        // for(let x = 0; x < m; x++){
        //     courseskill.push(false);
        // };
        for(let i = 0;i < find[0].skills.length;i++){
            for(let j =0; j< skill.length;j++){
                // console.log(skill[j]);
                if(find[0].skills[i].skill_name === skill[j].skill_name){
                    // courseskill[j] = true;
                    const dropLikeskills = { $pull: { skills : find[0].skills[i]}};
                    await StudentModel.findOneAndUpdate({student_id :token},dropLikeskills,{ new: true });

                    const addLikeskills = { $push: { skills : {_id : find[0].skills[i]._id, skill_name: find[0].skills[i].skill_name, 
                        level_id : find[0].skills[i].level_id,skill_like : find[0].skills[i].skill_like,skill_self :skill[j].skill_self}}};
                    await StudentModel.findOneAndUpdate({student_id :token},addLikeskills,{ new: true });
                };
            };
        };
        // for(let y = 0; y < m; y++){
        //     if(courseskill[y] == false){
        //         const addlikeskill = { $push:{skills : {_id : skill[y]._id ,skill_name :skill[y].name ,
        //             level_id : skill[y].level_id,skill_like : skill[y].skill_like,skill_self:skill[y].skill_self }} }
        //         await StudentModel.findOneAndUpdate(token,addlikeskill,{ new: true });
        //         // const addlikeskill = { $push:{skills : {_id : skill[y]._id ,skill_name :skill[y].name ,
        //         //     level_id : skill[y].level_id,skill_like : 0,skill_self:skill[y].skill_self }} }
        //         // await StudentModel.findOneAndUpdate(token,addlikeskill,{ new: true });
        //     }
        // }
        const final = await StudentModel.find({student_id :token});
        const check = await SkillsModel.find();

        var skills =[];
        for(let i=0;i<check.length;i++){
            for(let j=0;j<final[0].skills.length;j++){
                if(check[i].name === final[0].skills[j].skill_name){
                    skills[i] = {
                        skill_name : final[0].skills[j].skill_name,
                        level_id : final[0].skills[j].level_id,
                        skill_like : final[0].skills[j].skill_like,
                        skill_self :final[0].skills[j].skill_self
                    };
                };
            };
        };

        // console.log(skills);

        var obj = {
            final,
            skills
        };
        res.status(200).json(obj);

    } catch(error){
        res.status(404).json( {message: error.message });
    }
};


//add course
export const addCourses = async (req,res) =>{
    const { token, courses } = req.body;
    // console.log(token,courses);
    try{
        let date = new Date();
        let dd = date.getDate();
        let mm = date.getMonth();
        let yy = date.getFullYear();
        mm = mm+1;
        date = dd +"/" +mm +"/"+yy;
        const updatedate = { time_stamp : date};
        await StudentModel.findOneAndUpdate({student_id: token}, updatedate, { new: true });

        const student = await StudentModel.find({student_id:token});
        for(let j=0;j<student[0].courses.length;j++){
        for( let i=0;i<courses.length;i++ ){
            // for(let j=0;j<check[0].courses.length;j++){
                if(courses[i].name == student[0].courses[j].course_name){
                    courses.splice(i, 1);
                };
            };
        };
        // console.log(courses);
        if(courses.length !== 0){
            for(let t=0;t<courses.length;t++){
            const addCourses = { $push: { courses : {_id : courses[t]._id,course_name : courses[t].name,course_id : courses[t].id} } };
            await StudentModel.findOneAndUpdate({student_id : token},addCourses,{ new: true });
        
                    // const course = await CoursesModel.find({_id : courses[t].id,course_name : courses[t].name,course_id : courses[t].id});
                    const student = await StudentModel.find({student_id:token});
                    // const n = course[0].skills.length;
                    const m = student[0].skills.length;
    
                    const check = await StudentModel.find({student_id:token, skills : student[0].skills});
                    if(check.length !== 0){
                        var courseskill = [];
                        for(let x = 0; x < courses[t].skills.length; x++){
                            courseskill.push(false);
                        };
                    for(let i = 0; i < m ;i++){
                        for(let j = 0; j < courses[t].skills.length;j++){
                            if(student[0].skills[i].skill_name === courses[t].skills[j].skill_name){
                                courseskill[j] = true;
                                if(student[0].skills[i].level_id === 0){
                                    
                                    const deleteskilllevel = { $pull:{skills : student[0].skills[i] } }
                                    await StudentModel.findOneAndUpdate({student_id:token},deleteskilllevel,{ new: true });
    
                                    const addskilllevel = { $push:{skills :{
                                        _id : courses[t].skills[j]._id ,
                                        skill_name :courses[t].skills[j].skill_name,
                                        level_id : courses[t].skills[j].level_id,
                                        skill_like : student[0].skills[i].skill_like,
                                        skill_self:student[0].skills[i].skill_self }} }
                                    await StudentModel.findOneAndUpdate({student_id:token},addskilllevel,{ new: true });
                                }
                                else if(student[0].skills[i].level_id < courses[t].skills[j].level_id){
                                    
                                    const deleteskilllevel = { $pull:{skills : student[0].skills[i] } }
                                    await StudentModel.findOneAndUpdate({student_id:token},deleteskilllevel,{ new: true });
    
                                    const addskilllevel = { $push:{skills :{
                                        _id : courses[t].skills[j]._id ,
                                        skill_name :courses[t].skills[j].skill_name,
                                        level_id : courses[t].skills[j].level_id,
                                        skill_like : student[0].skills[i].skill_like,
                                        skill_self:student[0].skills[i].skill_self }} }
                                    await StudentModel.findOneAndUpdate({student_id:token},addskilllevel,{ new: true });
    
                                    // const deleteskilllevel = { $pull:{skills : student[0].skills[i] } }
                                    // await StudentModel.findOneAndUpdate(token,deleteskilllevel,{ new: true });
                                    
                                };
                            };
                        };
                    };
                    for(let y = 0; y < courses[t].skills.length; y++){
                        if(courseskill[y] == false){
                            const addskill = { $push:{skills : {
                                _id : courses[t].skills[y]._id ,
                                skill_name :courses[t].skills[y].skill_name ,
                                level_id : courses[t].skills[y].level_id}} }
                            await StudentModel.findOneAndUpdate({student_id:token},addskill,{ new: true });
                        }
                    }
                }
                else if(check.length === 0){
                    // console.log("===");
                    // const addskill = { $push:{skills :course[0].skills} }
                    // await StudentModel.findOneAndUpdate(token,addskill,{ new: true });
                    for(let a = 0; a <n ;a++){
                        const addskill = { $push:{skills :{
                            _id : courses[t].skills[a]._id ,
                            skill_name :courses[t].skills[a].skill_name ,
                            level_id : courses[t].skills[a].level_id,
                            skill_like : courses[t].skills[a].skill_like,
                            skill_self:courses[t].skills[a].skill_self}} }
                        await StudentModel.findOneAndUpdate({student_id:token},addskill,{ new: true });
                    }
                };
            };
            }
           
            // res.status(200).json(student);
        const done = await StudentModel.find({student_id : token});
        // console.log(res);
        res.status(200).json(done);
    }
    catch(error){
        res.status(404).json( {message: error.message });
    };
};

