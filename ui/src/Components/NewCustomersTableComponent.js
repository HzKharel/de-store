import {useEffect, useState} from "react";
import {Alert, Button, CardActions, createStyles, Divider, Snackbar, TextField, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import * as React from "react";
import {useStoreState} from "easy-peasy";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(name, totalSpent, totalOrders, customerSince, loyaltyPoints) {
    return {name, totalSpent, totalOrders, customerSince, loyaltyPoints};
}


const rows = [
    createData('John Smith', "£8,920",  32, "June 2021", 3600),
    createData('Mary Smith', "£730",  4, "March 2021", 500),
    createData('Peter Parker', "£10,000",  10, "December 2021", 3600),
    createData('Tony Stark', "£15,600",  2, "June 2020", 5000),
    createData('Bruce Wayne', "£850",  1, "January 2021", 3600),
    createData('Homer Simpson', "£2,220",  3, "June 2021", 1550),
    createData('Clark Kent', "£88,700",  182, "March 2019", 10),
    createData('Sue Storm', "£5,360",  5, "October 2021", 50),
    createData('Johnny Blaze', "£18,920",  8, "April 2021", 120),
    createData('Mary Jane', "£6,550",  8, "June 2020", 360),
];


export function NewCustomersTable() {

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Customer Name</TableCell>
                        <TableCell align="right">Spent</TableCell>
                        <TableCell align="right">Orders</TableCell>
                        <TableCell align="right">Member Since</TableCell>
                        <TableCell align="right">Loyalty Points</TableCell>
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
                            <TableCell align="right">{row.totalSpent}</TableCell>
                            <TableCell align="right">{row.totalOrders}</TableCell>
                            <TableCell align="right">{row.customerSince}</TableCell>
                            <TableCell align="right">{row.loyaltyPoints}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

