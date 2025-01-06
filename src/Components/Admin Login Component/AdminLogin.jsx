import { useState } from 'react';
import '../LoginComponents/Login.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function AdminLogin()
{

   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password,
          };

          fetch('http://localhost:5066/api/manager/LoginTest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.ok) {
                return response.json();  // إذا كانت الاستجابة ناجحة، قم بإرجاع البيانات
            } else {
                throw new Error("Error"); // إذا كانت الاستجابة فاشلة، يتم رمي الخطأ
            }
        })
        .then((data) => {
            // إذا تم إرجاع البيانات بنجاح
            Swal.fire({
                title: "successful!",
                text: "Login successful! Welcome back",
                icon: "success"
            });
            navigate("Home")
        })
        .catch((error) => {
            // إذا حدث خطأ في الاستجابة أو في أي خطوة أخرى
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid email or password. Please try again",
            });
        });
        
                    
                    
                  
              



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




 
 
  
  
  
  <div  id='buttonDivStyle'>
    <button type="submit" className="btn btn-outline-dark" id='buttonStyle'disabled={!TestData()} >Sign in</button>
  </div>
</form>



</div>






</>



}
export default AdminLogin;