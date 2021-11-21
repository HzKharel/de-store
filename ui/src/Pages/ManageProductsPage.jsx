import {createStyles} from "@mui/material";
import {ProductComponent} from "../Components/ProductComponent";
import {useStoreState} from "easy-peasy";

export function ManageProductPage() {
    const isManager = useStoreState(s => s.isManager);
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
            {products.map( p => <ProductComponent product={p} adminMode={isManager}/>)}
        </div>
    );
}

