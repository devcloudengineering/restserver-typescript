import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.findAll()
    res.json(
        {usuarios}
    )
}


export const getUsuario = async (req: Request, res: Response) => {
    const {id} = req.params
    const usuario = await Usuario.findByPk(id)
    if(!usuario){
        return res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        })
    }
    res.json({
        usuario
    })
}

export const postUsuario = async (req: Request, res: Response) => {
    const {body} = req
    try {
        const existeEmail = await Usuario.findOne({
            where: {
                email:body.email
            }
        })

        if(existeEmail){
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.email
            })
        }

        const usuario = new Usuario(body)

        await usuario.save()

        return res.json({
            msg: 'postUsuario !!!',
            usuario
        })
    } catch (error: any) {
        return res.status(500).json({
            msg: "Hable com el administrador",
            mesageError: error.parent.sqlMessage
        })
    }

}


export const putUsuario = async (req: Request, res: Response) => {
    const {id} = req.params
    const {body} = req
    
      try {

       const usuario = await Usuario.findByPk(id)

       if(!usuario){
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        })
       }

       await usuario.update(body)

       return res.status(200).json({
        usuario
       })

    } catch (error: any) {
        return res.status(500).json({
            msg: "Hable com el administrador",
            mesageError: error
        })
    }
}


export const deleteUsuario = async (req: Request, res: Response) => {
    const {id} = req.params

    const usuario = await Usuario.findByPk(id)
    if(!usuario){
        return res.status(404).json({
            msg: `El usuario con id ${id} no encontrado en la BD`
        })
    }

    if(usuario.estado === false ){
        return res.status(400).json({
            msg: `El usuario con id ${id} ya esta eliminado de la base de datos`
        })
    }

    const newUser = await usuario.update({estado: false})
    // await usuario.destroy() eliminacion fisica

    return res.status(200).json({
        msg: 'Usuario eliminado manteniendo integracion referencial, eliminacion logica',
        newUser
    })
}