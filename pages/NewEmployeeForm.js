import React, { useState } from "react";
import styles from "../styles/Input.module.css";
import stylesButton from "../styles/Buttons.module.css";

export default function NewEmployeeForm() {
  const [isChecked, setIsChecked] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

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

  //   const handleCheckboxChange = (e) => {
  //     setIsChecked(e.target.checked);
  //   };
  const handleCheckboxChange = (e) => {
    setIsChecked(!isChecked);
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
              required
              className={styles.input}
              placeholder="Firstname"
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
              required
              className={styles.input}
              placeholder="Lastname"
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
              required
              className={styles.input}
              placeholder="Position"
              // value={position}
              // onChange={handleChange}
            />
          </label>
        </div>
        <div>
          {/* <label>
            Supervisor:
            <input
              type="text"
              name="supervisor"
              required
              // value={supervisor}
              // onChange={handleChange}
            />
          </label> */}
          <label>
            <input
              type="checkbox"
              name="supervisor"
              checked={isChecked}
              onChange={handleCheckboxChange}
              value="yes"
            />
            Supervisor
          </label>
        </div>
        <button type="submit" className={stylesButton.submit}>
          Create a new employee
        </button>
      </form>
    </>
  );
}
