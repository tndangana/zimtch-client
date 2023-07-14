/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import {
    Table,
    TableBody,
    TableCell,
    CardContent,
    CardActions, Tooltip,
    Fab, Grid, Box, Collapse, TableContainer, IconButton, TableHead, TablePagination, TableRow
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { useTheme, styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SubCard from 'ui-component/cards/SubCard';
import { usePatient } from 'hooks/api/patient';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableCellSub = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



function Row({ row }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    return (
        <>

            <StyledTableRow hover tabIndex={-1} sx={{ py: 3 }} >
                <StyledTableCell sx={{ pl: 3 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">{row.firstName} </StyledTableCell>
                <StyledTableCell >{row.lastName}</StyledTableCell>
                <StyledTableCell >{row.gender}</StyledTableCell>
                <StyledTableCell >{row.age}</StyledTableCell>
                <StyledTableCell >{row.mobileNumber}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {open && (
                            <Box sx={{ margin: 1 }}>
                                <TableContainer>
                                    <SubCard
                                        sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                        content={false}

                                    >

                                        <Table size="small" aria-label="purchases">
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCellSub>Treatment Date</StyledTableCellSub>
                                                    <StyledTableCellSub>Blood Pressure</StyledTableCellSub>
                                                    <StyledTableCellSub>Blood Glucose</StyledTableCellSub>
                                                    <StyledTableCellSub>Weight</StyledTableCellSub>
                                                    <StyledTableCellSub>Height</StyledTableCellSub>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {row.diabeticScreeningList?.map((sreen) => (
                                                    <StyledTableRow hover key={sreen.id}>
                                                        <StyledTableCellSub component="th" scope="row"> {sreen.treatmentStartDate} </StyledTableCellSub>
                                                        <StyledTableCellSub >{sreen.bloodPressure}</StyledTableCellSub>
                                                        <StyledTableCellSub> {`${sreen.systolicBloodPressure}/${sreen.diastolicBloodPressure}`}</StyledTableCellSub>
                                                        <StyledTableCellSub> {sreen.weight}</StyledTableCellSub>
                                                        <StyledTableCellSub> {sreen.height}</StyledTableCellSub>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </SubCard>
                                </TableContainer>
                            </Box>
                        )}
                    </Collapse>
                </StyledTableCell>
            </StyledTableRow>
        </>
    );
}

Row.propTypes = {
    row: PropTypes.object
};




// ==============================|| TABLE - STICKY HEADER ||============================== //

export default function AdultPatientsTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { state, getAdultPatientList } = usePatient();

    React.useEffect(() => {
        getAdultPatientList();
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event?.target?.value);
        setPage(0);
    };

    return (
        <MainCard content={false}>

            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell sx={{ pl: 3 }} />
                            <StyledTableCell component="th" scope="row"> First Name </StyledTableCell>
                            <StyledTableCell >Last Name</StyledTableCell>
                            <StyledTableCell >Gender</StyledTableCell>
                            <StyledTableCell >Age</StyledTableCell>
                            <StyledTableCell >Mobile Number</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {state.patientListAdult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <Row key={row.id} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* table pagination */}
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={state.patientListAdult.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
}
