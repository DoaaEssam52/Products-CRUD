/*Getting inputs values*/
var productName=document.getElementById("name");
var productCategory=document.getElementById("category");
var productPrice=document.getElementById("price");
var productDesc=document.getElementById("desc");
var radioButtons=document.getElementsByName("Sale");
var productImage=document.getElementById("imagee");
/* */
/*Validation*/
var nameValid=false;
var nameValidShow=document.getElementById("nameValidation");
var categoryValid=false;
var categoryValidShow=document.getElementById("categoryValidation");
var priceValid=false;
var priceValidShow=document.getElementById("priceValidation");
var descValid=false;
var descValidShow=document.getElementById("descValidation");
/*Initially*/
productName.value="";
productCategory.value="";
productPrice.value="";
productDesc.value="";
nameValidShow.style.opacity=0;
categoryValidShow.style.opacity=0;
priceValidShow.style.opacity=0;
descValidShow.style.opacity=0;
/**/
/*HTML container to show products */
var productsShow=document.getElementById("productsShow");
/**/
/* first time to open site*/
if (localStorage.getItem("products") == null || (JSON.parse(localStorage.getItem("products")).length) == 0 ) 
{  
    /*Array of products*/
    var productsContainer=[];   
}
/* not first time to open site*/
else
{
    productsContainer=JSON.parse(localStorage.getItem("products"));
    displayProducts();
}

/* */
/*Input validation*/

productDesc.addEventListener("keyup",function()
{
    var regEx = /^[a-zA-z].{1,100}$/;
    var descP=productDesc.value;
    if(descP=="")
    {
        descValidShow.style.opacity="0";   
        descValid=false;
    }
    else if((regEx.test(descP)==true))
    {
        descValidShow.style.opacity="0";
        descValid=true;
    }
    else{
        descValidShow.style.opacity=1;
        descValid=false;
        }});
productPrice.addEventListener("keyup",function()
{
    var regEx = /^[1-9][0-9]{0,7}$/;
    var priceP=productPrice.value;
    if(priceP=="")
    {
        priceValidShow.style.opacity="0";   
        priceValid=false;
    }
    else if((regEx.test(priceP)==true))
    {
        priceValidShow.style.opacity="0";
        priceValid=true;
    }
    else{
        priceValidShow.style.opacity=1;
        priceValid=false;
        }});

productName.addEventListener("keyup",function()
{
    var regEx = /^[a-zA-Z].{2,19}$/;
    var nameP=productName.value;
    if(nameP=="")
    {
        nameValidShow.style.opacity="0";   
        nameValid=false;
    }
    else if((regEx.test(nameP)==true))
    {
        nameValidShow.style.opacity="0";
        nameValid=true;
    }
    else{
        nameValidShow.style.opacity=1;
        nameValid=false;
        }});
productCategory.addEventListener("keyup",function()
{
    var regEx = /^[a-zA-Z]{3,8}$/;
    var categoryP=productCategory.value;
    if(categoryP=="")
    {
        categoryValidShow.style.opacity="0";
        categoryValid=false;
    }
    else if(regEx.test(categoryP)==true)
    {
       categoryValidShow.style.opacity="0";
       categoryValid=true;
    }
    else{
        categoryValidShow.style.opacity=1;
        categoryValid=false;
        }
}
);
/**/ 

