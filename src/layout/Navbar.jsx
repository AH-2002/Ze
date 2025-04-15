import { Link } from "react-router-dom"


export default function Navbar() {
    return (
        <nav style={{ position: 'sticky', top: '0', left: '0', zIndex: 10 }} className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="row collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                    <div className='col-md-1 logo'>
                        <Link className="navbar-brand fw-bolder fs-3" to={'/home'}>
                            Ze
                        </Link>
                    </div>
                    <ul className="col-md-1 navbar-nav mb-lg-0 justify-content-end">
                        <li className="nav-item">
                            <Link className="nav-link active" to={'/home'}>
                                <i className="fa-solid fa-house"></i>
                            </Link>

                        </li>
                    </ul>
                    <form className="d-flex align-items-center col-md-9">
                        <input className="form-control me-3" type="search" placeholder="Search" aria-label="Search" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </form>
                    <div className='col-md-1'>

                        <Link to={'/profile'}>
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    </div>


                </div>
            </div>
        </nav>
    )
}