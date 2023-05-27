import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { productSelected, selectAllProducts } from "./productsSlice";
import TimeAgo from "./TimeAgo";
import SearchBar from "../search/SearchBar";
import { selectAllInCart } from "../shoppingCart/shoppingCartSlice";


export const ProductExcerpt = ({product, count, selected}) => {
    const dispatch = useDispatch();
    const productId = product.id;
    const productInCart = useSelector(selectAllInCart).find(product => productId === product.id);
    const available = (productInCart === undefined || productInCart.onhand > 0);
    return available && (
    <section className="product-card" key={product.id}>
            <Link to={'/products/' + product.id} className="product-name"><h2>{product.name} {count > 1 && <b>x{count}</b>}</h2></Link>
            <p>description: {product.description.substring(0,40)}</p>
            <b>Price: {product.price}</b>
            <br />
            <span>added by {product.seller ? product.seller : 'unknown'}</span>
            <TimeAgo timestamp={product.date}/>
            <br /> { !selected &&
            <Link to={'/products/' + product.id}><button className="add-button" 
            onClick={() => dispatch(productSelected({productId:product.id}))}>Select</button></Link>
                }
            <br />
            {!productInCart ? !selected &&
            <b>on hand quantity: {product.onhand}</b> : <b>on hand quantity: {productInCart.onhand}</b>}
        </section>
    )
}



export const ProductsList = () => {
    const products = useSelector(selectAllProducts)  
    const content = products.map(product => (
        <ProductExcerpt product={product} key={product.id} selected={false}/>
    ))


    return (
        <div className="container">
            <Link to='/products/addProduct'><button className="add-button-main">Add Product</button></Link>
            <h3 className="main-page-title">Products List</h3>
            <SearchBar data={products} />
            <br />
            <h2 className="all-products">All products:</h2>
            {content}
        </div>
    )

}

  