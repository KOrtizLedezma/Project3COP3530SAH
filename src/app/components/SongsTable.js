import React from 'react';

const SongsTable = ({ bfsData, dfsData }) => {
  // Renders the data for the table, it requires the title for the table and the data to be used
  const renderTable = (data, title) => (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>{title}</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(data).map((song, index) => (
            <tr key={index}>
              <td>{song}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Returns both tables that appear on the left side of the screen
  return (
    <div className="custom-tables">
      <div className="custom-bfs">
        {bfsData && bfsData.size > 0 && renderTable(bfsData, "Breadth First Search")}
      </div>
      <div className="custom-dfs">
        {dfsData && dfsData.size > 0 && renderTable(dfsData, "Depth First Search")}
      </div>
    </div>
  );
};

export default SongsTable;
