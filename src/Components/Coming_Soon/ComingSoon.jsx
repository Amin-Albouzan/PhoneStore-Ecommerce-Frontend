import { useEffect, useState } from "react"
import '../Coming_Soon/ComingSoon.css'
function ComingSoon()
{
const [category,setCategory]=useState([]);
const [product,setProduct]=useState([]);

const getAllCategory=()=>{
    fetch('https://fakestoreapi.com/products/categories')
    .then(res=>res.json())
    .then((data)=>setCategory(data))
}


const getAllProduct=()=>{
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then((data)=>setProduct(data))
}

const getProductFromCategory=(id)=>{
    fetch(`https://fakestoreapi.com/products/category/${id}`)
    .then(res=>res.json())
    .then((data)=>setProduct(data))
}




useEffect(()=>{
    getAllCategory();
    getAllProduct();
},[])



return  <div className="container">
<div className="row">
<div className="col-4 col-lg-3 mb-5 d-flex justify-content-center" key={"hjhjhj"}>
<button className="btn btn-outline-dark active"  style={{width:"200px"}} onClick={()=>{getAllProduct()}}  >Get All Product</button>
</div>


{ category.map((cat) => (

<div className="col-4 col-lg-2 mb-5" key={cat}>
<button className="btn btn-outline-dark " style={{width:"200px"}} onClick={()=>{getProductFromCategory(cat)}}  >{cat}</button>
</div>

))}

</div>

      <div className="row">
        
        
        
        
        
         { product.map((pro) => (
            
          <div className="col-12 col-md-6 col-lg-4" key={pro.id}>
              <div className="card text-center " id='card1'>
      <img src={pro.image} className="card-img-top m-auto mt-2" alt="..."id='image1'></img>
      <div className="card-body " id='card-body1'>
        <h5 className="card-title ">{ pro.title } </h5>
        <p className="card-text mt-3">{pro.description }  </p>
        <p id='kkkklll1'>price : {pro.price}$</p>
              </div>
    </div> 
          </div>
        ))} 
      </div>
    </div>
}
export default ComingSoon;