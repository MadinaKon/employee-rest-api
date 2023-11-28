import React from "react";
import useSWR from "swr";

const DeleteEmployee = ({ id }) => {
  const { data: employee, mutate } = useSWR(`/api/employees`);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
      });
      console.log("RESPONSE ", response);

      if (response.ok) {
        console.log(`${id} deleted successfully! `);
        mutate();
      } else {
        console.error("Failed to delete item:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return <button onClick={handleDelete}>Delete Item</button>;
};

export default DeleteEmployee;
