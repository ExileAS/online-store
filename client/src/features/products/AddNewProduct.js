import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { generateId, productAdded} from "./productsSlice";
import { useNavigate } from "react-router-dom";
import { selectAllSellers } from "../sellers/sellersSlice";

export const AddNewProduct = () => {
    const [productName, setProductName] = useState('');
    const [description, setdescription] = useState('');
    const [seller, setSeller] = useState('');
    const [price, setPrice] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(selectAllSellers);
    const id = useSelector(state => generateId(state));

    const handleChangeName = (e) => setProductName(e.target.value);
    const handlechangedescription = (e) => setdescription(e.target.value);
    const handleChangeSeller = (e) => setSeller(e.target.value);
    const handleChangePrice = (e) => setPrice(e.target.value);
    

    const canAdd = [productName, description, seller, price].every(Boolean) && price > 0;
    

    const userOptions = users.map(user => (
        <option value={user.name} key={user.id} className="option">{user.name}</option>
    ))

    const handleProductAdded = () => {
        if(canAdd) {
            dispatch(productAdded(productName, Number(price), id, description, seller));
            navigate('/products');
        }
    }
    

    return (
        <form className="add-product-form" onSubmit={(e) => e.preventDefault()}>
            <label>Product name:</label>
            <br />
            <input type="text" value={productName} onChange={handleChangeName} className="name"/>
            <br />
            <label>Price:</label>
            <br />
            <input type="number" value={price} onChange={handleChangePrice} className="price"/>
            <br />
            <label>Product Description:</label>
            <br />
            <textarea className="description" name="description" value={description} onChange={handlechangedescription}></textarea>
            <br />
            <label>Seller Name:</label>
            <br />
            <select onChange={handleChangeSeller} className="select-user">
                <option value=""></option>
                {userOptions}
            </select>
            <br />
            <button className="add-button" type="button" onClick={handleProductAdded}>Add Product</button>
        </form>
    )

}