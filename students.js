const express = require('express');
const students = express.Router();
let currentId = 5;
let myStudents = [
    {name:'Patrick', id:2},
    {name:'Zack', id:4},
    {name:'Justin', id:1},
    {name:'Peter', id:3},
]
students.get('',(req, res)=>{
    let sortedStudents = [...myStudents];
    let status = 200
    if(req.query.maxPrice){
        sortedStudents = sortedStudents.filter((item)=> item.price <= maxPrice)
    }
    if(req.query.prefix){
        sortedStudents = sortedStudents.filter((item)=> item.product.startsWith(req.query.prefix))
    }
    if(req.query.pageSize && parseInt(req.query.pageSize)!== NaN){
        sortedStudents = sortedStudents.slice(0,parseInt(req.query.pageSize) - 1);
    }
    if(error){
        status = 500
    }
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
        res.sendStatus(404);
    }
})
// accept POST request at URI: /students
// students.post("/", (req, res) => {
//     console.log(req.body)
//     if(req.body && req.body.name){
//         myStudents.push({name:req.body.name, id: myStudents.length+1});
//         res.json('Student Added');
//     }else{
//         res.json('Invalid format')
//     }

//     if(req.body && req.body.product && req.body.price){}
//   });
  students.post('/', (req, res) => {
    //let autoID = myStudents.length + 1;
    if (req.body && req.body.product && req.body.price && req.body.quantity) {
        myStudents.push({
            id: currentId++,
            product: req.body.product,
            price: req.body.price,
            quantity: req.body.quantity
        });
        res.status(201);
        res.json(myStudents[myStudents.length - 1]);
    } else {
        res.json('Incorrect format. Make sure to include "product, price, and quantity" fields.')
    }
});
  // accept PUT request at URI: /students
  students.put("/:id", (req, res) => {
    
    res.json("Updating a student..");
  });
  
  // accept DELETE request at URI: /students
  students.delete("/:id", async(req, res) => {
    res.json("Deleting a student..");
    // fs.open('someFile')
    // .then((file)=>{
    //     //do stuff with file
    // })
    // .catch((error)=>{console.error(error)})
    // //runs before promise resolves
    try {
        let file = await fs.open('someFile');
        let mistake = 10/0;
    } catch (error) {
        
    }
   
  });
  students.post('/log',(req, res)=>{
      const item = {...req.body};
      console.log(req.headers);
      console.log(req.body);
      console.log(item);
      res.send(req.body);

      
  })

  
  
  module.exports = students;