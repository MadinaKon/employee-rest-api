import dbConnect from "@/db/connect";
import Employee from "@/db/models/Employee";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "PUT") {
    try {
      await Employee.findByIdAndUpdate(id, {
        $set: request.body,
      });

      response.status(200).json({ status: `Id ${id} successfully updated.` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    console.log("DELETE ", id);
    try {
      await Employee.findByIdAndDelete(id);

      // response.status(200).json({ status: `Id ${id} successfully deleted.` });

      response.status(200).json({ status: `Id ${id} successfully deleted.` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
