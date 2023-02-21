export const Supply = (qty, price, minBuying, maxBuying, total, product_id, job_id)=>{
    return{
      qty:qty, 
      price:price, 
      minBuying:minBuying, 
      maxBuying:maxBuying, 
      total:total,
      product_id:product_id, 
      job_id:job_id
    }
}
