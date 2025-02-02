const jwt = require("jsonwebtoken")

const auth =  (req,res,next) =>{
    const token = req.header('Authorization')?.replace('Bearer', '')
    // console.log(token+ "ini token");

    if (!token) return res.status(401).json({error: "Akses tidak diizinkan !!!"});

    console.log(token);
    try{
        var decode = jwt.verify(token, 'secret')
        console.log('decoded nih');
        req.userId = decode.userId
        next()
    } catch (error) {
        // console.log(error);
        return res.status(400).json({error: 'Token tidak valid'})
    }
}

module.exports = {
    auth
}