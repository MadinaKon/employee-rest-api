import React, { useState } from "react";

const SearchComponent = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const onSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(query.toLowerCase())
      )
    );

    setFilteredData(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={onSearch}
      />
      <ul>
        {filteredData.map(
          (
            { firstName, lastName, position, supervisor, creationDate },
            index
          ) => (
            <li key={index}>
              {firstName} {lastName} {position}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default SearchComponent;
