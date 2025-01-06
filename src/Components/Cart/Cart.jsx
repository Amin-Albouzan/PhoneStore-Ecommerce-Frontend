import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import Payment from "../PaymentComponent/Payment.jsx"
function Cart()
{

    const [products,setProducts]=useState([]);
    const [Product_Count,setProduct_Count]=useState();
    const [Total_Price,setTotal_Price]=useState();

    const getTotalPrice=()=>{
      const userEmailFromLocalStorage = JSON.parse(localStorage.getItem('email'));
      const data={
        email:userEmailFromLocalStorage
      }
        fetch('http://localhost:5066/api/Cart/GetTotalPrice', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      })
.then((res)=>{
if(res.ok)
{
  return res.json();
}
else{
  
  return null;
}

})
.then((data)=>setTotal_Price(data))


    }






    const getProductCount=()=>{
      const userEmailFromLocalStorage = JSON.parse(localStorage.getItem('email'));
      const data={
        email:userEmailFromLocalStorage
      }
        fetch('http://localhost:5066/api/Cart/GetCartSummary', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      })
.then((res)=>{
if(res.ok)
{
  return res.json();
}
else{
  
  return null;
}

})
.then((data)=>setProduct_Count(data))


    }
    
    


    const getAllProducts=()=>{
      const userEmailFromLocalStorage = JSON.parse(localStorage.getItem('email'));
      const data={
        email:userEmailFromLocalStorage
      }
        fetch('http://localhost:5066/api/Cart/getCartFromUserEmail', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      })
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
      getProductCount();
      getTotalPrice();
        getAllProducts();
    },[])
    
    const DeleteCard=(id)=>{
        
            
    
      fetch(`http://localhost:5066/api/Cart/${id}`,{
            method:"DELETE"
        })
        .then((res) =>{
            if(res.ok)
            {
              getProductCount();
              getTotalPrice();
                getAllProducts();
                return null;
            }
        })
       
        };
        
    
    
    
    
    
    
    return<div className="pb-5">
     <div style={{display:"flex",justifyContent:"space-between",width:"90%"}} className="container mb-md-5">
     
     <h3>Product Count :{Product_Count? Product_Count[0].product_count : 0}</h3> 
     <h3>Total Price :{Total_Price? Total_Price[0].total_price : 0} $</h3>
     </div>

      <table className=" table text-center  "  >
    <thead >
    
          <tr>
            <th>Product_Name</th>
            <th>Product_Discription</th>
            <th>Product_Price</th>
            <th>Quantity</th>
            <th>Product_Image</th>
            <th >DELETE</th>
          </tr>
        </thead>
    
    <tbody >
      
    {      products? products.map((pro)=>(
        
         <tr key={pro.cart_ID} >
            
            <td style={{width:"15%"}}>{pro.product_Name}</td>
            <td style={{width:"44%"}}>{pro.product_Discription}</td>
            <td style={{width:"10%"}}>{pro.product_Price}$</td>
            <td style={{width:"10%"}}>{pro.quantity}</td>
            <td style={{width:"8%"}}><img src={pro.product_ImageUrl} style={{width:"100%",height:"90px"}}></img></td>
            <td >  
                <div className="d-flex justify-content-center">
                 <span className="btn btn-danger" onClick={()=>{DeleteCard(pro.cart_ID)}} >Delete </span>
                </div>
            
           </td>
     
        </tr>
    
    
    ))
    :null
    }
   
    </tbody>
    </table>
    
 {products?<Payment/> : null}
    
    </div>
    
    
}








export default Cart;