import * as React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export function RecentOrdersComponent({orders}) {
    const calculateTotal = (orderItems) => {
        let total = 0;
        orderItems.forEach(p => {
            total = total + (parseInt(p.quantity) * parseFloat(p.productPrice))
        })
        return total
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Customer Name</TableCell>
                        <TableCell align="left">Contact Number</TableCell>
                        <TableCell align="left">Items</TableCell>
                        <TableCell align="left">Address</TableCell>
                        <TableCell align="left">Loyalty Card</TableCell>
                        <TableCell align="left">Order Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow
                            key={order.orderId}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="left">{order.customerName}</TableCell>
                            <TableCell component="th" scope="row">
                                {order.contactNumber}
                            </TableCell>
                            <TableCell align="left">{order.items.map(i => <div>{i.quantity} x {i.productName}</div>)}</TableCell>
                            <TableCell align="left">{order.address}</TableCell>
                            <TableCell align="left">{order.loyaltyCardNumber}</TableCell>
                            <TableCell align="left"><strong>£ {calculateTotal(order.items)}</strong></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

