"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import QuestionModel from "@/database/question.model";

export const getUserById = async (params: any) => {
  try {
    connectToDatabase();
    const { userId } = params;

    const user = await User.findOne({ clerkID: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createUser = async (userData: CreateUserParams) => {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUser = async (params: UpdateUserParams) => {
  try {
    connectToDatabase();

    const { clerkID, updateData, path } = params;

    await User.findByIdAndUpdate({ clerkID }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (params: DeleteUserParams) => {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Delete user from database
    // and questions, answers, comments, etc.

    // get user question ids
    // const userQuestionIds = await QuestionModel.find({
    //   author: user._id,
    // }).distinct("_id");

    // delete user question
    await QuestionModel.deleteMany({ author: userQuestionIds._id });

    // TODO: delete user answers, comments, etc.
    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// export const getUserById = async (params: any) => {
//   try {
//     connectToDatabase();

//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
