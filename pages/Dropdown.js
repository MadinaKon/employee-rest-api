import React, { useState } from "react";

const Dropdown = () => {
  // State to manage the selected option
  const [selectedOption, setSelectedOption] = useState("");

  // Function to handle the option selection
  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Select a supervisor:</label>
      <select id="dropdown" value={selectedOption} onChange={handleSelect}>
        <option value="">-- Please choose an option --</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
};

export default Dropdown;
