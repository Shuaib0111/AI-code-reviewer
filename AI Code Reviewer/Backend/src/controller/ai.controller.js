const aiService = require('../services/ai.service');

const getReview = async (req,res)=>{
    const code = req.body.code;
    if(!code){
        res.status(400).send("Prompt not found!");
    }
    const result = await aiService(code);
    res.send(result);
}

module.exports = {
    getReview
}