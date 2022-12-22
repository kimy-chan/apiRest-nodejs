const express = require("express")
const routas = require("../controllers/usuarios")
const veryToken =require("../middleware/verifytoken")
const router = express.Router()


router.get("/usuarios", routas.usuarios)

router.post("/usuarios",veryToken.veryToken,routas.registroUsuarios)
router.put("/usuarios/:id",veryToken.veryToken,routas.actualizarLista)

router.delete("/usuarios/:id",veryToken.veryToken,routas.deleteUsuarios)
router.post("/login",routas.login)
router.get("/usuario",veryToken.veryToken,routas.infoUsuario)






module.exports =router