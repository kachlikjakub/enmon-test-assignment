import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableSortLabel,
  Paper,
} from "@mui/material";
import { InventoryMeter } from "../entities/InventoryMeter";

export const initialEditModalStates: State = {
  id: "",
  accessibility: "",
  backend_gateway_meter_id: "",
  owner: "",
  unit: "",
  createdAt: "",
};
interface State {
  [key: string]: string;
}

function MetersTable(props: any) {
  const {
    data,
    isAsc,
    orderBy,
    selectedRow,
    setSelectedRow,
    setEditModalStates,
    setPage,
    page,
    setOrderBy,
    setEditOpened,
    setIsAsc,
  } = props;

  const handleSortClick = (column: string) => {
    setOrderBy(column);
    setPage(0);
    if (column === orderBy) {
      setIsAsc((prevState: State) => !prevState);
    } else {
      setIsAsc(true);
    }
  };

  const handleEditRecordClick = () => {
    setEditOpened(true);
    const selectedRecord = data.find((record: InventoryMeter) => {
      return record.id === selectedRow;
    });
    setEditModalStates({ ...selectedRecord });
  };

  return data.length > 0 ? (
    <React.Fragment>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(initialEditModalStates).map((column, index) => (
                <TableCell key={index}>
                  <TableSortLabel
                    direction={isAsc ? "asc" : "desc"}
                    active={column === orderBy}
                    onClick={() => handleSortClick(column)}
                  >
                    {column}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((record: InventoryMeter) => {
              return (
                <TableRow
                  selected={selectedRow === record.id}
                  key={record.id}
                  onClick={() => {
                    setSelectedRow(record.id);
                    setEditModalStates({ ...record });
                  }}
                  onDoubleClick={handleEditRecordClick}
                >
                  {Object.keys(record).map((column, index) => (
                    <TableCell key={index}>
                      {column === "createdAt" ? (
                        <span>
                          {new Date(
                            record[column as keyof InventoryMeter]
                          ).toLocaleString()}
                        </span>
                      ) : (
                        record[column as keyof InventoryMeter]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={-1}
        onPageChange={(event, page) => {
          setPage(page);
        }}
        page={page}
        rowsPerPage={10}
      />
    </React.Fragment>
  ) : null;
}

export default MetersTable;
