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
  {
    id: 'image',
    label: 'Image',
    minWidth: '10%',
    align: 'center',
  },
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
    format: (value) => <div id="delete" onClick={this}>Delete</div>,
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

  return (
    <Paper className={classes.root} style={{ height: '100%', background: '#504F54' }}>
      <TableContainer className={classes.container} style={{ borderRadius: '2px'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, background: '#202020', color: '#FFFFFF', fontFamily: 'Open Sans', border: 'none'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.personId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} style={row.personId % 2 == 0 ? {background: '#636268', color: '#FFFFFF', fontFamily: 'Open Sans', border: 'none'} : {background: '#FFFFFFF', color: '#FFFFFF', fontFamily: 'Open Sans', border: 'none'}}>
                        {typeof value === "undefined" ? 
                                                      <div className="deleteButton" onClick={() => {props.onClick(row)}}>Delete</div> : 
                                                      column.id == "image" ? 
                                                                          <img className="image" src={"data:image/jpg;base64, " + value} />  :
                                                                           value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default StickyHeadTable;