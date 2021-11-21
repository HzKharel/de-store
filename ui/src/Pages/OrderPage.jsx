import {useStoreActions, useStoreState} from "easy-peasy";
import {Alert, Button, createStyles, Divider, Snackbar, TextField} from "@mui/material";
import Card from "@mui/material/Card";
import * as React from "react";
import {useEffect, useState} from "react";
import ky from "ky";


const styles = createStyles({
    page: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        marginTop: 100

    },
    customerInfoCard: {
        display: "flex",
        flexDirection: "column",
        padding: 20,
        width: 500
    },
    textField: {
        margin: 4
    },
    mainContainer: {
        display: "flex",
        flexDirection: "row",
        flex: 1
    },
    itemsContainer: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: 10
    },
})

export function OrderPage() {
    const cartProducts = useStoreState(s => s.cart)
    const setCartProducts = useStoreActions(a => a.setProducts)
    const token = useStoreState(s => s.token);
    let initialState = {
        items: [],
        customerName: '',
        contactNumber: '',
        loyaltyCardNumber: '',
        address: '',
        town: '',
        postCode: ''
    }
    const [customerOrder, setCustomerOrder] = useState(initialState);
    const [modalData, setModalData] = useState({open: false, message: '', severity: ''});

    useEffect(() => {
        setCustomerOrder({...customerOrder, items: cartProducts.map(p => {return {productId: p.productId, quantity: p.quantity}})})
    }, [])

    const calculateTotal = () => {
        let total = 0;
        cartProducts.forEach(p => {
            total = total + (parseInt(p.quantity) * parseFloat(p.price))
        })
        return total
    }
    const handleChange = (e) => {
        setCustomerOrder(prevState => {
            return {
                ...prevState, [e.target.id]: e.target.value
            }
        })
    }

    const submitOrder = async (paymentType) =>{
        let order = {...customerOrder, paymentType: paymentType}
        try {
            await ky.post('http://localhost:3002/order/newOrder', {json: order, headers: {token: token}})
            sessionStorage.removeItem('cart')
            setCustomerOrder(initialState)
            setModalData({message: 'Order Placed', severity: 'success', open: true});
            setCartProducts([])
        } catch (e) {
            setModalData({message: 'Failed to place order', severity: 'warning', open: true});
        }
    }
    return (
        <div style={styles.page}>
            <div style={styles.mainContainer}>
                <div style={styles.itemsContainer}>
                    {cartProducts.map(p =>
                    <Card style={{marginBottom: 5}}>
                        <p><strong>{p.name}</strong></p>
                        <h3>{p.quantity} x £{p.price}</h3>
                    </Card>)}
                </div>
                {cartProducts.length > 0 &&
                <div style={styles.itemsContainer} >
                    <Card style={styles.customerInfoCard}>
                        <TextField style={styles.textField} onChange={handleChange} id="customerName" label="Customer Name"
                                   variant="outlined"/>
                        <TextField style={styles.textField} onChange={handleChange} id="contactNumber" label="Contact Number" type='number'
                                   variant="outlined"/>
                        <TextField style={styles.textField} onChange={handleChange} id="loyaltyCardNumber" label="Loyalty Card Number" type='number'
                                   variant="outlined"/>
                        <TextField style={styles.textField} onChange={handleChange} id="address" label="Address" variant="outlined"/>
                        <TextField style={styles.textField} onChange={handleChange} id="town" label="Town" variant="outlined"/>
                        <TextField style={styles.textField} onChange={handleChange} id="postCode" label="Postcode" variant="outlined"/>
                        <Divider/>
                        <span><strong>Total: </strong> £{calculateTotal()}</span>
                        <div style={{marginTop: 20, display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                            <Button variant="contained" onClick={()=> submitOrder('Cash')}>
                                Cash
                            </Button>
                            <Button variant="contained" onClick={()=> submitOrder('Card')}>
                                Card
                            </Button>
                            <Button variant="contained" onClick={()=> submitOrder('Finance')}>
                                Finance
                            </Button>
                        </div>

                    </Card>
                </div>}

            </div>
            <Snackbar open={modalData.open} severity={modalData.severity}
                      onClose={() => setModalData({...modalData, open: false})}
                      autoHideDuration={6000}>
                <Alert severity={modalData.severity} sx={{ width: '100%' }}>
                    {modalData.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

