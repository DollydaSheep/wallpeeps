const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const router = express.Router();

const port = 5550;

const app = express();

app.use(express.json());
app.use(cors());

router.get('/curated',async (req,res)=>{
    var query = req.query.search;
    console.log(query);
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}`,{
        method: "GET",
        headers: {
            "Authorization": "MprrDtoqxgFSpq7lYFvNugNEfhUEhoViptrkFtJHx04ooq8WIPb2vgxD",
            "Content-Type": "application/json"
        }
    })
    const data = await response.json();
    res.send(data);
})


app.use('/.netlify/functions/api',router);
module.exports.handler = serverless(app);
// app.listen(port,()=>{
//     console.log("Started on port " + port);
// })