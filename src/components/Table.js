import React, { useState } from "react";
import Data from "../api/Data";
import TableBody from "./sub-components/TableBody";

const Table = () => {
  const [sumTotalPrices, setSumTotalPrices] = useState();
  const [cal, setCal] = useState({
    day: "",
    time: "",
    date: "",
    month: "",
    year: "",
  });
  const [quantities, setQuantities] = useState(Data.map(() => ""));

  const handleSubmit = (event) => {
    event.preventDefault();

    // Calculate total prices for each row with two decimal places
    const totalPrices = Data.map((item, index) => {
      const totalPrice = parseFloat(item.price) * quantities[index];
      return totalPrice.toFixed(2);
    });

    // Calculate the sum of totalPrices array
    const sumTotalPrices = totalPrices.reduce(
      (acc, price) => acc + parseFloat(price),
      0
    );

    // Do whatever you want with the sumTotalPrices
    setSumTotalPrices(sumTotalPrices.toFixed(2));

    // Create an array of objects containing name, quantity, and sum total price
    const tableData = Data.map((item, index) => ({
      name: item.name,
      quantity: quantities[index],
      sumTotalPrice: totalPrices[index],
    }));

    // Add the current date to the tableData
    const currentDate = new Date().toLocaleDateString();
    const dataWithDate = {
      date: currentDate,
      tableData: tableData,
    };

    // Store the data with date in local storage
    localStorage.setItem("tableData", JSON.stringify(dataWithDate));

    // Do whatever else you want with the data
    console.log("Table Data with Date:", dataWithDate);
  };

  const handleQuantityChange = (index, value) => {
    // Update quantity for the specific row
    setQuantities((prevQuantities) =>
      prevQuantities.map((q, i) => (i === index ? value : q))
    );
  };

  const handleClearAll = (event) => {
    event.preventDefault();
    // Clear all input fields by resetting quantities state to zero
    setQuantities(Data.map(() => ""));
    setSumTotalPrices('');
  };

  // Date function

  setInterval(() => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const d = new Date();
    let day = weekday[d.getDay()];
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let time = d.toLocaleTimeString();

    setCal(() => ({
      day: day,
      date: date,
      month: month,
      year: year,
      time: time,
    }));
  }, 1000);

  return (
    <>
      <div className="table_container">
        <div className="header_container">
          <div>
            <span className="date">
              {`${cal.date}/${cal.month}/${cal.year},`}
            </span>
            <span className="day">{`${cal.day}`}</span>
          </div>
          <div className="time">{`${cal.time}`}</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((e, index) => (
              <TableBody
                key={e.id}
                name={e.name}
                price={e.price}
                unit={e.unit}
                quantity={quantities[index]}
                onQuantityChange={(value) => handleQuantityChange(index, value)}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={2}>Total</th>
              <th colSpan={3}>{sumTotalPrices}</th>
            </tr>
          </tfoot>
        </table>
        <div className="btn-container">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleClearAll}>Clear</button>
        </div>
      </div>
    </>
  );
};

export default Table;
