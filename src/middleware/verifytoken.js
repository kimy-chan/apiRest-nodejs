const jwt = require("jsonwebtoken");

const veryToken = (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token) {
            
            return res.json({ mensaje:"el token no existe" })
        }
        token = token.split(" ")[1]
        try {
            const id = jwt.verify(token, process.env.CLAVE_SECRETA) 
            req.id = id
        } catch (error) {

            return res.json({ mensaje:"acceso denegado" })
        }
        
        next()

    } catch (error) {
        return res.json({ mensaje:error })


    }

}


module.exports = {
    veryToken
}