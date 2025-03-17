const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
require("dotenv").config();
const aiRoutes = require('./src/routes/ai.routes');

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello I am root");
});

app.use('/ai',aiRoutes);

app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
})