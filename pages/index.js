import Head from "next/head";
import { useEffect, useState } from "react";
import NewEmployeeForm from "./NewEmployeeForm";
import UpdateEmployeeForm from "./UpdateEmployeeForm";
import styles from "../styles/Table.module.css";
import stylesButton from "../styles/Buttons.module.css";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showData, setShowData] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/employees");
      const data = await response.json();
      setEmployees(data);
      setShowData(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const hideData = () => {
    setShowData(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateClick = (employee) => {
    console.log("HANDLE UPDATE CLICK EMPLOYEE ", employee);
    setSelectedEmployee(employee);
  };

  const deleteAnEmployee = async (idToDelete) => {
    try {
      await fetch(`/api/employees/${idToDelete}`, {
        method: "DELETE",
      });
      const updatedItems = employees.filter((item) => item._id !== idToDelete);
      setEmployees(updatedItems);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const displayLinkToSupervisor = async (supervisorId) => {
    console.log("displayLinkToSupervisor ", supervisorId);
    // try {
    //   await fetch(`/api/employees/${supervisorId}`, {
    //     method: "GET",
    //   });

    //   // const updatedItems = employees.find((item) => item._id === supervisorId);
    //   // setEmployees(updatedItems);
    // } catch (error) {
    //   console.error("Error deleting item:", error);
    // }
  };

  return (
    <>
      <Head>
        <title>Employee App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <button onClick={fetchData}>Fetch all employees</button> */}
      {showData && employees && (
        <div>
          {/* <button onClick={hideData}>Hide Data</button> */}
          <table border="1" className={styles.table}>
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Position</th>
                <th>Supervisor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(
                ({ _id, firstName, lastName, position, supervisor }) => (
                  <tr key={_id}>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{position}</td>
                    <td>{supervisor}</td>
                    <button
                      onClick={() =>
                        handleUpdateClick({
                          _id,
                          firstName,
                          lastName,
                          position,
                          supervisor,
                        })
                      }
                      className={stylesButton.button}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteAnEmployee(_id)}
                      className={stylesButton.button}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => displayLinkToSupervisor(_id)}
                      className={stylesButton.button}
                    >
                      Link to Supervisor
                    </button>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {selectedEmployee && (
            <UpdateEmployeeForm
              defaultData={selectedEmployee}
              id={selectedEmployee._id}
            />
          )}
          <h2>Create a new employee</h2>
          <NewEmployeeForm />
        </div>
      )}
    </>
  );
}
