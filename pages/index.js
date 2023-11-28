import Head from "next/head";
import { useEffect, useState } from "react";
import DeleteEmployee from "./DeleteEmployee";

export default function Home() {
  const [employees, setEmployees] = useState([]);
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
    // Fetch items when the component mounts or whenever dependencies change
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Employee App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button onClick={fetchData}>Fetch all employees</button>
      {showData && employees && (
        <div>
          {/* <button onClick={hideData}>Hide Data</button> */}
          <h2>Response Data: {employees.length}</h2>
          <ul>
            {employees.map(
              ({ _id, firstName, lastName, position, supervisor }) => (
                <li key={_id}>
                  {firstName} {lastName} {position}
                  <DeleteEmployee id={_id}>Delete</DeleteEmployee>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </>
  );
}
