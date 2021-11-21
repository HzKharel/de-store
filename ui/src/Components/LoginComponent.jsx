import * as React from 'react';
import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    createStyles,
    Divider,
    Input, Link, Snackbar,
    TextField,
    Typography
} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';
import {useState} from "react";
import ky from "ky";
import {useStoreActions} from "easy-peasy";

export function LoginComponent() {
    const [loginData, setLoginData] = useState({email: '', password: ''})
    const [modalData, setModalData] = useState({open: false, message: '', severity: ''});
    const setStoreToken = useStoreActions(a => a.updateToken);
    const setStoreEmployeeData = useStoreActions(a => a.setEmployeeData);
    React.useEffect(() => {
        console.log(process.env);
    }, [])

    const styles = createStyles({
        card: {
            display: "flex",
            width: 500,
            height: 300,
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: "center",
            flexDirection: "column"

        }
    })

    const loginUser = async () => {
        try {
            let res = await ky.post('http://localhost:3010/auth/login', {json: loginData}).json();
            setModalData({message: 'Login Successful', severity: 'success', open: true});
            setStoreToken(res.token);
            setStoreEmployeeData(res.userData);
        } catch (e) {
            let msg = await e.response.json();
            setModalData({message: msg.message, severity: 'error', open: true})


        }


    }
    return (
        <Card style={styles.card}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Login
                </Typography>
                <Divider/>
            </CardContent>

            <div style={{display: "flex", justifyContent: "space-evenly", flexDirection: "column", flex: 1}}>
                <TextField id="outlined-basic" label="Email" type="email" variant="outlined"
                           onChange={(e) => setLoginData({
                               ...loginData, email: e.target.value
                           })}/>
                <TextField id="outlined-basic" label="Password" type="password" variant="outlined"
                           onChange={(e) => setLoginData({
                               ...loginData, password: e.target.value
                           })}/>
            </div>

            <CardActions>
                <Button variant="contained" onClick={() => loginUser()}>Submit</Button>
                <Button component={RouterLink} to='/register'>Register</Button>
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

