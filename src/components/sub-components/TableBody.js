import React from "react";

const TableBody = (props) => {
  const handleChange = (e) => {
    props.onQuantityChange(e.target.value);
  };

  const total = props.price * props.quantity;

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.price}</td>
      <td>{props.unit}</td>
      <td>
        <input type="number" onChange={handleChange} value={props.quantity}/>
      </td>
      <td>{total.toFixed(2)}</td>
    </tr>
  );
};

export default TableBody;
