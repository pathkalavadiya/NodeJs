    const {nanoid}=require('nanoid');
    const URL=require('../models/url');
    async function createShortURL(req,res){
        const body = req.body;
        if (!body || typeof body !== 'object') {
            return res.status(400).json({ message: "url required" });
        }
        if (!body.url) {
            return res.status(400).json({ message: "URL is required" });
        }
        const shortID = nanoid(8);
        await URL.create({
            shortID: shortID,
            redirectURL: body.url,
            visitHistory: []
        });
        res.status(201).json({ id: shortID });
    }
 
        module.exports={createShortURL};