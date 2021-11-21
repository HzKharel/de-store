import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter as Router, Redirect} from "react-router-dom";
import {StoreProvider, useStore, useStoreActions, useStoreState} from "easy-peasy";
import {store} from "./store/store";
import {HeaderComponent} from "./Components/HeaderComponent";
import {AuthPage} from "./Pages/AuthPage";
import {ProductsPage} from "./Pages/ProductsPage";
import {InboxPage} from "./Pages/InboxPage";
import { Switch} from "react-router";
import {AuthRoute} from "./Routes/ProtectedRoute";
import {AccountPage} from "./Pages/AccountPage";
import {ManageProductPage} from "./Pages/ManageProductsPage";
import {useEffect} from "react";
import {OrderPage} from "./Pages/OrderPage";
import {DashboardPage} from "./Pages/TrendsPage";


export function App() {
    const token = useStoreState(s => s.token);
    const isManager = useStoreState(s => s.isManager);
    const getProducts = useStoreActions(actions => actions.getProducts);
    useEffect(() => {
        getProducts(token);
    }, [!!token])
    return (
        <div className="App">
            <Router>
                <div>
                    <div style={{height: "7vh"}}>
                        <HeaderComponent/>
                    </div>

                    <div style={{height: "93vh"}}>
                        <Switch>
                            <Route path="/login">
                                {token !== null ?  <Redirect to='/'/> : <AuthPage isLogin={true} />}
                            </Route>
                            <Route path="/register">
                                {token !== null ?   <Redirect to='/'/> : <AuthPage isLogin={false} />}
                            </Route>
                            <Route path="/inbox">
                                {!isManager ?  <Redirect to='/login'/>  :  <InboxPage />}
                            </Route>
                            <Route path="/dashboard">
                                {!isManager ?  <Redirect to='/'/>  :  <DashboardPage />}
                            </Route>
                            <Route path="/account">
                                {token === null ?  <Redirect to='/login'/>  :  <AccountPage />}
                            </Route>
                            <Route path="/manageProducts">
                                {token === null ?  <Redirect to='/login'/>  :  <ManageProductPage />}
                            </Route>
                            <Route path="/cart">
                                {token === null ? <Redirect to='/login'/> :  <OrderPage />}
                            </Route>
                            <Route path="/">
                                {token === null ? <Redirect to='/login'/> :  <ProductsPage />}
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>


        </div>
    );
}


export default App;
