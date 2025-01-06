import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
function AddNewProduct()
{
const [Name,setName]=useState('');
const [description,setDescription]=useState('');
const [price,setPrice]=useState('');
const [category,setCategory]=useState('');
const [image,setImage]=useState('');
const [AllCategory,setAllCategory]=useState([]);


const ClearData=function()
{
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setImage("");
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

fetch('http://localhost:5283/api/Product', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // البيانات المرسلة إلى الخادم
})
.then((res) => {
    if (res.ok) {
        // الحالة 204 (نجاح دون إرجاع بيانات)
        return null;
    } else if (res.status === 400) {
        // الحالة 400 (المنتج موجود بالفعل)
        throw new Error('Product already exists');
    } else {
        // لأي حالة غير متوقعة
        throw new Error('Unexpected error occurred');
    }
})
.then(() => {
    
    // نجاح: المنتج تم إضافته
    Swal.fire({
        title: 'Success',
        text: 'Product added successfully!',
        icon: 'success',
    });
})
.catch((error) => {
    // معالجة الأخطاء بناءً على الحالة
    if (error.message === 'Product already exists') {
        Swal.fire({
            title: 'Error',
            text: 'This product already exists. Please use a different ID.',
            icon: 'error',
        });
    } else {
        Swal.fire({
            title: 'Error',
            text: 'An unexpected error occurred while adding the product.',
            icon: 'error',
        });
    }
});
 
{/* <input type="number" className="form-control "
id="product-category" aria-describedby="product category"
 placeholder="product category" onChange={(e)=>setCategory(e.target.value)} value={category} required/>
 */}

ClearData();
// Navigate("/Admin/Home");
    }

const testData=function()
{
return Name && description && category && price  && image
}

const categoryData=()=>
{
    fetch("http://localhost:5283/api/Category")
    .then((res)=>res.json())
    .then((data)=>setAllCategory(data))
}

useEffect(()=>{
    categoryData();
},[])

return<>
<div className="container" style={{width:"90%"}}>
<h1 className="text-center">Add New Product</h1>
<form onSubmit={formSubmit}>




  <div className="mb-3 mt-5">
    <label htmlFor="exampleInputEmail1" className="form-label"> Name</label>
    <input type="text" className="form-control " id="product-Title"
     aria-describedby="product title" placeholder="product Name"
     onChange={(e)=>setName(e.target.value)} value={Name} required/>
  </div>



  <div className="mb-3 mt-5">
    <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
    <input type="text" className="form-control " id="product-Description"
     aria-describedby="product Description" placeholder="product Description"
     onChange={(e)=>setDescription(e.target.value)} value={description} required/>
  </div>



   <div className="mb-3 mt-5">
    <label htmlFor="exampleInputEmail1" className="form-label">Price</label>
    <input type="number"  className="form-control "
     id="product-Price" aria-describedby="product Price"
      placeholder="product Price" onChange={(e)=>setPrice(e.target.value)} value={price} required/>
  </div>


  <div className="mb-3 mt-5">
    <label htmlFor="Category" className="form-label me-5">Category : </label>
    <select id="Category" style={{width:"200px",textAlign:"center",fontSize:"17px",backgroundColor:"white"}}>
        {
        AllCategory.map((cat)=>(
            <option key={cat.category_ID} onClick={()=>{setCategory(cat.category_ID)}} value={cat.category_ID}>{cat.category_Name}</option>
        ))
            
        }

  
</select>
  </div>


  <div className="mb-3 mt-5">
    <label htmlFor="exampleInputEmail1" className="form-label">Image </label>
    <input type="text" className="form-control "
     id="product-Image " aria-describedby="product Image "
      placeholder="product Image url" onChange={(e)=>setImage(e.target.value)} value={image} required/>
  </div>




 <div style={{width:"100%",textAlign:"center",marginTop:"50px",marginBottom:"50px"}}>
  <button type="submit" className="btn btn-outline-success  " disabled={!testData()}>Add Product</button>
  </div>
</form>
</div>




</>


}
export default AddNewProduct;