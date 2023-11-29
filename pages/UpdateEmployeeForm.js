import React from "react";
import useSWR from "swr";

const UpdateEmployeeForm = ({ defaultData, id }) => {
  const { mutate } = useSWR(`/api/employees`);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    updateEmployee(data);
  };

  async function updateEmployee(data) {
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
