import React from 'react';
import { Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { CloseIcon } from '../../../../../shared/modules/MaterialImports/Dialog';

const CandidateModal = ({ open, handleClose,categoryData }:any) => {
  const dummyData = [
    { name: "John Doe", location: "New York", email: "john@example.com", phone: "123-456-7890" },
    { name: "Jane Smith", location: "Los Angeles", email: "jane@example.com", phone: "987-654-3210" },
    { name: "Mike Johnson", location: "Chicago", email: "mike@example.com", phone: "555-555-5555" },
  ];


  console.log(categoryData, "categoryData")
  return (
    <Modal open={open} onClose={handleClose}>
      <div style={{ padding: '20px', background: 'white', borderRadius: '8px', maxWidth: '600px', margin: '100px auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <h2 style={{ margin: 0 }}>
    Candidate Details for {categoryData?.category}
  </h2>
  <CloseIcon onClick={handleClose} />
</div>


        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Candidate Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyData.map((candidate, index) => (
                <TableRow key={index}>
                  <TableCell>{candidate.name}</TableCell>
                  <TableCell>{candidate.location}</TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>{candidate.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Modal>
  );
};

export default CandidateModal;
