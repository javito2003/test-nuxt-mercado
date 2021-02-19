const jwt = require('jsonwebtoken')

let checkAuth = (req,res,next) => {

    let token = req.get('token')
    console.log(token);
    jwt.verify(token,'securePasswordHere',(err,decoded) => {
        if (err) {
            return res.status(401).json({
                status: 'error',
                error: err
            })
        }
        req.userData = decoded.userData

        next()
    })
}

let checkAdm = (req,res,next) => {
    const rol = req.userData.rol

    if (rol === "ADMIN") {
        next()
    }else{
        return res.status(401).json({
            message: "Invalid rol"
        })
    }
}

module.exports = {checkAuth, checkAdm}