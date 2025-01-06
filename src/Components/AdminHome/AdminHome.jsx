import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

function AdminHome()
{
const [products,setProducts]=useState([]);


const getAllProducts=()=>{
    fetch('http://localhost:5283/api/Product')
    .then((res)=>res.json())
    .then((data)=>setProducts(data))
}



useEffect(()=>{

    getAllProducts();
},[])

const DeleteCard=(pro)=>{
    Swal.fire({
        title: "Are you sure?",
        text: `Do you want to delete ${pro.product_Name}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

  fetch(`http://localhost:5283/api/Product/${pro.product_ID}`,{
        method:"DELETE"
    })
    .then((res) => {
        if (res.status === 204) {
            // إذا كانت الاستجابة 204 (أي الحذف تم بنجاح)
            getAllProducts();  // تحديث المنتجات
        } else {
            console.error("Failed to delete product");
        }
    })
    .catch((err) => {
        console.error("Error deleting product:", err);
    });

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    

}




return  <table className=" table text-center  "  >
<thead >

      <tr>
        <th>ID</th>
        <th>NAME</th>
        <th>DESCRIPTION</th>
        <th>PRICE</th>
        <th>IMAGE</th>
        <th >DELETE / EDIT</th>
      </tr>
    </thead>

<tbody>
{      
products.map((pro)=>(
     <tr key={pro.product_ID} >
        
        <td style={{width:"10%"}}>{pro.product_ID}</td>
        <td style={{width:"15%"}}>{pro.product_Name}</td>
        <td style={{width:"40%"}}>{pro.product_Discription}</td>
        <td style={{width:"10%"}}>{pro.product_Price}$</td>
        <td  style={{width:"8%"}}><img src={pro.product_ImageUrl} style={{width:"100%",height:"90px",backgroundColor:"red"}}></img></td>
        <td >  
            <div className="d-flex justify-content-center">
             <span className="btn btn-danger me-2 " onClick={()=>{DeleteCard(pro)}} >Delete </span>
             <Link  to={`/Admin/EditProduct/${pro.product_ID}`} className="btn btn-primary me-2  " style={{width:"70px"}} >Edit </Link>
            </div>
        
       </td>
 
    </tr>
    

))

}
</tbody>
</table>


}
export default AdminHome;

