import {useEffect, useState} from "react";
import {Alert, Button, CardActions, createStyles, Divider, Snackbar, TextField, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import * as React from "react";
import {useStoreState} from "easy-peasy";
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

export function InboxPage() {
    const [stockData, setStockData] = useState([]);
    const [financeData, setFinanceData] = useState([]);
    const token = useStoreState(s => s.token);

    const getData = () => {
        ky.get('http://localhost:3004/mail/getMail?mailType=FINANCE', {headers: {token: token}}).json().then(d => {
            setFinanceData(d)
        }).catch(e => {

        });
        ky.get('http://localhost:3004/mail/getMail?mailType=STOCK', {headers: {token: token}}).json().then(d => {
            setStockData(d)
        }).catch(e => {

        });
    }

    const deleteMail = (mailid) => {
        ky.delete(`http://localhost:3004/mail/delete?mailId=${mailid}`,
            {headers: {token: token}}).then(() => {
            getData();
        }).catch(e => {
            console.log(e)
        });
    }

    const orderMoreStock = (item) => {
        ky.post('http://localhost:3001/inventory/orderProductStock',
            {json: item, headers: {token: token}})
    }

    const financeDecision = (financeData) => {
        ky.post('http://localhost:3002/order/financeDecision',
            {json: financeData, headers: {token: token}})
    }

    const StockComponent = ({s}) => {
        const [qty, setQty] = useState(10);
        return (
            <Card style={{margin: 10}}>
                <Typography>
                    <p><strong>{s.title}</strong></p>
                </Typography>
                <Divider/>
                <Typography>
                    <p>{s.message}</p>
                </Typography>
                <CardActions>
                    <TextField style={{flex: 2}}
                               id="quantity"
                               label="Quantity"
                               type='number'
                               defaultValue={qty}
                               variant="outlined"
                               onChange={(e) => setQty(parseInt(e.target.value))}

                    />
                    <Button style={{flex: 5}}
                            onClick={() => orderMoreStock({productId: s.targetId, stockOrdered: qty})}> Order More
                        Stock</Button>
                    <Button style={{flex: 5}} onClick={() => deleteMail(s.mailId)}> Delete Mail</Button>
                </CardActions>
            </Card>
        )
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div style={styles.page}>
            <div style={styles.mainContainer}>
                <div style={styles.itemsContainer}>
                    {stockData.map(s =>
                        <div key={s.mailId}>
                            <StockComponent s={s}/>
                        </div>)}
                </div>
                <div style={styles.itemsContainer}>
                    {financeData.map(s =>
                        <div key={s.mailId}>
                            <Card style={{margin: 10}}>
                                <Typography>
                                    <p><strong>{s.title}</strong></p>
                                </Typography>
                                <Divider/>
                                <Typography>
                                    <p>{s.message}</p>
                                </Typography>
                                <CardActions>
                                    <Button onClick={() => financeDecision({
                                        orderId: s.targetId,
                                        financeState: 'APPROVED'
                                    })}>Approve Finance</Button>
                                    <Button onClick={() => financeDecision({
                                        orderId: s.targetId,
                                        financeState: 'DENIED'
                                    })}>Reject Finance</Button>
                                    <Button  onClick={() => deleteMail(s.mailId)}>Delete Mail</Button>
                                </CardActions>
                            </Card>
                        </div>)}
                </div>
            </div>

        </div>
    );
}

