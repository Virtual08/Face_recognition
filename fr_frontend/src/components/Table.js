import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'lastName', label: 'Last name', minWidth: '10%', align: 'center'},
  { id: 'firstName', label: 'First name', minWidth: '10%', align: 'center'},
  {
    id: 'middleName',
    label: 'Middle name',
    minWidth: '10%',
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'age',
    label: 'Age',
    minWidth: '10%',
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'externalId',
    label: 'External id',
    minWidth: '10%',
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: '10%',
    align: 'center',
    format: (value) => <div id="delete">Delete</div>,
  }
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '100%',
    height: '100%'
  },
});

function StickyHeadTable(props) {
  const classes = useStyles();
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

  return (
    <Paper className={classes.root} style={{ height: '100%' }}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data/*.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)*/.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.personId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && (typeof value === "number" || typeof value === "undefined") ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}

export default StickyHeadTable;