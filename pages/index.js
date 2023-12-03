import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Table.module.css";
import stylesButton from "../styles/Buttons.module.css";
import useSWR from "swr";
import NewEmployeeForm from "./NewEmployeeForm";
import UpdateEmployeeForm from "./UpdateEmployeeForm";
import SearchComponent from "./SearchComponent";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showData, setShowData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(employees);

  const { mutate } = useSWR(`/api/employees`);

  const onSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = employees.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(query.toLowerCase())
      )
    );

    setFilteredData(filtered);
  };

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

  const updateEmployee = async (updatedEmployee) => {
    try {
      const response = await fetch(`/api/employees/${selectedEmployee._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployee),
      });

      if (response.ok) {
        const updatedEmployeeList = employees.map((employee) =>
          employee._id === selectedEmployee._id ? updatedEmployee : employee
        );

        setEmployees(updatedEmployeeList);
        mutate();
      } else {
        console.error("Failed to update employee.");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Employee App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Employee table</h1>

      <SearchComponent data={filteredData} />

      {showData && employees && (
        <div>
          <div>
            {/* <label htmlFor="searchQuery">
              <input
                type="text"
                placeholder="Search..."
                id={searchQuery}
                value={searchQuery}
                onChange={onSearch}
              />
            </label> */}
          </div>
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
                  </tr>
                )
              )}
            </tbody>
          </table>

          {selectedEmployee && (
            <UpdateEmployeeForm
              defaultData={selectedEmployee}
              id={selectedEmployee._id}
              updateEmployee={updateEmployee}
            />
          )}

          <h2>Create a new employee</h2>
          <NewEmployeeForm />
        </div>
      )}
    </>
  );
}
