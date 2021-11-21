import {useStoreActions, useStoreState} from "easy-peasy";
import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    createStyles,
    Divider,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import * as React from "react";
import {useState} from "react";
import ky from "ky";


const styles = createStyles({
    card: {
        display: "flex",
        width: 400,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "column",
        marginTop: 20

    },
    page: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: 'wrap'

    },
    textField: {
        width: "100%",
        marginBottom: 10
    }
})

export function AccountPage() {
    const profileData = useStoreState(s => s.employeeData);
    const logout = useStoreActions(a => a.logOut);
    const token = useStoreState(s => s.token);
    const isManager = useStoreState(s => s.isManager);
    const [modalData, setModalData] = useState({open: false, message: '', severity: ''});
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: 0,
        promotion: '',
        category: '',
        image: '',
        description: '',
        quantityAvailable: 0
    })

    const createNewProduct = async () => {
        try {
            await ky.post('http://localhost:3001/inventory/createNewProduct',
                {json: newProduct, headers: {token: token}})
            setModalData({message: 'Product Created!', severity: 'success', open: true})

        } catch (e) {

            let msg = await e.response.json();
            setModalData({message: msg.message, severity: 'error', open: true})
        }

    }

    const EmployeeInfo = () => {
        return (
            <Card style={{...styles.card, justifyContent: "space-between"}}>
                <div>
                    <Typography variant="h5" component="div">
                        Employee Data
                    </Typography>
                    <Divider/>
                    <Typography variant="p" component="div">
                        {profileData?.firstName} {profileData?.lastName}
                    </Typography>
                    <Typography variant="p" component="div">
                        {profileData?.isManager ? <strong>Store Manager</strong> : <strong>Retail Assistant</strong>}
                    </Typography>

                    {isManager &&  <Button style={{margin: 20}} variant="contained" component={RouterLink} to="/manageProducts">Manage Products</Button>}
                </div>


                <Button style={{margin: 20}} variant="contained" onClick={() => logout()}>Log Out</Button>

            </Card>
        )
    }

    const handleChange = (e) => {
        setNewProduct(prevState => {
            prevState[e.target.id] = e.target.value;
            return prevState
        });
    }


    const NewProductCreate = () => {
        return (
            <Card style={{...styles.card, height: 600, justifyContent: "space-between"}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Create New Product
                    </Typography>
                    <Divider/>
                </CardContent>
                <TextField id="name" label="Product Name" defaultValue={newProduct.name} variant="outlined"
                           onChange={handleChange}/>
                <TextField id="price" label="Product Price" defaultValue={newProduct.price} type='number' variant="outlined"
                           onChange={handleChange}/>
                <TextField id="description" label="Description" defaultValue={newProduct.description} variant="outlined"
                           onChange={handleChange}/>
                <TextField id="image" label="Image" defaultValue={newProduct.image} variant="outlined"
                           onChange={handleChange}/>
                <TextField id="promotion" label="Promotion" defaultValue={newProduct.promotion} variant="outlined"
                           onChange={handleChange}/>
                <TextField id="category" label="Category" defaultValue={newProduct.category} variant="outlined"
                           onChange={handleChange}/>
                <TextField id="quantityAvailable" label="Quantity Available" defaultValue={newProduct.quantityAvailable} type='number' variant="outlined"
                           onChange={handleChange}/>
                <Button variant="contained" style={{marginBottom: 20}} onClick={() => createNewProduct()}>Create
                    Product</Button>
            </Card>
        )
    }
    return (
        <div style={styles.page}>
            {<EmployeeInfo/>}
            {isManager && <NewProductCreate/>}

            <Snackbar open={modalData.open} severity={modalData.severity}
                      onClose={() => setModalData({...modalData, open: false})}
                      autoHideDuration={6000}>
                <Alert severity={modalData.severity} sx={{width: '100%'}}>
                    {modalData.message}
                </Alert>
            </Snackbar>
        </div>


    );
}

