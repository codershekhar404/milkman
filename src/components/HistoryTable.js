import React, { useEffect, useState } from "react";

const HistoryTable = () => {
  const [historyData, setHistoryData] = useState([]);
  const [historyDate, setHistoryDate] = useState();

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    const d = JSON.parse(localStorage.getItem("tableData"));
    console.log();
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setHistoryData(parsedData.tableData);
      setHistoryDate(d.date);
    }
  }, []);

  return (
    <div className="history_container">
      <div className="header_container">
        <p>History</p>
        <p>{historyDate}</p>
      </div>
      {historyData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.quantity}</td>
                <td>{data.sumTotalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No history data available.</p>
      )}
    </div>
  );
};

export default HistoryTable;
