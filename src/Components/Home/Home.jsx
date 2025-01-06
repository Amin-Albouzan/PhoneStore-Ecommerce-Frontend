import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../Home/Home.css'
import Swal from "sweetalert2";
function Home()
{
    const [product,setProduct]=useState([]);
    const [category,setCategory]=useState([]);


const getAllProduct=function()
{
fetch("http://localhost:5283/api/Product")
.then((res)=>res.json())
.then((data)=>setProduct(data)
)
}


const getAllCategory=()=>{

    fetch("http://localhost:5283/api/Category")
    .then((res)=>res.json())
    .then((data)=>setCategory(data))
        

}


useEffect(()=>{
getAllProduct();
getAllCategory();
},[])



const getProductFromCategoryId=(id)=>{

  fetch(`http://localhost:5283/api/Product/${id}`)
  .then((res)=>res.json())
  .then((data)=>setProduct(data)
  )

}


const AddProductToCart=(pro)=>{
  const userEmailFromLocalStorage = JSON.parse(localStorage.getItem('email'));
 
  
 const cartData={

productID:pro.product_ID,
Product_Name:pro.product_Name,
Product_Discription:pro.product_Discription,
Product_Price:pro.product_Price,
Product_ImageUrl:pro.product_ImageUrl,
UserEmail:userEmailFromLocalStorage
 }



 fetch('http://localhost:5066/api/Cart', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(cartData)


})
  .then((response) =>{
if(response.ok)
{
  
  Swal.fire({
    title: "success!",
    text: "   The product has been added to your cart successfully!",
    icon: "success"
  })
 
  return null
}

  })
 





}



return (
    <div className="container">
<div className="row">
<div className="col-4 col-lg-2 d-flex justify-content-center mb-5 " key={"GetAllProduct"}>
<button type="submit" className="btn btn-outline-dark active" style={{width:"200px"}} onClick={()=>{getAllProduct()}}>Get All Product</button>
</div>
{ category.map((cat) => (

<div className="col-4 col-lg-2 d-flex justify-content-center mb-5" key={cat.category_ID}>
<button className="btn btn-outline-dark " style={{width:"200px"}} onClick={()=>{getProductFromCategoryId(cat.category_ID)}}  >{cat.category_Name}</button>
</div>

))}

</div>

      <div className="row">
        
        
        
        
        
         { product.map((pro) => (
            
          <div className="col-12 col-md-6 col-lg-4" key={pro.product_ID}>
              <div className="card text-center " id='card'>
      <img src={pro.product_ImageUrl} className="card-img-top m-auto mt-2" alt="..."id='image'></img>
      <div className="card-body " id='card-body'>
        <h5 className="card-title ">{ pro.product_Name } </h5>
        <p className="card-text mt-3">{pro.product_Discription ? pro.product_Discription.slice(0,190) : null} ... </p>
        <p id='kkkklll'>price : {pro.product_Price}$</p>
        <Link id='moreDescription'  className="btn btn-outline-dark" onClick={()=>{AddProductToCart(pro)}}>add to cart</Link>
      </div>
    </div> 
          </div>
        ))} 
      </div>
    </div>
  );
  
























}
export default Home;