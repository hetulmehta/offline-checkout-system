import React, { Component } from "react";
import "./Table.css";

class Table extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      //state is by default an object
      students: [
        { id: 1, Product: "Harpic", Details: "For cleaning", Quantity: "17" },
        { id: 2, Product: "Lizol", Details: "For cleaning", Quantity: "27" },
        { id: 3, Product: "Chocos", Details: "Eating stuff", Quantity: "37" },
        { id: 4, Product: "Lays", Details: "Eating stuff", Quantity: "47" },
      ],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/inventory")
      .then((response) => response.json())
      .then((findresponse) => {
        this.setState({
          data: [findresponse],
        });
      });
  }

  renderTableData() {
    return this.state.students.map((student, index) => {
      const { id, Product, Details, Quantity } = student; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{Product}</td>
          <td>{Details}</td>
          <td>{Quantity}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.students[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    return (
      <div>
        <h1 id="title">Products Table</h1>
        <table id="students">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
