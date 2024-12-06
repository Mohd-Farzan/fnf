import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ProductFilter from "../../componant/shoping-view/filter"
import { Button } from "@/components/ui/button"
import { ArrowUpDownIcon } from "lucide-react"
import { sortOptions } from "@/config"
import ShopingProductTile from "@/componant/shoping-view/product-tile"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { FatchAllFilterProduct, fetchProductDetails } from "@/store/shop/products-slice" 
import { createSearchParams, useSearchParams } from "react-router-dom"
import ProductDetailsDialog from "@/componant/shoping-view/product-details"
import { addToCartItems, fetchCart } from "@/store/shop/cart-slice"
import CartItemsContent from "@/componant/shoping-view/cart-items-content"

 function createSearchParamsHelper(filtersParams){
  const queryParams=[]
  for(const[key,value] of Object.entries(filtersParams)){
    if(Array.isArray(value) && value.length>0){
      const paramsValue=value.join(',')

      queryParams.push(` ${key}=${encodeURIComponent(paramsValue)}`)
    }
  }
  return queryParams.join('&')
 }

function ShopingList() {
  const{user}=useSelector((state)=>state.auth)
  const dispatch=useDispatch();
  const [filters,setFilters]=useState({});
  const[sort,setSort]=useState(null)
  const[searchParams,setSearchParams]=useSearchParams()
  const {productList,productDetails}=useSelector(state=>state.ShopProducts)
  const[openDetailsDialog,setOpenDetailsDialog]=useState(false)
                         
  
  function handleSort(value){
   setSort(value)
  }
  //filtering
  function handleFilter(getSectionId,getCurrentOption){
   let copyFilter={...filters}
   const indexOfcurrentOption=Object.keys(copyFilter).indexOf(getSectionId)
   if(indexOfcurrentOption===-1){
    copyFilter={
      ...copyFilter,
      [getSectionId]:[getCurrentOption]
    }
   }
   else{
    const indexOfcurrentOption=copyFilter[getSectionId].indexOf(getCurrentOption)
    if(indexOfcurrentOption===-1)copyFilter[getSectionId].push(getCurrentOption)
      else copyFilter[getSectionId].splice(indexOfcurrentOption,1)
   }
   setFilters(copyFilter)
   sessionStorage.setItem("filters",JSON.stringify(copyFilter))
  }
  function handleGetProductDetails(getCurrentProductId){
    dispatch(fetchProductDetails(getCurrentProductId))
  }
  function handleAddToCart(productId) {
  if (!user || !user.id) {
    console.error("User is not logged in");
    return;
  }

  dispatch(addToCartItems({userId: user?.id, productId, quantity: 1 }))
    .then((data) => {
      if (data?.payload?.success) {
        console.log(data,'data')
        dispatch(fetchCart(user?.id));
        alert('product added into cart')
       
      } else {
        console.error("Failed to add item to cart");
        alert('faild to add product into cart')
      }
    })
    .catch((error) => {
      console.error("Error adding item to cart:", error);
    });
}

  useEffect(()=>{
    setSort("price-lowtohigh")
    setFilters(JSON.parse(sessionStorage.getItem("filters"))|| {})
  },[])
  useEffect(()=>{
    if(filters && Object.keys(filters).length > 0){
      const createQueryString=createSearchParamsHelper(filters)
      setSearchParams(new URLSearchParams(createQueryString))
    }
  },[filters])

  useEffect(()=>{
    if(filters!==null && sort!==null)
      dispatch(
        FatchAllFilterProduct({filtersParams:filters,sortParams:sort}))
  },[dispatch,filters,sort])
  useEffect(()=>{
    if(productDetails!==null)setOpenDetailsDialog(true)
    },[productDetails])
  //  console.log(cartItem,"productDtails")
  return  <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>
    <ProductFilter filters={filters} handleFilter={handleFilter}/>
    <div className="bg-background w-full rounded-lg shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-extrabold mg-2">All Products</h2>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">{productList.length}</span>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline"size="sm" className='flex items-center gap-1'>
              <ArrowUpDownIcon className="h-4 w-4"/>
              Sort By
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-[200px]'>
            <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
              {
                sortOptions.map(sortItem=><DropdownMenuRadioItem  value={sortItem.id} key={sortItem.id}>{sortItem.lable}</DropdownMenuRadioItem>)
              }
            </DropdownMenuRadioGroup>

          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        
      </div>
      <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {  
          productList && productList.length > 0 ? productList.map(productItem=> <ShopingProductTile handleGetProductDetails={handleGetProductDetails} product={productItem} key={productItem._id} handleAddToCart={handleAddToCart}/>):null
        }
        
      </div>
    </div>
    <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}/>
  </div>
  
}

export default ShopingList 