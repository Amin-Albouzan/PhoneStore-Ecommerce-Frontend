import { useEffect, useState } from "react";

function MyShopping_List()
{

const [products,setProducts]=useState([])

const getShoppingList=()=>{

    const userEmailFromLocalStorage = JSON.parse(localStorage.getItem('email'));
      const data={
        email:userEmailFromLocalStorage
      }
        fetch('http://localhost:5066/api/Cart/getShoppingList', {
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
    getShoppingList();
},[])



return<div>
   

      <table className=" table text-center  "  >
    <thead >
    
          <tr>
            <th>Product_Name</th>
            <th>Product_Discription</th>
            <th>Product_Price</th>
            <th>Quantity</th>
            <th>Product_Image</th>
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
        </tr>
    
    
    ))
    :null
    }
   
    </tbody>
    </table>
    
    
    </div>



}
export default MyShopping_List;