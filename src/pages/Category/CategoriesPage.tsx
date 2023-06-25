import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import styles from './CategoriesPage.module.css';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type Props = {};

function createData(name: number, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(1, 159, 6.0, 24, 4.0),
  createData(2, 237, 9.0, 37, 4.3),
  createData(3, 262, 16.0, 24, 6.0),
  createData(4, 305, 3.7, 67, 4.3),
  createData(5, 356, 16.0, 49, 3.9),
];

const CategoriesPage = (props: Props) => {
  const [isCreate, setIsCreate] = useState(false);
  return (
    <div>
      <Container>
        {/* <div className={styles.item}>
          <div className={styles.index}>1.</div>
          <img src="https://www.countdown.co.nz/content/f23-june-budget-friendly.jpg" alt="" />
          <div>Soups </div>
          <div className={styles.buttons}>
            <Button variant="contained">Delete</Button>
            <Button variant="outlined">Edit</Button>
          </div>
        </div> */}
        <div className={styles.item}>
          <div className={styles.linkBox}>
            <button className={styles.linkButton} onClick={() => setIsCreate(!isCreate)}>
              New Category
            </button>
          </div>

          {isCreate && (
            <div className={styles.formBox}>
              <span>New Category</span>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { width: '100%' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={(e) => e.preventDefault()}
              >

                <TextField id="outlined-basic" label="Title" variant="outlined" margin="normal" size="small" />
                <TextField id="outlined-basic" label="ImageUrl" variant="outlined" margin="normal" size="small" />

                <Button variant="contained">Create</Button>
              </Box>
            </div>
          )}

          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 800 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Index</TableCell>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <div className={styles.imgBox}>
                        <div className={styles.index}>{row.name}</div>
                        <div className={styles.categoryImage}>
                          <img src="https://www.countdown.co.nz/content/f23-june-budget-friendly.jpg" alt="" />{' '}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">
                      <Button variant="contained">Edit</Button>
                      <Button variant="outlined">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </div>
  );
};

export default CategoriesPage;
