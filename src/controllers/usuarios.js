const {connection}= require("../database/db")
const bcrypt=  require("bcrypt") 
const jwt =  require("jsonwebtoken")

const infoUsuario=async(req, res)=>{
    const id = req.id
    console.log(id);
        
    try{
        await connection.query("select * from usuarios where idUser= ?",[id],(error, data)=>{
            if(error){
                return res.json({mensaje:"error en la consulta"})
            }else{
                return res.json({mensaje:data})
            }
        })

    } catch (error) {
        return res.json({mensaje:error})
        
    }
}


const usuarios =async(req, res)=>{
    await connection.query("select * from usuarios",(error,data)=>{
        if(data.length == 0){
            return res.status(200).json({mensaje:"registro vacio"})
        }
        if(error){
            res.json({
                error
            })
        
        }else{
            res.status(200).json({
                data
            })
        }
    })


}
const login=async(req, res)=>{
    const {user, password} =  req.body
    if(user.length==0|| password.length==0){
        return res.json({
            mensaje:"deve rellenar todos los datos"
        }) 

    }

    await connection.query("SELECT * FROM usuarios WHERE user=?",[user],async(error, data)=>{
        if(error){
            return res.json({error})}
        if(data[0]?.user == undefined) {
            return res.json({mensaje:"el usuario no existe"})
        }    

        if(user == data[0]?.user && await bcrypt.compare(password,data[0].password)){
            const token = jwt.sign(data[0].idUser, process.env.CLAVE_SECRETA)
            res.status(200).json({
                token
            })}
        else{
            return res.json({mensaje:"user o password incorrecta"})
        }
       
        
    })


}


const registroUsuarios=async (req,res)=>{
const {nombre, user, password} =  req.body
const nuevoPass =await  bcrypt.hashSync(password,10)
if(nombre.length == 0 || user.length == 0 || nuevoPass.length  ==0 ){
    return res.json({
        mensaje:"deve rellenar todos los datos"
    }) }

await connection.query("INSERT INTO USUARIOS(nombre, user, password) VALUES(?,?,?)",[nombre,user,nuevoPass],(error, data)=>{
    if(error){
        return res.json({
            menjsaje:error
        })
    }
  const token = jwt.sign(data.insertId, process.env.CLAVE_SECRETA)
  return res.json({
    mensaje: "success",
    token
})

})

}

const actualizarLista=async(req, res)=>{
   const id = req.params.id
   const {nombre, user, password} =  req.body
   const nuevoPass =await  bcrypt.hashSync(password,10)
   if(nombre.length == 0 || user.length == 0 || nuevoPass.length  ==0 ){
    return res.json({
        mensaje:"deve rellenar todos los datos"
    }) }
   await connection.query("UPDATE usuarios set nombre = ? , user = ? ,password =? WHERE idUser= ?",[nombre, user,nuevoPass, id],(error, data)=>{
    if(error){
        return res.json({mensaje:"Error en la actulizacion", error})
    }else{
        return res.json({data})
    }
   })
}

const deleteUsuarios=async(req,res)=>{
    const id = req.params.id
    try {
        
        await connection.query("delete from usuarios where idUser =?",[id],(error, data)=>{

            if(data.affectedRows==0) {
                return res.json({mensaje:"el usuario no existe"})}
            if(error){
                return res.json({mensaje:"Error", error})
            }else{
                return res.status(200).json({data})
            }
        })
    } catch (error) {

        return res.status(200).json({error})
    }
 
 

}




module.exports ={
    usuarios,
    registroUsuarios,
    actualizarLista,
    deleteUsuarios,
    login,
    infoUsuario
}