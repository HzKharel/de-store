import {useEffect, useState} from "react";
import {Alert, Button, CardActions, createStyles, Divider, Snackbar, TextField, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import * as React from "react";
import {useStoreState} from "easy-peasy";
import {NewCustomersTable} from "../Components/NewCustomersTableComponent";
import ReactStars from "react-rating-stars-component";
import {ReviewsComponent} from "../Components/ReviewsComponent";
import ky from "ky";
import TableCell from "@mui/material/TableCell";
import {SalesChartReport} from "../Components/SalesChartComponent";
import {RecentOrdersComponent} from "../Components/RecentOrdersComponent";


const styles = createStyles({
    page: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        backgroundColor: "whiteSmoke",
        minHeight: "93vh",
        flexWrap: "wrap"


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
    metricView: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gridGap: "5px",
        gridTemplateColumns: `repeat(4,1fr)`

    }
})


export function DashboardPage() {
    const token = useStoreState(s => s.token);
    const [dashboardData, setDashboardData] = useState(null);
    const [allOrders, setAllOrders] = useState([])


    useEffect(() => {
        ky.get("http://localhost:3004/reporting/storePerformance",
            {headers: {token: token}}).json().then(res => {
            setDashboardData(res)
        });
        ky.get("http://localhost:3002/order/allOrders",
            {headers: {token: token}}).json().then(res => {
            setAllOrders(res)
            console.log(res)
        })
    }, [])


    const MetricComponent = (title, value) => {
        return (
            <Card style={{padding: 20, paddingLeft: 30, paddingRight: 30, marginRight: 10, width: 235}}>
                <Typography variant='h5' component='div'>
                    {title}
                </Typography>
                <Divider />
                <Typography variant='h4' component='div' style={{marginTop: 10}}>
                    {value}
                </Typography>
            </Card>
        )
    }

    return (
        <div style={styles.page}>

            <Typography style={{marginLeft: 50,fontWeight: "bold", fontSize: 50, color: "darkblue"}}><p>Dashboard</p></Typography>


            <div style={styles.mainContainer}>
                <div style={styles.itemsContainer}>
                    <Card>
                        <Typography variant="h5" component="div" style={{marginTop: 10, marginBottom: 20}}><strong>Customers</strong></Typography>
                        <NewCustomersTable />
                    </Card>
                    <Card style={{marginTop: 25}}>
                        <Typography variant="h5" component="div" style={{marginTop: 10, marginBottom: 20}}><strong>Reviews</strong></Typography>
                        <Divider />

                        <ReviewsComponent />
                    </Card>
                </div>
                {dashboardData &&
                <div style={styles.itemsContainer}>
                    <Card style={{marginBottom: 20}}>
                        <Typography variant="h5" component="div" style={{marginTop: 10, marginBottom: 20}}><strong>Monthly Sales</strong></Typography>
                        {dashboardData && <SalesChartReport data={dashboardData.salesPerMonth}/>}
                    </Card>
                    <Card style={{marginBottom: 20}}>
                        <Typography variant="h5" component="div" style={{marginTop: 10, marginBottom: 20}}><strong>Average Rating</strong></Typography>
                        <Divider />
                        <div style={{width: "100%",display: "flex", justifyContent: "center", alignItems: "center",}}>
                            <ReactStars
                                count={5}
                                value={dashboardData.averageCustomerRating}
                                edit={false}
                                size={60}
                                activeColor="#ffd700"
                            />
                        </div>
                    </Card>
                    <Card style={{marginBottom: 20}}>
                        <Typography variant="h5" component="div" style={{marginTop: 10, marginBottom: 20}}><strong>Recent Orders</strong></Typography>
                        <Divider />
                        <RecentOrdersComponent orders={allOrders} />
                    </Card>
                    <div style={styles.metricView}>
                        {MetricComponent("Gross Profit", `£ ${dashboardData.grossProfit}`)}
                        {MetricComponent("Net Profit", `£ ${dashboardData.netProfit}`)}
                        {MetricComponent("Products Sold", `${dashboardData.ProductsSold}`)}
                        {MetricComponent("Orders Fulfilled", `${dashboardData.ordersFulfilled}`)}
                        {MetricComponent("Orders Cancelled", `${dashboardData.ordersCancelled}`)}
                        {MetricComponent("Finance Applications", `${dashboardData.financeApplications}`)}
                        {MetricComponent("Finance Approvals", `${dashboardData.financeApprovalRate}%`)}
                        {MetricComponent("New Customers", `${dashboardData.newCustomersGained}`)}
                        {MetricComponent("Quartly Profit", `£${dashboardData.quarterProfitChange}`)}
                        {MetricComponent("Refunds Processed", `${dashboardData.refundsProcessed}%`)}
                    </div>
                </div>}
            </div>

        </div>
    );
}

