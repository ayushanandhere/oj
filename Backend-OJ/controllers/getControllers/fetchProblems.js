import "colors";
import { Problem } from "../../models/Problem.js";

export const fetchProblems = async (req, res) => {
  try {
    const data = await Problem.find({}).populate("author", "username");

    const problems = data.map((eachProblem) => {
      return {
        title: eachProblem.title,
        _id: eachProblem._id,
        author: {
          username: eachProblem.author.username,
        },
      };
    });

    return res.status(200).json({ problems });
  } catch (error) {
    console.log(`Problems could not be fetched:${error}`.bgRed);
    return res.status(500).json({ error: error.message });
  }
};
