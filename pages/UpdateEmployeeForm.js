import React, { useEffect, useRef } from "react";
import useSWR from "swr";
import styles from "../styles/Input.module.css";
import stylesButton from "../styles/Buttons.module.css";

const UpdateEmployeeForm = ({ defaultData, id }) => {
  const { mutate } = useSWR(`/api/employees`);

  // Refs to form fields
  const firstNameField = useRef(null);
  const lastNameField = useRef(null);
  const positionField = useRef(null);
  const supervisorField = useRef(null);

  useEffect(() => {
    // Reset form fields whenever defaultData changes
    resetForm(defaultData);
  }, [defaultData]);

  const resetForm = (data) => {
    if (data) {
      const { firstName, lastName, position, supervisor } = data;

      firstNameField.current.value = firstName;
      lastNameField.current.value = lastName;
      positionField.current.value = position;
      supervisorField.current.value = supervisor;
    }
  };

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
      <h2>Update form</h2>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          required
          defaultValue={defaultData?.firstName}
          ref={firstNameField}
          className={styles.input}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          required
          defaultValue={defaultData?.lastName}
          ref={lastNameField}
          className={styles.input}
        />
      </label>
      <br />
      <label>
        Position:
        <input
          type="text"
          name="position"
          required
          defaultValue={defaultData?.position}
          ref={positionField}
          className={styles.input}
        />
      </label>
      <br />
      <label>
        Supervisor
        <input
          type="text"
          name="supervisor"
          defaultValue={defaultData?.supervisor}
          ref={supervisorField}
          className={styles.input}
        />
      </label>
      <br />
      <button type="submit" className={stylesButton.submit}>
        Update an employee
      </button>
    </form>
  );
};

export default UpdateEmployeeForm;
