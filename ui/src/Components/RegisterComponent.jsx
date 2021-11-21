import * as React from 'react';
import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    createStyles,
    Divider,
    Input, Snackbar,
    TextField,
    Typography
} from "@mui/material";
import {Title} from "@mui/icons-material";
import {Link as RouterLink} from "react-router-dom";
import {useState} from "react";
import ky from "ky";

export function RegisterComponent() {

    const [userReg, setUserReg] = useState({email: '', password: '', verifyPassword: '', firstName: '', lastName: ''})
    const [modalData, setModalData] = useState({open: false, message: '', severity: ''});
    const styles = createStyles({
        card: {
            display: "flex",
            width: 500,
            height: 400,
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: "center",
            flexDirection: "column"

        }
    });

    const handleChange = (e) => {
        setUserReg({...userReg, [e.target.id]: e.target.value})
    }
    const submit = async () => {
        try {
            let res = await ky.post('http://localhost:3010/auth/register', {json: userReg}).json();
            setModalData({message: res.message, severity: 'success', open: true});
        } catch (e) {
            let msg = await e.response.json();
            setModalData({message: msg.message, severity: 'error', open: true})


        }
    }
    return (
        <Card style={styles.card}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Register
                </Typography>
                <Divider/>
            </CardContent>

            <div style={{display: "flex", justifyContent: "space-evenly", flexDirection: "column", flex: 1}}>
                <div style={{display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
                    <TextField id="firstName" onChange={handleChange} label="First Name" variant="outlined" style={{width: "48%"}}/>
                    <TextField id="lastName" onChange={handleChange} label="Last Name" variant="outlined" style={{width: "48%"}}/>
                </div>
                <Divider/>
                <TextField id="email" onChange={handleChange} label="Email" type="email" variant="outlined"/>
                <div style={{display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
                    <TextField id="password" onChange={handleChange} label="Password" type="password" variant="outlined"
                               style={{width: "48%"}}/>
                    <TextField id="verifyPassword" onChange={handleChange} label="Confirm Password" type="password" variant="outlined"
                               style={{width: "48%"}}/>
                </div>
                <Divider/>


            </div>

            <CardActions>
                <Button variant="contained" onClick={submit}>Submit</Button>
                <Button component={RouterLink} to='/login'>Login</Button>
            </CardActions>
            <Snackbar open={modalData.open} severity={modalData.severity}
                      onClose={() => setModalData({...modalData, open: false})}
                      autoHideDuration={6000}>
                <Alert severity={modalData.severity} sx={{ width: '100%' }}>
                    {modalData.message}
                </Alert>
            </Snackbar>
        </Card>
    );
}

