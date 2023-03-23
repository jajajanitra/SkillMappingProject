import careersModel from '../models/careermodel.js';
import CoursesModel from '../models/coursesmodel.js';
import SkillsModel from '../models/skillmodel.js';
import StudentModel from '../models/studentmodent.js';

// course map skill
export const SkillMapping = async (req,res) =>{
    const  token  = req.params.token;
    // console.log(token);
    // const token = 620610777;
    const student =  await StudentModel.find({student_id : token});
    // console.log(student);
    const skills = await SkillsModel.find();
    // console.log(skills);
    const career = await careersModel.find();
    // console.log(career);

    var skillsstudent = [];
    var bycourses =[];
    var byself =[];
    var careers =[];
    
    var like = 0;
    var level_id = 0;
    var distance = 0;
    var distance1 = 0;

    var havecheck;
    var have = [];
    for(let i=0;i<skills.length;i++){
        have[i] = false;
    };

    try{
        for(let i=0;i<skills.length;i++){
            for(let j=0;j<student[0].skills.length;j++){
                if(skills[i].name === student[0].skills[j].skill_name){
                    // console.log(skills[i].name);
                    // console.log(student[0].skills[j].level_id);
                    if(student[0].skills[j].level_id === undefined || student[0].skills[j].level_id == 0 ){
                        level_id = 0;
                        // have[j] = true;
                    }
                    else {
                        level_id = student[0].skills[j].level_id;
                        have[j] = true;
                    }
                    like = student[0].skills[j].skill_like/4;
                    skillsstudent[i] = {
                        skill_name : student[0].skills[j].skill_name,
                        level_id : level_id,
                        skill_like : like,
                        skill_self : student[0].skills[j].skill_self
                    };
                };
                havecheck = havecheck || have[j];
            };
            // console.log(havecheck);
        };


        for(let m =0; m< career.length; m++){
            // console.log(m);
            var skillscareers =[];
            for(let i=0;i<skills.length;i++){
                for(let k=0; k<career[m].skills.length;k++){
                    if(skills[i].name === career[m].skills[k].skill_name){
                        skillscareers[i] = {
                            skill_name : skills[i].name,
                            level_id : career[m].skills[k].level_id
                        };
                    };
                    // console.log(career[j].skills[k].skill_name);
                    if(skillscareers[i] == null || skillscareers[i] == undefined ){
                        skillscareers[i] = {
                            skill_name : skills[i].name,
                            level_id : 0
                        };
                    }
                };
            };
            careers[m] ={
                _id : career[m]._id,
                name_career : career[m].name_career,
                skillscareers
            };
        };
        for(let j=0;j<careers.length;j++){
            // console.log(j);
            var sum = 0 ;
            var sum1 = 0;

            var minus = 0;
            var minus1 = 0;
            for(let k=0;k<careers[j].skillscareers.length;k++){
                var q = careers[j].skillscareers[k].level_id;
                var ql = careers[j].skillscareers[k].level_id;
                var qs = careers[j].skillscareers[k].level_id;
                for(let i=0;i<skillsstudent.length;i++){
                    var w = skillsstudent[i].skill_like;
                    var pl = skillsstudent[i].level_id;
                    var ps = skillsstudent[i].skill_self;

                    var wpl = w*pl;
                    var wps = w*ps;
                    if(skillsstudent[i].skill_name === careers[j].skillscareers[k].skill_name  && q !== 0){
                        if( wpl > q ){
                            wpl = 0;
                            ql = 0;

                        }
                        else if( wps > q){
                            wps = 0;
                            qs = 0; 
                        }
                        
                        minus =  (ql-(wpl))**2;
                        sum = sum + minus ;

                        minus1 =  (qs-(wps))**2;
                        sum1 = sum1 + minus1 ;

                    };
                    distance = sum ** 0.5;
                    distance1 = sum1 ** 0.5;

                    bycourses[j] = {
                        _id : careers[j]._id,
                        career : careers[j].name_career,
                        distance : distance.toFixed(2)
                    };
    
                    byself[j] = {
                        _id : careers[j]._id,
                        career : careers[j].name_career,
                        distance : distance1.toFixed(2)
                    }

                };

            }
            
        }

        if(havecheck === false){
            bycourses = [];
            byself = [];
            
        }
        else if(havecheck === true){
            function compare( a, b ) {
                if ( a.distance < b.distance ){
                  return -1;
                }
                if ( a.distance > b.distance ){
                  return 1;
                }
                return 0;
            }
    
            bycourses = bycourses.sort( compare );
            byself =byself.sort( compare );
            
            bycourses = [
                bycourses[0],
                bycourses[1],
                bycourses[2],
                bycourses[3],
                bycourses[4]
            ];
    
            byself =[
                byself[0],
                byself[1],
                byself[2],
                byself[3],
                byself[4]
            ];
        }


        // function compare( a, b ) {
        //     if ( a.distance < b.distance ){
        //       return -1;
        //     }
        //     if ( a.distance > b.distance ){
        //       return 1;
        //     }
        //     return 0;
        // }

        // bycourses = bycourses.sort( compare );
        // byself =byself.sort( compare );
        
        // bycourses = [
        //     bycourses[0],
        //     bycourses[1],
        //     bycourses[2],
        //     bycourses[3],
        //     bycourses[4]
        // ];

        // byself =[
        //     byself[0],
        //     byself[1],
        //     byself[2],
        //     byself[3],
        //     byself[4]
        // ];

        var Obj = {
            bycourses,
            byself
        };

        // console.log(Obj);

        res.status(200).json(Obj);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};
