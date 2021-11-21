import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useState} from "react";
import {TextField} from "@mui/material";
import ky from "ky";
import {useStoreActions, useStoreState} from "easy-peasy";

export function ProductComponent({product, adminMode = false}) {
    const [productUpdate, setProductUpdate] = useState(JSON.parse(JSON.stringify(product)));
    const getProducts = useStoreActions(actions => actions.getProducts);
    const addProductToCart = useStoreActions(actions => actions.addProductToCart);
    const token = useStoreState(s => s.token);
    const [qty, setQty] = useState(1);
    const [edit, setEdit] = useState(false);
    const handleChange = (event) => {
        setProductUpdate(prevState => {
            prevState[event.target.id] = event.target.value;
            return prevState
        })
    }

    const addToCart = () => {
        addProductToCart({...product, quantity: parseInt(qty)})
    }

    const saveProduct = async () => {
        await ky.put('http://localhost:3001/inventory/updateProduct', {json: productUpdate, headers: {token: token}})
        getProducts(token);
        setEdit(!edit);
    }
    const EditView = () => {
        return (
            <Card sx={{
                width: 320,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 600,
                padding: 2
            }}>
                <TextField id="name" label="Product Name" variant="outlined" defaultValue={productUpdate.name}
                           onChange={handleChange}/>
                <TextField id="price" label="Product Price" type='number' variant="outlined"
                           defaultValue={productUpdate.price} onChange={handleChange}/>
                <TextField id="description" label="Description" variant="outlined"
                           defaultValue={productUpdate.description} onChange={handleChange}/>
                <TextField id="image" label="Image" variant="outlined"
                           defaultValue={productUpdate.image} onChange={handleChange}/>
                <TextField id="promotion" label="Promotion" variant="outlined"
                           defaultValue={productUpdate.promotion} onChange={handleChange}/>
                <TextField id="category" label="Category" variant="outlined"
                           defaultValue={productUpdate.category} onChange={handleChange}/>
                <TextField id="quantityAvailable" label="Quantity Available" type='number' variant="outlined"
                           defaultValue={productUpdate.quantityAvailable} onChange={handleChange}/>

                <CardActions>
                    {adminMode && <Button size="small" onClick={() => setEdit(!edit)}>Close Edit</Button>}
                    {adminMode && <Button size="small" onClick={() => saveProduct()}>Save Product</Button>}
                </CardActions>
            </Card>
        )
    }

    const ProductView = () => {
        return (
            <Card sx={{maxWidth: 320}}>
                <div style={{height: 40}}>
                    {product.promotion.trim().length > 0 &&
                    <Typography style={{backgroundColor: "red", padding: 10, color: "white"}} variant="body2"
                                color="text.secondary">
                        {product.promotion}
                    </Typography>}
                </div>
                <CardMedia
                    component="img"
                    height="300"
                    width="300"
                    image={product.image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        £{product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    {!adminMode && <div style={{display: "flex", flexDirection: "row"}}>
                        <TextField style={{flex: 2}} id="quantity" label="Quantity" type='number' variant="outlined"
                                   defaultValue={qty}
                                   onChange={(e) => setQty(e.target.value)}/>
                        <Button style={{flex: 4}} size="small" onClick={() => addToCart()}>Add to Cart</Button>
                    </div>}
                    {adminMode && <Button size="small" onClick={() => {
                        setEdit(!edit)
                    }}>Edit</Button>}
                </CardActions>
            </Card>
        );
    }

    return edit ? <EditView/> : <ProductView/>

}

