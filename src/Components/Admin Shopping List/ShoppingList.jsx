import { useEffect, useState } from "react";

function ShoppingList()
{
const [products,setProducts]=useState([]);
const [ShoppingListCount,setShoppingListCount]=useState();


const GetShoppingListCount=()=>{
    fetch("http://localhost:5066/api/PaymentRest/GetShoppingListCount")
    .then((res)=>{
if(res.ok)
{
    return res.json();
}
else{
    return null
}

    })
    .then((data)=>setShoppingListCount(data))
}





const GetUserPaymentData=()=>{
    fetch('http://localhost:5066/api/PaymentRest/GetUserPaymentData')
    .then((res)=>{
if(res.ok)
{
    return res.json();
}
else{
    return null;
}

    })
    .then((data)=>setProducts(data))
}

useEffect(()=>{
    GetShoppingListCount();
    GetUserPaymentData();
},[])

    return<div className="pb-5">

<h2 className="pb-5 text-center">User Shopping List Count : {ShoppingListCount}</h2>


    <table className=" table text-center mt-5 "  >
  <thead >
  
        <tr>
          <th>User Name</th>
          <th>User Surname</th>
          <th>Product Name</th>
          <th>Product Image Url</th>
          <th>Quantity</th>
          <th >Payment Date</th>
        </tr>
      </thead>
  
  <tbody >
    
 {      products? products.map((pro)=>(
        
        <tr key={pro.cart_ID} >
           <td style={{width:"15%"}}>{pro.user_Name}</td>
           <td style={{width:"15%"}}>{pro.user_Surname}</td>
           <td style={{width:"15%"}}>{pro.product_Name}</td>
            <td style={{width:"20%"}}><img src={pro.product_ImageUrl} style={{width:"50%",height:"90px"}}></img></td>
           <td style={{width:"10%"}}>{pro.quantity}</td>
           <td style={{width:"20%"}}>{pro.payment_Date.replace("T", " / ")}</td>
           <td >  
               
           
          </td>
    
       </tr>
   
   
   ))
   :null
   }


  </tbody>
  </table>
  

  
  </div>


}
export default ShoppingList;