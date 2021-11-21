import {LoginComponent} from "../Components/LoginComponent";
import {createStyles} from "@mui/material";
import {RegisterComponent} from "../Components/RegisterComponent";

export function AuthPage({isLogin}) {
    const styles = createStyles({
        page: {
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            marginTop: 100

        }
    })
    return (
        <div style={styles.page}>
            {isLogin ?<LoginComponent /> : <RegisterComponent /> }
        </div>
    );
}

