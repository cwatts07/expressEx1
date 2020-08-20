const express = require('express');
const pool = require('./connection');
const e = require('express');
const northwind = express.Router();

function getTable(filters) {
    const defaults = {
        limit: 10,
        filterType:'and'
    }
    let myFilters = { ...defaults, ...filters}
    let query = "select * from customers"
    let where = [];
    let params = [];
    if(myFilters.id){
        params.push(myFilters.id);
        where.push( `customer_id = $${params.length}::text`)
    }
    if(myFilters.city){
        params.push(myFilters.city);
        where.push(`city = $${params.length}::text`)
    }
    if(myFilters.contact_name){
        params.push('%'+ myFilters.contact_name + '%')
        where.push(`contact_name LIKE $${params.length}::text`)
    }
    if(params.length === 0){
        params.push(myFilters.limit);
        query += ` LIMIT $${params.length}::int`
    }
    if(where.length){
        switch(myFilters.filterType.toUpperCase()){
            case 'AND':
                query += ' WHERE ' + where.join(' AND ');
                break;
            case 'OR':
                query += ' WHERE ' + where.join(' OR ');
                break;
        }
        
    }
    
    console.log(query, params);
    return pool.query(query, params)
  }
  
  northwind.get("/", function(request, response) {
    let filter = {};
    console.log(request.query)
    filter.limit = request.query.limit;
    filter.city = request.query.city;
    filter.contact_name = request.query['contact-name'];
    filter.filterType = request.query.filter;
    getTable(filter).then(result => {
        let data = result.rows;
        response.json(data);
      }).catch(err=>{
          console.log(err);
          response.sendStatus(500);
      });
  });
  northwind.get('/:id',(request, response)=>{
    getTable({id:request.params.id}).then(result => {
        let data = result.rows;
        response.json(data);
      }).catch(err=>{
          console.log(err);
          response.sendStatus(500);
      });
  });

   module.exports = northwind;