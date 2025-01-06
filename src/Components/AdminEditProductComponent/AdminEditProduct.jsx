import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2'
function AdminEditProduct()
{
const [Name,setName]=useState('');
const [description,setDescription]=useState('');
const [price,setPrice]=useState('');
const [category,setCategory]=useState('');
const [image,setImage]=useState('');
const [AllCategory,setAllCategory]=useState([]);
const {params}=useParams();


const ClearData=function()
{
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setImage('');
}

const categoryData=()=>
    {
        fetch("http://localhost:5283/api/Category")
        .then((res)=>res.json())
        .then((data)=>setAllCategory(data))
    }


const formSubmit=(e)=>
    {
const data={
    Product_Name:Name,
    Product_Price:price,
    Product_Discription:description,
    Product_ImageUrl:image,
    Category_Id:category


}



e.preventDefault();

fetch(`http://localhost:5283/api/Product/${params}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // البيانات المرسلة إلى الخادم
})
.then((res) =>{
    if(res.ok)
    {
        return null
    }
})
.then(() => {
    Swal.fire({
        title: 'Success',
        text: 'product updated successfully!',
        icon: 'success',
    });

})

 
   


ClearData();
    }

const testData=function()
{
return Name && description && price && category && image
}


useEffect(()=>{
    categoryData();

fetch(`http://localhost:5283/api/Product/getProductFromProductId/${params}`)
.then((res)=>res.json())
.then((data)=>{
    
    setName(data.product_Name)
    setDescription(data.product_Discription);
    setPrice(data.product_Price);
    setCategory(data.category_Id);
    setImage(data.product_ImageUrl);
})
},[params])



return<>
<div className="container" style={{width:"90%"}}>
<h1 className="text-center">Add New Product</h1>
<form onSubmit={formSubmit}>




  <div className="mb-3 mt-5">
    <label htmlFor="exampleInputEmail1" className="form-label"> Name</label>
    <input type="text" className="form-control " id="product-Title"
     aria-describedby="product title" placeholder="product Name" value={Name}
     onChange={(e)=>setName(e.target.value)} required/>
  </div>



  <div className="mb-3 mt-5">
    <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
    <input type="text" className="form-control " id="product-Description"
     aria-describedby="product Description" placeholder="product Description" value={description}
     onChange={(e)=>setDescription(e.target.value)}  required/>
  </div>



   <div className="mb-3 mt-5">
    <label htmlFor="exampleInputEmail1" className="form-label">Price</label>
    <input type="number"  className="form-control "
     id="product-Price" aria-describedby="product Price" value={price}
      placeholder="product Price" onChange={(e)=>setPrice(e.target.value)}  required/>
  </div>


  <div className="mb-3 mt-5">
  <label htmlFor="Category" className="form-label me-5">Category : </label>
    <select id="Category" style={{width:"200px",textAlign:"center",fontSize:"17px",backgroundColor:"white"}}>
        {
        AllCategory.map((cat)=>(
            <option onClick={()=>{setCategory(cat.category_ID)}} value={cat.category_ID}>{cat.category_Name}</option>
        ))
            
        }

  
</select>

  </div>


  <div className="mb-3 mt-5">
    <label htmlFor="exampleInputEmail1" className="form-label">Image </label>
    <input type="text" className="form-control "
     id="product-Image " aria-describedby="product Image " value={image}
      placeholder="product Image url" onChange={(e)=>setImage(e.target.value)}  required/>
  </div>




 <div style={{width:"100%",textAlign:"center",marginTop:"50px",marginBottom:"50px"}}>
  <button type="submit" className="btn btn-outline-success  " disabled={!testData()}>Add Product</button>
  </div>
</form>
</div>




</>


}
export default AdminEditProduct;

