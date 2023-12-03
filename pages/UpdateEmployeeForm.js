import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import styles from "../styles/Input.module.css";
import stylesButton from "../styles/Buttons.module.css";

const UpdateEmployeeForm = ({ defaultData, id }) => {
  const { mutate } = useSWR(`/api/employees`);
  const [isFormVisible, setIsFormVisible] = useState(true);

  // Refs to form fields
  const firstNameField = useRef(null);
  const lastNameField = useRef(null);
  const positionField = useRef(null);
  const supervisorField = useRef(null);

  const resetForm = (data) => {
    if (data) {
      const { firstName, lastName, position, supervisor } = data;

      // firstNameField.current.value = firstName;
      // lastNameField.current.value = lastName;
      // positionField.current.value = position;
      // supervisorField.current.value = supervisor;

      if (firstNameField.current) {
        firstNameField.current.value = firstName;
      }
      if (lastNameField.current) {
        lastNameField.current.value = lastName;
      }
      if (positionField.current) {
        positionField.current.value = position;
      }
      if (supervisorField.current) {
        supervisorField.current.value = supervisor;
      }
    }
  };

  useEffect(() => {
    resetForm(defaultData);

    return () => {
      // Cleanup: reset refs when component unmounts
      firstNameField.current = null;
      lastNameField.current = null;
      positionField.current = null;
      supervisorField.current = null;
    };
  }, [defaultData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    updateEmployee(data);
  };

  async function updateEmployee(data) {
    console.log("UPDATE IS CLICKED ");
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
        setIsFormVisible(false);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  }

  const handleCancel = () => {
    setIsFormVisible(false);
  };

  if (!isFormVisible) {
    return null;
  }

  return (
    <>
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
      </form>
      <button type="submit" className={stylesButton.submit}>
        Update an employee
      </button>
      <button
        type="button"
        className={stylesButton.cancel}
        onClick={handleCancel}
      >
        Cancel
      </button>
    </>
  );
};

export default UpdateEmployeeForm;
