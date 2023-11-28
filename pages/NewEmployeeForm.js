import React from "react";

export default function NewEmployeeForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("DATA NEW ", data);
    // onAddEmployee(data);
    createEmployee(data);
  };

  const createEmployee = async (data) => {
    try {
      await fetch(`/api/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              //value={firstName}
              // onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              // value={lastName}
              // onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Position:
            <input
              type="text"
              name="position"
              // value={position}
              // onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Supervisor:
            <input
              type="text"
              name="supervisor"
              // value={supervisor}
              // onChange={handleChange}
            />
          </label>
        </div>
        {/* <button type="submit" onClick={() => createEmployee()}> */}
        <button type="submit">Create a new employee</button>
      </form>
    </>
  );
}
