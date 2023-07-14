/* eslint-disable prettier/prettier */
import * as React from 'react';

// material-ui
import { Table, Typography, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CSVExport } from './CSV';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { tableCellClasses } from '@mui/material/TableCell';
import { useDiebetic } from 'hooks/api/diabeticscreening';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));



const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));


// ==============================|| TABLE - STICKY HEADER ||============================== //

export default function SearchListTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { state } = useDiebetic();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event?.target?.value);
        setPage(0);
    };


    return (
        <MainCard content={false} title="Diabetic Screen Search list based on mentioned threshold (s)">
            {/* table */}
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell >Full Name</StyledTableCell>
                            <StyledTableCell >Age </StyledTableCell>
                            <StyledTableCell >Gender</StyledTableCell>
                            <StyledTableCell >Blood Pressure</StyledTableCell>
                            <StyledTableCell >Blood Glucose</StyledTableCell>
                            <StyledTableCell >Weight</StyledTableCell>
                            <StyledTableCell >Height</StyledTableCell>
                            <StyledTableCell >Treatment Start Date</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {state?.filteredList && state.filteredList.length > 0 ? (
                            state.filteredList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <StyledTableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={row.id}>
                                    <StyledTableCell>{`${row.patient.firstName} ${row.patient.lastName}` || "******"}</StyledTableCell>
                                    <StyledTableCell>{row.patient.age || 0}</StyledTableCell>
                                    <StyledTableCell>{row.patient.gender || "Uknown"}</StyledTableCell>
                                    <StyledTableCell>{row.bloodPressure || `${row.systolicBloodPressure}/${row.diastolicBloodPressure}` || 0}</StyledTableCell>
                                    <StyledTableCell>{row.bloodGlucose || 0}</StyledTableCell>
                                    <StyledTableCell>{row.weight || 0}</StyledTableCell>
                                    <StyledTableCell>{row.height || 0}</StyledTableCell>
                                    <StyledTableCell>{row.treatmentStartDate || 0}</StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <StyledTableRow sx={{ py: 3 }}>
                                <StyledTableCell colSpan={8} align="center">
                                    No records found.
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* table pagination */}
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={(state.filteredList && state.filteredList.length) || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
}
