import React, { useState } from "react";
import styles from "../styles/Input.module.css";
import stylesButton from "../styles/Buttons.module.css";
import Dropdown from "./Dropdown";

export default function NewEmployeeForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // Function to handle the option selection
  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // Add the selected option to the data object
    data.selectedOption = selectedOption;

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
          {/* <label>
            <Dropdown />
          </label> */}
          <div>
            <label htmlFor="dropdown">Select a supervisor:</label>
            <select
              id="dropdown"
              value={selectedOption}
              onChange={handleSelect}
            >
              <option value="">-- Please choose an option --</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </div>
        <button type="submit" className={stylesButton.submit}>
          Submit
        </button>
      </form>
    </>
  );
}
