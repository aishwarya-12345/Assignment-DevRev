import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtn, MDBBtnGroup, MDBPagination, MDBPaginationLink, MDBPaginationItem} from "mdb-react-ui-kit";
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(10);
  const [color, setColor] = useState("#8dd33c");

  useEffect(() => {
    loadUsersData(0, 10, 0);
    document.body.style.backgroundColor = color
  }, [color]);

  const loadUsersData = async (start, end, increase) => {
    return await axios.get(`http://localhost:5000/users?_start=${start}&_end=${end}`)
    .then((response) => {
      setData(response.data)
      setCurrentPage(currentPage + increase);
    })
    .catch((err) => console.log(err));
  };

  console.log("data", data);

  const handleSearch = async (e) => {
    e.preventDefault();
    return await axios
    .get(`http://localhost:5000/users?q=${value}`)
    .then((response) => {
      setData(response.data)
      setValue("");
    })
    .catch((err) => console.log(err));
  };

  const renderPagination = () => {
    if(currentPage === 0){
      return(
        <MDBPagination className='mb-0'>
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn onClick={() => loadUsersData(10, 20, 1)}>Next</MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }else if(currentPage < pageLimit-1 && data.length === pageLimit) {
      return (
        <MDBPagination className='mb-0'>
          <MDBPaginationItem>
            <MDBBtn onClick={() => loadUsersData((currentPage - 1) * 10, currentPage * 10, -1)}>Prev</MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn onClick={() => loadUsersData((currentPage + 1) * 10, (currentPage + 2) * 10, 1)}>Next</MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }else {
      return(
        <MDBPagination className='mb-0'>
          <MDBPaginationItem>
            <MDBBtn onClick={() => loadUsersData(10, 20, -1)}>Prev</MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  return (
    <MDBContainer>
      <form style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignCentent: "center",
      }}
      className="d-flex input-group w-auto"
      onSubmit={handleSearch}
      >
        <input 
        type="text"
        className='form-control'
        placeholder='Search books'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        />
          <MDBBtn type='submit' color='dark'>Search</MDBBtn>
          
      </form>
      <div style={{marginTop: "25px"}}>
        <h2 className='text-center' style={{color: "#000000"}}>
          Come for the book, leave with the knowledge..!</h2>
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope='col'>Id </th>
                  <th scope='col'>Book Title </th>
                  <th scope='col'>Author </th>
                  <th scope='col'>Subject</th>
                  <th scope='col'>Publish Date</th>
                </tr>
              </MDBTableHead>
              {data.length === 0 ?(
                <MDBTableBody className='align-center mb-0'>
                  <tr style={{backgroundColor: "#cccccc"}}>
                    <td colSpan={20} className='text-center mb-0'>No Data Found</td>
                  </tr>
                </MDBTableBody>
              ):(
                data.map((item, index) => (
                  <MDBTableBody key={index}>
                    <tr style={{backgroundColor: "#cccccc"}}>
                      <th scope='row'>{index+1}</th>
                      <td>{item.title}</td>
                      <td>{item.author}</td>
                      <td>{item.genre}</td>
                      <td>{item.date}</td>
                    </tr>
                  </MDBTableBody>
                ))
              )};
            </MDBTable>
          </MDBCol>
        </MDBRow>
        <div 
        style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "250px",
        alignCentent: "center",
      }}
      >
        {renderPagination()}</div>
      </div>
    </MDBContainer>
  );
}

export default App;
