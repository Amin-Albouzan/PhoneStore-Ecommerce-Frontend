import { useState } from 'react';
import '../LoginComponents/Login.css'
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

function Login()
{

   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('email', JSON.stringify(email)); 
        const data = {
            email: email,
            password: password,
          };

          fetch('http://localhost:5066/api/UserData/LoginTest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.ok) {
            navigate("/Home")
                return null;  // إذا كانت الاستجابة ناجحة، قم بإرجاع البيانات
            } else {

              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid email or password. Please try again",
            });
      return null;
            }
        })
        
        
                


        clearData();
       
        
      };


     
    
      const TestData = () => {
        return  email && password;
      };
    
      const clearData = () => {
        
        setEmail("");
        setPassword("");
       
      };










return<>
<h1 className='text-center  pt-md-2' id='CreateNewAccountH1'>Log in</h1>


 <div className="container" id="container">
  

<form className="row g-5 " onSubmit={handleSubmit} id='formStyle'>


  <div className="col-12">
    <label htmlFor ="inputEmail4" className="form-label">Email</label>
    <input type="email" className="form-control text-center" id="inputEmail4" placeholder='Enter your Email'
    value={email}
    onChange={(e) => {
      setEmail(e.target.value);
    }}
    />
  </div>


  <div className="col-12">
    <label htmlFor ="inputPassword4" className="form-label">Password</label>
    <input type="password" className="form-control text-center" id="inputPassword4" placeholder='Enter your Password'
    value={password}
    onChange={(e) => {
      setPassword(e.target.value);
    }}
    />
  </div>




  <p className='text-center'>dont have Account <Link to={"/CreateAccount"}>Create Account</Link></p>
 
  
  
  
  <div  id='buttonDivStyle'>
    <button type="submit" className="btn btn-outline-dark" id='buttonStyle'disabled={!TestData()} >Sign in</button>
  </div>
</form>

</div>






</>



}
export default Login;