import React, { useEffect, useState } from "react";
import "./Table.css";
import Axios from 'axios';

const Table = () => {
  const [students, setStudents] = useState([])

  useEffect(() => {
    async function FetchData() {
      try {
        const CancelToken = Axios.CancelToken.source();
        const resp = await Axios.get(`http://localhost:3000/inventory`);
        const student = await resp.data.data;
        setStudents(student);
        console.log(student)
        return CancelToken.cancel();
      } catch (e) {
        console.log(e);
      }
    }
    FetchData();
  }, []);

  const renderTableData = () => {
    return students.map((student) => {
      console.log(student)
      return(
        <tr>
          <td>{student.ProductID}</td>
          <td>{student.product}</td>
          <td>{student.category}</td>
          <td>{student.sub_category}</td>
          <td>{student.brand}</td>
          <td>{student.sale_price}</td>
          <td>{student.market_price}</td>
          <td>{student.image_url}</td>
          <td>{student.p_url}</td>
        </tr>
      )
    });
  }

  const renderTableHeader = () => {
    let header = Object.keys(students[0]);
    return header.map((key, index) => {
      return <th key={index}>{key}</th>;
    });
  }

  return (
    <div>
      <h1 id="title">Products Table</h1>
      <table id="students">
        <tbody>
          <tr>{renderTableHeader()}</tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
