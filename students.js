const express = require('express');
const students = express.Router()
let myStudents = [
    {name:'Patrick', id:2},
    {name:'Zack', id:4},
    {name:'Justin', id:1},
    {name:'Peter', id:3},
]
students.get('',(req, res)=>{
    let sortedStudents = [...myStudents];
    switch (req.query['sort-by']){
        case 'name':
            sortedStudents.sort((a,b) => {
                if ( a.name < b.name ){
                    return -1;
                  }
                  if ( a.name > b.name ){
                    return 1;
                  }
                  return 0;
            })
            break;
        case 'id':
        default:
            sortedStudents.sort((a,b) => a.id - b.id)
    }
    res.json(sortedStudents);
})
students.get('/:id',(req,res)=>{
    console.log(typeof req.params.id);
    const student = myStudents.find((item)=>item.id === parseInt(req.params.id))
    if(student){
        res.json(student);
    }else{
        res.json('Not found');
    }
})
// accept POST request at URI: /students
students.post("/", (req, res) => {
    console.log(req.body)
    if(req.body && req.body.name){
        myStudents.push({name:req.body.name, id: myStudents.length+1});
        res.json('Student Added');
    }else{
        res.json('Invalid format')
    }
  });
  
  // accept PUT request at URI: /students
  students.put("/:id", (req, res) => {
    
    res.json("Updating a student..");
  });
  
  // accept DELETE request at URI: /students
  students.delete("/", (req, res) => {
    res.json("Deleting a student..");
  });

  module.exports = students;