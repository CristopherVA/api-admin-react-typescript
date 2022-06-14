import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { UserInterface } from "../interface/index";

export const getUsers = async (req: Request, res: Response) => {
  const { to, from } = req.query as { to: string; from: string };

  const desde = parseInt(to);
  const hasta = parseInt(from);

  try {
    const user = await User.find({
      order: { id: "ASC" },
      skip: desde,
      take: hasta,
    });

    const count = await User.count();

    return res.status(200).json({
      count,
      ok: true,
      msg: "Usuarios cargado correctamente!",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error comuniquese con el administrador",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userId = parseInt(id);

    const user = await User.findOneBy({ id: userId });

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error comuniquese con el administrador",
    });
  }
};

export const getUse = (req: Request, res: Response) => {
  return res.status(201).json({
    msg: "getUser",
  });
};

export const addUser = async (req: Request, res: Response) => {
  const {
    name,
    firstLastName,
    secondLastName,
    cedula,
    edad,
    gender,
    address,
    telephone,
    email,
    password,
    civilStatu,
    haveChild,
    dateBirth,
  } = req.body as UserInterface;
  try {
    const userEmail = await User.findOneBy({ email });

    if (userEmail) {
      return res.status(400).json({
        msg: "El email ya existe",
      });
    }

    const user = new User();
    user.name = name;
    user.firstLastName = firstLastName;
    user.secondLastName = secondLastName;
    user.cedula = cedula;
    user.edad = edad;
    user.gender = gender;
    user.address = address;
    user.telephone = telephone;
    user.email = email;
    user.civilStatu = civilStatu;
    user.haveChild = haveChild;
    user.dateBirth = dateBirth;

    //Encriptacion de la contraseña
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    return res.status(201).json({
      ok: true,
      msg: "Usuario creado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error comuniquese con el administrador",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    firstLastName,
    secondLastName,
    cedula,
    edad,
    gender,
    address,
    telephone,
    civilStatu,
    haveChild,
    dateBirth,
  } = req.body as UserInterface;
  
  try {
    const userId = parseInt(id);
    const user = await User.findOneBy({ id: userId });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    // const salt = bcrypt.genSaltSync(10);
    // const passwordUpdate = (user.password =
    //   bcrypt.hashSync(password, salt) || "");

    await User.update(
      { id: userId },
      {
        name,
        firstLastName,
        secondLastName,
        cedula,
        edad,
        gender,
        address,
        telephone,
        civilStatu,
        haveChild,
        dateBirth,
      }
    );

    return res.status(200).json({
      ok: true,
      msg: "Usuario actualizado correctamente!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error comuniquese con el administrador!",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userId = parseInt(id);

  try {
    await User.delete({ id: userId });
    return res.status(200).json({
      ok: true,
      msg: "Usuario eliminado correctamente!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error comuniquese con el administrador",
    });
  }
};
