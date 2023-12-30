"use server";

import { connectToDatabase } from "../mongoose";

export const createQuestion = async (params: any) => {
  try {
    // connect to DB
    connectToDatabase();
  } catch (error) {}
};
