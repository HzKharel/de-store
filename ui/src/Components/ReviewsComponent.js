import * as React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReactStars from "react-rating-stars-component";


function createData(name, stars, review,) {
    return {name, stars, review};
}


const rows = [
    createData('John Smith', 4,  "Excellent customer service!" ),
    createData('Tom Doe', 1,  "Delivered Wrong order!" ),
    createData('Mary Jane', 3,  "Order late but satisfied!" ),
    createData('Michael Brown', 5,  "Amazing product and very good price" ),
    createData('Susan Doe', 5,  "Will come back for more" ),
];


export function ReviewsComponent() {

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Customer Name</TableCell>
                        <TableCell align="left">Review</TableCell>
                        <TableCell align="right">Rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{row.review}</TableCell>
                            <TableCell align="right" style={{justifyContent: "right", display: "flex"}}>
                                <ReactStars
                                    count={5}
                                    value={row.stars}
                                    edit={false}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

