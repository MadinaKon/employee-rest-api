import React from "react";

export default function UpdateEmployeeForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("DATA NEW ", data);
    // onAddEmployee(data);
    updateAnEmployee(data);
  };

  async function updateAnEmployee(id) {
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
          <input type="text" name="firstName" required />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input type="text" name="lastName" required />
        </label>
      </div>
      <div>
        <label>
          Position:
          <input type="text" name="position" required />
        </label>
      </div>
      <div>
        <label>
          Supervisor:
          <input type="text" name="supervisor" required />
        </label>
      </div>
      <button type="submit">Update an employee</button>
    </form>
  );
}
