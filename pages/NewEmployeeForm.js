import React, { useEffect, useState } from "react";
import styles from "../styles/Input.module.css";
import stylesButton from "../styles/Buttons.module.css";

export default function NewEmployeeForm() {
  const [supervisors, setSupervisors] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState("");

  async function fetchSupervisors() {
    try {
      const response = await fetch(
        `https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001`
      );

      const data = await response.json();
      setSupervisors(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSupervisors();
  }, []);

  const handleSelect = (event) => {
    setSelectedSupervisor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    data.supervisor = selectedSupervisor;
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
              required
              className={styles.input}
              placeholder="Firstname"
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
            />
          </label>
        </div>
        <div>
          <div>
            <label htmlFor="dropdown">Select a supervisor:</label>
            <select
              id="dropdown"
              value={selectedSupervisor}
              onChange={handleSelect}
            >
              <option value="">-- Please choose an option --</option>
              {supervisors.map(({ id, email }) => (
                <option key={id} value={email}>
                  {email}
                </option>
              ))}
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
