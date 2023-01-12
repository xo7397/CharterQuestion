import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row(props) {
  const { row, subRows } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{row.custid}</TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">{row.numTransactions}</TableCell>
        <TableCell align="right">{row.month}</TableCell>
        <TableCell align="right">{row.totalPointsByCustomer}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Transactions
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Amount</TableCell>
                    <TableCell align="right">Month</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Points</TableCell>
                    <TableCell align="right">Transaction Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subRows.map((reward) => (
                    <TableRow key={reward.date}>
                      <TableCell>{reward.amt}</TableCell>
                      <TableCell align="right">{reward.month}</TableCell>
                      <TableCell align="right">{reward.name}</TableCell>
                      <TableCell align="right">{reward.points}</TableCell>
                      <TableCell align="right">
                        {reward.transactionDt}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const subRowsByKey = (array, value) => {
  console.log(array, "subRows1");
  console.log(value, "subRows2");
  const subRows = array.filter((x) => x.custid === value);
  console.log(subRows, "subRows");
  return subRows;
};
export default function CollapsibleTable(props) {
  console.log(props.data, "TableProps");
  const { summaryByCustomer, pointsPerTransaction } = props?.data;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right">Customer ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">No of Transactions</TableCell>
            <TableCell align="right">Month</TableCell>
            <TableCell align="right">Total Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summaryByCustomer.map((row) => (
            <Row
              key={row.name}
              row={row}
              subRows={subRowsByKey(pointsPerTransaction, row.custid)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
