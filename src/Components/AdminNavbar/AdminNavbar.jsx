import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary mb-5"
        fixed="top"
      >
        <div className="container-fluid">
          <Link to={"/Admin/Home"} className="navbar-brand fs-3" href="#">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto fs-5" style={{ width: "1400px" }}>
              <li className="nav-item ms-5 ">
                <Link
                  to={"/Admin/Home"}
                  className="nav-link active"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item ms-5 ">
                <Link to={"/Admin/AddNewProduct"} className="nav-link">
                  Add New Product
                </Link>
              </li>



              <li className="nav-item ms-5 ">
                <Link to={"/Admin/User_Dashboard"} className="nav-link">
                User Dashboard
                </Link>
              </li>

              <li className="nav-item ms-5 ">
                <Link to={"/Admin/Shopping_List"} className="nav-link">
                Shopping List
                </Link>
              </li>






              <li className="nav-item ms-5 ">
                <Link to={"/Admin/Categories_List"} className="nav-link">
                Categories List
                </Link>
              </li>

              
              <li className="nav-item dropdown ms-auto me-5 ">
                <Link
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to={"/"} className="dropdown-item" href="#">
                      User
                    </Link>
                  </li>
                  <li>
                    <Link to={"/Admin"} className="dropdown-item" href="#">
                      Admin{" "}
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default AdminNavbar;
