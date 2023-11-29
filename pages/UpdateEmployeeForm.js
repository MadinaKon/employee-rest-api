import React, { useState, useEffect } from "react";
import useSWR from "swr";

const UpdateEmployeeForm = ({ employee, updateEmployee, defaultData }) => {
  const [formData, setFormData] = useState({ ...employee });

  console.log("DEFAULT DATA ", defaultData);

  // const { data, isLoading, mutate } = useSWR(`/api/employees/${id}`);
  const { data, isLoading, mutate } = useSWR(`/api/employees`);

  useEffect(() => {
    // Update form data when employee prop changes
    setFormData({ ...employee });
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform update using updateEmployee function with formData
    updateAnEmployee(formData._id, formData);
    // Reset form or perform other actions after submission
  };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const formData = new FormData(event.target);
  //     const data = Object.fromEntries(formData);
  //     console.log("DATA NEW ", data);
  //     // onAddEmployee(data);
  //     updateAnEmployee(data);
  //   };

  async function updateAnEmployee(id, data) {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        mutate();
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            required
            defaultValue={defaultData?.firstName}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            required
            defaultValue={defaultData?.lastName}
          />
        </label>
      </div>
      <div>
        <label>
          Position:
          <input
            type="text"
            name="position"
            required
            defaultValue={defaultData?.position}
          />
        </label>
      </div>
      <div>
        <label>
          Supervisor:
          <input
            type="text"
            name="supervisor"
            required
            defaultValue={defaultData?.supervisor}
          />
        </label>
      </div>
      <button type="submit">Update an employee</button>
    </form>
  );
};

export default UpdateEmployeeForm;