/*Add New product*/
function addProduct()
{
let allValid=false;
var sale;
if(radioButtons[0].checked==true)
{
    sale=true;
}
else if(radioButtons[1].checked==true)
{
    sale=false;
}
/*Adjust Image */
var fullImg=productImage.value;
var pImgSrc=(fullImg).slice(fullImg.lastIndexOf(`\\`)+1,(fullImg).length);
/**/
/*Create product object*/
var productItem =
{
    pName:productName.value,
    pCategory:productCategory.value,
    pPrice:productPrice.value,
    pDesc:productDesc.value,
    pSale:sale,
    pImage:pImgSrc
};
/*Validation by regular expressions*/
/**/
 if((nameValid==true)&&(categoryValid==true)&&(descValid==true)&&(priceValid==true))
{
    allValid=true;
    productsContainer.push(productItem);
    localStorage.setItem("products",JSON.stringify(productsContainer));
}
/*Adding new product to productsContainer*/
else
{
        window.alert("Invalid Data");
}
/**/
/*Make inputs empty again*/
if(allValid==true)
{
    nameValidShow.style.opacity=0;
    categoryValidShow.style.opacity=0;
    priceValidShow.style.opacity=0;
    descValidShow.style.opacity=0;
    productName.value="";
    productCategory.value="";
    productPrice.value="";
    productDesc.value="";
    productImage.value="";
}
//productImage.value="";
/**/
displayProducts();
}
/*Display products*/
function displayProducts()
{
    var temp="";
    for(var i=0;i<productsContainer.length;i++)
    {
        temp+=`<div class="Item col-md-6 col-lg-4 mb-3">
                    <div class="card mt-3">
                    <span class="price rounded-pill bg-success text-white py-1">`+productsContainer[i].pPrice+`</span>`;
                    if(productsContainer[i].pSale==true)
                    {
                        temp+=`<span class="sale rounded bg-danger py-1">Sale</span>`
                    }
                     temp+=`<img class="card-img-top"src="`+productsContainer[i].pImage+`"alt="Card image cap">
                        <div class="card-body bg-light pb-4">
                        <div class="card-title d-flex justify-content-between"><h4>`+productsContainer[i].pName+`</h4><span class="border rounded-pill px-2 pt-1 bg-secondary">`+productsContainer[i].pCategory+`</span></div>
                        <div class="card-text"><p>`+productsContainer[i].pDesc+`</p>
                        <div class="d-flex justify-content-between mt-4">
                        <button class="btn btn-info"onclick="updateProduct(`+i+`)">Update</button>
                        <button class="btn btn-info"onclick="deleteProduct(`+i+`)">Delete</button>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>`;  
    }
    productsShow.innerHTML=temp;
}
/**/
/*Delete product*/
function deleteProduct(deleteIndex)
{
    productsContainer.splice(deleteIndex,1);
    localStorage.setItem("products",JSON.stringify(productsContainer));
    displayProducts();
}
/**/
/*Update product*/
function updateProduct(updateIndex)
{
    if((productName.value!="")&&(nameValid==true))
    {
        productsContainer[updateIndex].pName=productName.value;
    }
    if((productDesc.value!="")&&(descValid==true))
    {
        productsContainer[updateIndex].pDesc=productDesc.value;
    }
    if((productCategory.value!="")&&(categoryValid==true))
    {
        productsContainer[updateIndex].pCategory=productCategory.value;
    }
    if((productPrice.value!="")&&(priceValid==true))
    {
        productsContainer[updateIndex].pPrice=productPrice.value;
    }
    localStorage.setItem("products",JSON.stringify(productsContainer));
    nameValidShow.style.opacity=0;
    categoryValidShow.style.opacity=0;
    priceValidShow.style.opacity=0;
    descValidShow.style.opacity=0;
    /*Make inputs empty again*/
    productImage.value="";
    productName.value="";
    productCategory.value="";
    productPrice.value="";
    productDesc.value="";
    /* */
    displayProducts();
}
/**/
/*Search products by name*/
function searchProduct(searchedP)
{   var temporary="";
    for(var j = 0;j<productsContainer.length;j++)
    {
        var pnameLower=(productsContainer[j].pName).toLowerCase();
        var searchLower=searchedP.value.toLowerCase();
       // window.alert(j);
        if(searchedP.value=="")
        {
            displayProducts();
        }
        else if(pnameLower.includes(searchLower)&&(searchedP.value!=""))
        {
            temporary+=`<div class="Item col-md-4 mb-3">
            <div class="card">
            <span class="price rounded-pill bg-light py-1">`+productsContainer[j].pPrice+`</span>`;
            if(productsContainer[j].pSale==true)
            {
                temporary+=`<span class="sale rounded bg-danger py-1">Sale</span>`
            }
            temporary+=`<img class="card-img-top"src="`+productsContainer[j].pImage+`"alt="Card image cap">
                <div class="card-body">
                <div class="card-title d-flex justify-content-between"><h4>`+productsContainer[j].pName+`</h4><span class="badge badge-info">`+productsContainer[j].pCategory+`</span></div>
                <div class="card-text"><p>`+productsContainer[j].pDesc+`</p>
                <div class="d-flex justify-content-between">
                <button class="btn btn-info"onclick="deleteProduct(`+j+`)">Delete</button>
                <button class="btn btn-info"onclick="updateProduct(`+j+`)">Update</button>
                </div>
                </div>
                </div>
            </div>
        </div>`;  
        productsShow.innerHTML=temporary;
        }


    }
}
/* */