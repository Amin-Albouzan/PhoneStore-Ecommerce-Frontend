import { useEffect, useState } from "react";

function UserDashboard()
{
const [products,setProducts]=useState([]);
const [TotalFollowers,setTotalFollowers]=useState({});


const getTotalFollowers=()=>{

    fetch('http://localhost:5066/api/UserData/GetTotalFollowers')
    .then((res)=>{
    if(res.ok)
    {
        return res.json();
    } 
    else{
        return null;
    }
    
    
    })
    .then((data)=>setTotalFollowers(data));
    
    }



const getAllUserData=()=>{

fetch('http://localhost:5066/api/UserData/GetAllUserData')
.then((res)=>{
if(res.ok)
{
    return res.json();
} 
else{
    return null;
}


})
.then((data)=>setProducts(data));

}

useEffect(()=>{
    getTotalFollowers();
    getAllUserData();
    
},[])



    return<div className="pb-5">
<h2 className="text-center pb-5">Total Followers : {TotalFollowers.totalfollowers}</h2>

     <table className=" table text-center  "  >
   <thead >
   
         <tr>
           <th>User ID</th>
           <th>User Name</th>
           <th>User Surname</th>
           <th>User Email</th>
           <th>User Password</th>
           <th >User Phone number</th>
           <th >User Address</th>
         </tr>
       </thead>
   
   <tbody >
     
   {      products? products.map((pro)=>(
       
        <tr key={pro.user_ID} >
           
           <td style={{width:"5%"}}>{pro.user_ID}</td>
           <td style={{width:"10%"}}>{pro.user_Name}</td>
           <td style={{width:"10%"}}>{pro.user_Surname}</td>
           <td style={{width:"25%"}}>{pro.user_Email}</td>
           <td style={{width:"15%"}}>{pro.user_Password}</td>
           <td style={{width:"15%"}}>{pro.user_PhoneNumber}</td>
           <td style={{width:"20%"}}>{pro.user_Adress}</td>
    
       </tr>
   
   
   ))
   :null
   }
  
   </tbody>
   </table>
   

   
   </div>

}
export default UserDashboard;