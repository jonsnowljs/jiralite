import React from "react";

export const List = ({ list, users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Lead</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{project.personName}</td>
            {/*optional chaining symbol: <?.> will prevent throw error, just return undefined */}
            <td>
              {users.find((user) => user.id === project.personId)?.name ||
                "Unknown"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
