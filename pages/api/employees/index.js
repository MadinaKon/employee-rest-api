import dbConnect from "../../../db/connect";
import Employee from "@/db/models/Employee";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const employees = await Employee.find();
    return response.status(200).json(employees);
  }

  if (request.method === "POST") {
    // const employees = await Employee.find();
    // return response.status(200).json(employees);

    try {
      const data = request.body;

      console.log("DATA API FOR CREATION ", data);
      await Employee.create(data);

      response.status(201).json({ status: "request created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
