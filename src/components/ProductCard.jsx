import { Link } from "react-router-dom"

export default function ProductCard({ product }) {
    return (
        <div className="card" style={{ width: "18rem", marginBottom: '20px', width: '30%' }}>
            <Link to={`/productDetails/${product.id}`}>
                <img src={product.images} class="card-img-top" alt="image" />
            </Link>
            <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                    <div>
                        {`Price: ${product.price} $`}
                    </div>
                    <div>
                        {`Category: ${product.category}`}
                    </div>
                    <div>
                        {`Rating: ${product.rating}`}
                    </div>
                </div>
                <Link to={`/productDetails/${product.id}`} className="btn btn-primary">
                    Details
                </Link>
            </div>
        </div>
    )
}