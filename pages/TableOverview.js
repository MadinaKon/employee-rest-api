import React from "react";

export default function TableOverview({ data }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>firstName</th>
          <th>lastName</th>
          <th>position</th>
          <th>supervisor</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ _id, firstName, lastName, position, supervisor }) => (
          <tr key={_id}>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{position}</td>
            <td>{supervisor}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
