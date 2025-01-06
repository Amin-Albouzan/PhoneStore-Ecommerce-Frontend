import { Link } from "react-router-dom";

function LoginNavbar()
{



return<>

<nav className="navbar navbar-expand-lg bg-body-tertiary " fixed='top'>
  <div className="container-fluid">
    <Link to={"/"}  className="navbar-brand fs-2" href="#">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent" >
   
      

      <ul className="navbar-nav ms-auto fs-4" >


      <li className="nav-item dropdown me-5 ">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><Link to={"/"} className="dropdown-item" href="#">User</Link></li>
            <li><Link to={"/Admin"} className="dropdown-item" href="#">Admin </Link></li>
            
          </ul>
        </li>

      </ul>


    </div>
  </div>
</nav>



</>


}


export default LoginNavbar;