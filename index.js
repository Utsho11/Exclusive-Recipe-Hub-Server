const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
const chef = require('./data/Chef.json')
const recipes = require('./data/Recipe.json')

app.use(cors());

app.get('/',(req,res) => {
res.send('server is running')
})

app.get('/chef',(req,res) => {
    res.send(chef)
    })
    
    


app.listen(port,() =>{
    console.log(`Server is running on port: ${port}`);
})