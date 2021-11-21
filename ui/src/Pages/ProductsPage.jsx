import {ProductComponent} from "../Components/ProductComponent";
import {createStyles} from "@mui/material";
import {useStoreState} from "easy-peasy";

export function ProductsPage() {
    const styles = createStyles({
        page: {
            marginTop: 10,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            gridGap: 30
        }
    })

    const products = useStoreState(s => s.products)

    return (
        <div style={styles.page}>
            {products.map( p => <div key={p.productId}> <ProductComponent product={p} /></div>)}
        </div>
    );
}

