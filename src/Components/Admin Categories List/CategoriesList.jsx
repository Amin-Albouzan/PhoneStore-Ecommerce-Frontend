import { useEffect, useState } from "react";

function CategoriesList()
{
const [categories,setCategories]=useState([]);
const [CategoriesListCount,setCategoriesListCount]=useState({});


const GetCategoriesListCount=()=>{
  fetch('http://localhost:5283/api/Category/GetCategoriesListCount')
  .then((res)=>{
  if(res.ok)
  {
      return res.json();
  }
  
  else{
      return null;
  }
  
  })
  .then((data)=>setCategoriesListCount(data))
  }







const GetCategoryView=()=>{
fetch('http://localhost:5283/api/Category/GetCategoryView')
.then((res)=>{
if(res.ok)
{
    return res.json();
}

else{
    return null;
}

})
.then((data)=>setCategories(data))
}

useEffect(()=>{
  GetCategoriesListCount();
GetCategoryView();
},[])



 
return<div className="pb-5">

<h2 className="text-center pb-5">Categories List Count : {CategoriesListCount.categoriescount}</h2>

 <table className=" table text-center mt-5 "  >
<thead >

     <tr>
       <th>category ID</th>
       <th>category Name</th>
      
     </tr>
   </thead>

<tbody >
 
{      categories? categories.map((pro)=>(
   
    <tr key={pro.category_ID} >
       
       <td style={{width:"50%"}}>{pro.category_ID}</td>
       <td style={{width:"50%"}}>{pro.category_Name}</td>

   </tr>


))
:null
}

</tbody>
</table>

</div>



}

export default CategoriesList;