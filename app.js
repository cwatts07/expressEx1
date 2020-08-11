'use strict';
const express = require('express');
const app = express();
const students = require('./students')
const cors = require('cors');
const port = 3000;
app.use(express.json())
app.use(cors())
app.use('/students', students);
  
app.get('*',(req, res)=>{
    res.status(201);
    res.json('test')
})

app.listen(port, ()=>{console.log('Server listening on port ' + port)})