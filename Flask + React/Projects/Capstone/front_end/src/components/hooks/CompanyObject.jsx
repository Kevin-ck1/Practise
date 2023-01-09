
export const Company = (nameC, address, email, contact, county=47, zone=1, location)=>{
    return{
      nameC:nameC, 
      address:address, 
      email:email, 
      contact:contact, 
      county:county,
      zone:zone, 
      location:location
    }
}



// //The below code is the long version of the above code


// const CompanyObject = () => {
//     const Company = (nameC, address, email, contact, county=47, zone=1, location)=>{
//         return{
//           nameC:nameC, 
//           address:address, 
//           email:email, 
//           contact:contact, 
//           county:county,
//           zone:zone, 
//           location:location
//         }
//     }

//     return Company()
// }

// export default CompanyObject