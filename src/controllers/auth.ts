import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import { User } from "../models/User";
import generarJWT from "../helpers/jwt";

export const login = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  // Validadndo si existe el email
  const user = await User.findOneBy({ email })

  if(!user){
    return res.status(400).json({
      msg: `El email ${email} no existe`
    })
  } 

   //Comparando la contraseña con la base de datos

   const validationPassword = bcrypt.compareSync(password, `${user?.password }`)

   if(!validationPassword){
     return res.status(400).json({
       msg: `Contraseña incorrecta!`
     })
   }  

  // GenerarJWT 
  const token = await generarJWT(user?.id as number, user?.name as string, )

  return res.status(200).json({
    ok: true,
    msg: `Success!`,
    id: user?.id,
    name: `${user?.name} ${user?.firstLastName} `,
    email: user?.email,
    token
  });
};
