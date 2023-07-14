/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
// material-ui
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import {
    Table,
    TableBody,
    TableCell,
    CardContent,
    CardActions, Tooltip,
    Fab, Grid, Box, Collapse, TableContainer, IconButton, TableHead, TablePagination, TableRow, tableCellClasses,
} from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import AddIcon from '@mui/icons-material/Add';
import {useDiebetic} from 'hooks/api/diabeticscreening';
import { useEffect } from 'react';


// styles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
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
    '&:last-of-type td, &:last-of-type th': {
        border: 0
    }
}));

// table data
function createData(treatmentStartDate, bloodPressure, bloodGlucose, height, weight, id) {
    return { treatmentStartDate, bloodPressure, bloodGlucose, height, weight, id };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
];

// ==============================|| TABLE - CUSTOMIZED ||============================== //

export default function ScreenListTable() {
    const {state, GetDiebeticList} = useDiebetic();

    useEffect(()=>{
        GetDiebeticList();
    },[])

    return (
        <MainCard
            content={false}
        >
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                        <Tooltip component={Link} to="/screen/add" title="Click to Screen">
                            <Fab color="primary" size="small" sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}>
                                <AddIcon fontSize="small" />
                            </Fab>
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardContent>
            <TableContainer>
                <Table sx={{ minWidth: 320 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell sx={{ pl: 3 }}>Treatment Date</StyledTableCell>
                            <StyledTableCell align="right">Blood Pressure Level</StyledTableCell>
                            <StyledTableCell align="right">Blood Glucose Level</StyledTableCell>
                            <StyledTableCell align="right">Height</StyledTableCell>
                            <StyledTableCell sx={{ pr: 3 }} align="right">Weight</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.diabeticList.map((row) => (
                            <StyledTableRow hover key={row.id}>
                                <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
                                    {row.treatmentStartDate || ""}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.bloodPressure || ""}</StyledTableCell>
                                <StyledTableCell align="right">{row.bloodGlucose || ""}</StyledTableCell>
                                <StyledTableCell align="right">{row.height || ""}</StyledTableCell>
                                <StyledTableCell sx={{ pr: 3 }} align="right">{row.weight || ""} </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    );
}
