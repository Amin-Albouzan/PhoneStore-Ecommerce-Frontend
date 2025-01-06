import { useState } from 'react';
import '../CreateAcountComponents/CreateAcount.css'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function CreateAcount()
{

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");



    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            User_Name: firstName,
            User_Surname: lastName,
            User_Email: email,
            User_Password: password,
            User_PhoneNumber: phone,
            User_Adress: address
          };

            fetch('http://localhost:5066/api/UserData', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)


              })
                .then((response) => response.json())
                .then((data) => {
                    Swal.fire({
                        title: "Sent!",
                        text: "Account created successfully! You can now log in and start using our services",
                        icon: "success"
                      })
                     
                    }
                )
                .catch(() => Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text:"This email address is already registered. Please use a different email address or log in to your account",
                 
                  }));
              



        clearData();
  
        
      };


     
    
      const TestData = () => {
        return firstName && lastName && email && password && phone.length === 11 && address;
      };
    
      const clearData = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setAddress("");
      };










return <div className="container" id="container">
  

<form className="row g-5 " onSubmit={handleSubmit}>
<h1 className='text-center  p-md-4' id='CreateNewAccountH1'>Create New Account</h1>

<div className="col-6">
<label htmlFor ="FirstName" className="form-label">First name</label>
    <input type="text" className="form-control"  aria-label="First name" id='FirstName'  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}/>
  </div>


  <div className="col-6">
  <label htmlFor ="LastName" className="form-label">Last name</label>
    <input type="text" className="form-control"  aria-label="Last name" id='LastName'
    value={lastName}
    onChange={(e) => {
      setLastName(e.target.value);
    }}
    />
  </div>


  <div className="col-6">
    <label htmlFor ="inputEmail4" className="form-label">Email</label>
    <input type="email" className="form-control" id="inputEmail4"
    value={email}
    onChange={(e) => {
      setEmail(e.target.value);
    }}
    />
  </div>


  <div className="col-6">
    <label htmlFor ="inputPassword4" className="form-label">Password</label>
    <input type="password" className="form-control" id="inputPassword4"
    value={password}
    onChange={(e) => {
      setPassword(e.target.value);
    }}
    />
  </div>

  <div className="col-12">
    <label htmlFor ="inputAddress" className="form-label">phone number</label>
    <input type='number' className="form-control" id="inputAddress" 
    value={phone}
    onChange={(e) => {
      setPhone(e.target.value);
    }}
    />
  </div>


  <div className="col-12">
    <label htmlFor ="inputAddress2" className="form-label">Address </label>
    <input type="text" className="form-control" id="inputAddress2" 
    value={address}
    onChange={(e) => {
      setAddress(e.target.value);
    }}
    />
  </div>
 
  
  <div  id='buttonDivStyle'>
    <button type="submit" className="btn btn-outline-dark" id='buttonStyle'disabled={!TestData()} >Sign in</button>
  </div>


  <p className='text-center'> have Account <Link to={"/"}>Login</Link></p>

</form>



</div>










}
export default CreateAcount;