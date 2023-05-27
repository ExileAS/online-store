import { Link } from "react-router-dom";
import imgSrc from '../components/6011.jpg';

const Navbar = () => {
    return ( 
     <nav>
      <h1  className="page-title"><Link to={'/'} className="page-title">Simple Online Store</Link></h1>
        <section>
        <div className="navContent">
          <div className="navLinks">
            <Link to='/products'>products</Link>
            <Link to='/users'>Users</Link>
            <Link to='/shoppingCart'><img src={imgSrc} alt="" className="img"/></Link>
            <Link to={'/products/ordered'}>Ordered</Link>
          </div>
        </div>
      </section>
    </nav>
    );
}
 
export default Navbar;