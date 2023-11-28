import React from "react";

const DeleteEmployee = ({ id }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Deleted successfully!");
        // Perform any UI updates or other actions upon successful deletion
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
