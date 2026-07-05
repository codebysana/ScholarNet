import { Response } from "express";
import userModel from "../models/userModel";
import { redis } from "../utils/redis";

// get user by id
export const getUserId = async (id: string, res: Response) => {
  const userData = await redis.get(id);

  if(userData){
    const user = JSON.parse(userData);
    res.status(201).json({
    success: true,
    user,
  });
  }
};

// get all users
export const getAllUsersService = async(res: Response) => {
  const users = await userModel.find().sort({createdAt: -1});
  res.status(201).json({
    success:true,
    users
  })
}

// update user role
export const updateUserRoleService = async(req:Request, res:Response, id: string, role: string)=>{
  const user = await userModel.findByIdAndUpdate(id, {role}, {new: true});

  res.status(201).json({
    success: true,
    user
  })
}
