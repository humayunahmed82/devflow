"use server";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

import { connectToDatabase } from "../mongoose";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import { revalidatePath } from "next/cache";

export const getQuestions = async (params: GetQuestionsParams) => {
  try {
    // connect to DB
    connectToDatabase();

    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createQuestion = async (params: CreateQuestionParams) => {
  try {
    // connect to DB
    await connectToDatabase();

    const { title, content, tags, author, path } = params;

    // Create the Question
    const question = await Question.create({ title, content, author });

    const tagDocuments = [];

    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag } },
        { upsert: true, new: true }
      );

      if (!existingTag.question.includes(question._id)) {
        existingTag.question.push(question._id);
        await existingTag.save();
      }

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });

    revalidatePath(path);
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};
