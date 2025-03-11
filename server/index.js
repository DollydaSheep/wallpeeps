const express = require('express');
const cors = require('cors');

const port = 5550;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/curated',async (req,res)=>{
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

app.listen(port,()=>{
    console.log("Started on port " + port);
})