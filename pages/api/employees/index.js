import dbConnect from "../../../db/connect";
import Employee from "@/db/models/Employee";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const employees = await Employee.find();
    return response.status(200).json(employees);
  }
}
