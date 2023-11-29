import React, { useState, useEffect } from "react";

const UpdateEmployeeForm = ({ employee, updateEmployee }) => {
  const [formData, setFormData] = useState({ ...employee });

  useEffect(() => {
    // Update form data when employee prop changes
    setFormData({ ...employee });
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform update using updateEmployee function with formData
    updateEmployee(formData._id, formData);
    // Reset form or perform other actions after submission
  };

  // Other form elements...

  return (
    <form onSubmit={handleSubmit}>
      {/* Form inputs pre-filled with employee data from formData */}
      {/* ... */}
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateEmployeeForm;

// export default function UpdateEmployeeForm() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const data = Object.fromEntries(formData);
//     console.log("DATA NEW ", data);
//     // onAddEmployee(data);
//     updateAnEmployee(data);
//   };

//   async function updateAnEmployee(id) {
//     try {
//       const response = await fetch(`/api/employees/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         mutate();
//       }
//     } catch (error) {
//       console.error("Error updating item:", error);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>
//           First Name:
//           <input type="text" name="firstName" required />
//         </label>
//       </div>
//       <div>
//         <label>
//           Last Name:
//           <input type="text" name="lastName" required />
//         </label>
//       </div>
//       <div>
//         <label>
//           Position:
//           <input type="text" name="position" required />
//         </label>
//       </div>
//       <div>
//         <label>
//           Supervisor:
//           <input type="text" name="supervisor" required />
//         </label>
//       </div>
//       <button type="submit">Update an employee</button>
//     </form>
//   );
// }
