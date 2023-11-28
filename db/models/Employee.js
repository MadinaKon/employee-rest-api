import mongoose from "mongoose";

const { Schema } = mongoose;

const employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  position: { type: String, required: true },
  supervisor: { type: String, required: true },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
