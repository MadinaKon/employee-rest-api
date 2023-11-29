import React, { useState, useEffect } from "react";
import useSWR from "swr";

const UpdateEmployeeForm = ({ defaultData, id }) => {
  // console.log("DEFAULT DATA ", defaultData);

  // const { data, isLoading, mutate } = useSWR(`/api/employees/${id}`);
  const { data: employee, isLoading, mutate } = useSWR(`/api/employees`);
  // const { mutate } = useSWR(`/api/employees`);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    // Perform update using updateEmployee function with formData
    // updateAnEmployee(formData._id, formData);

    console.log("DATA FROM AN API ", data);
    // updateEmployee(data);
    updateMe(data);

    // updateEmployee(formData._id, formData);
  };

  async function updateMe(data) {
    console.log("UPDATE ME DATA ", data);

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
