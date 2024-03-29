// import { useState, useEffect } from 'react'
// import styles from './styles/Home.module.css'
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import ResultTable from './SearchResult';
// import WishlistTable from './Wishlist';

// import PostalCodeAutocomplete from './AutoComplete';
// //newcommit
// export default function Home() {
//     const [keyword, setKeyword] = useState('');
//     const [category, setCategory] = useState('All Categories');
//     const [condition, setCondition] = useState({ New: false, Used: false, Unspecified: false });
//     const [shippingOption, setShippingOption] = useState({ localPickup: false, freeshipping: false });
//     const [distance, setDistance] = useState('');
//     const [fromOption, setFromOption] = useState(null);
//     const [zipCode, setZipCode] = useState('');
//     const [products, setProducts] = useState([]);


//     // const [isWishlist, setWishlist] = useState(false);
  
//     // const [wishlist_products, setWProducts] = useState([]);
//     // const [loading, setLoading] = useState(true);
//     // const [error, setError] = useState(null);
  
//     // // const { wishlist_products, loading, error } = useFetchProducts('/api/wishlist');
//     const [showTableHeaders, setShowTableHeaders] = useState(false);
//     const [showDetail, setShowDetail] = useState(false);//button detail
//     // const[showSearchTable,setshowSearchTable]=useState(false);
//     const [wishlistItems, setWishlistItems] = useState([]);
//     const [showWishlist, setShowWishlist] = useState(false);
//     const[shippingDetails,setShippingDetails]=useState({});
//     const [seller,setSeller]=useState({})
//     const [sp,setSp]=useState([]);
   
//     const handleWishlistClick = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/getWishlist');
//             setWishlistItems(response.data);
//             setShowWishlist(true); // Show wishlist table
//         } catch (error) {
//             console.error("Error fetching wishlist data:", error);
//         }
//     };
//     const [errors, setErrors] = useState({});

//     const validateForm = () => {
//       let formIsValid = true;
//       let errors = {};
    
//       // Check if the keyword is not empty
//       if (!keyword.trim()) {
//         formIsValid = false;
//         errors['keyword'] = 'Please enter a product name.';
//       }
    
//       // Check if the zip code is not empty and if it is in the correct format
//       const zipCodePattern = /^\d{5}(-\d{4})?$/; // This pattern is for US zip codes
//       if (!zipCode.trim()) {
//         formIsValid = false;
//         errors['zipCode'] = 'Please enter a zip code.';
//       } else if (!zipCodePattern.test(zipCode.trim())) {
//         formIsValid = false;
//         errors['zipCode'] = 'Please enter a valid zip code.';
//       }
    
//       setErrors(errors);
//       return formIsValid;
//     };
  
// //write clear function and it shoudl also 
// const clear = () => {
//   // Reset all state variables
//   setKeyword('');
//   setCategory('All Categories');
//   setCondition({ New: false, Used: false, Unspecified: false });
//   setShippingOption({ localPickup: false, freeshipping: false });
//   setDistance('');
//   setFromOption('');
//   setZipCode('');
//   setProducts([]);
//   setWishlistItems([]); // Only if you want to clear the wishlist items as well
//   setShowTableHeaders(false);
//   setShowDetail(false);
//   setShowWishlist(false);
//   setErrors({}); // Clear any validation errors

//   // If you're using a ref for the form, you might want to reset it as well
//   // formRef.current.reset(); // Assuming you have a ref attached to your form
// };
//     //  


    
//       const handleSearch = async (e) => {
//         // To prevent form submission
//         e.preventDefault();
//         if (validateForm()){
//           const conditions = [];
//           for (let key in condition) {
//             if (condition[key]) {
//               conditions.push(key);
//             }
//           }
//           console.log(conditions);
      
//           const shippingOptions = [];
//           for (let key in shippingOption) {
//             if (shippingOption[key]) {
//               shippingOptions.push(key);
//             }
//           }
      
//           const params = new URLSearchParams({
//             keyword: keyword,
//             category: category,
//             condition: conditions.join(','),
//             ...shippingOptions.reduce((acc, val) => ({ ...acc, [val]: true }), {}),
//             distance: distance,
//             buyerPostalCode: fromOption === 'other' ? zipCode : undefined
//           });
      
//           const url = `http://localhost:8080/search?${params.toString()}`;
//           console.log(url);
      
//           try {
//             const response = await axios.get(url);
//             console.log(response.data);  // Handle response data as needed
//             setShowTableHeaders(true);
  
//             setShowDetail(true);
//             setProducts(response.data.message.items);
//             console.log("GETTING TABLE DATA",(response.data.message.items));
      
//           } catch (error) {
//             console.error("Error fetching data:", error);
//           }
//         }
       
//       }
//       // export const searchresponse = response
     
//       const noRecordsAlert = (
//         <div className="alert alert-warning" role="alert">
//           No records found.
//         </div>
//       );
    
    
    
//       return (
//         <>
    
         
//             {/* <div className={styles.row + " bg-dark text-white p-2 justify-content-center align-items-center search_container"}> */}
//             <div class="container mt-3">
    
//               <div class="row justify-content-center">
//                 <div class="col-md-10 bg-dark text-white">
//                   <div class="col-sm-8 offset-sm-2 ">
//                     <h3 class="mb-4 mt-3">Product Search</h3>
//                   </div>
    
//                   <form>
    
//                     <div class="form-group row justify-content-center">
//                       <label for="keyword" class="col-sm-2 col-form-label">Keyword<span class="text-danger">*</span></label>
//                       <div class="col-sm-6 mb-3">
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="keyword"
//                           placeholder="Enter Product Name(Eg. iPhone 8)"
//                           value={keyword}
//                           onChange={(e) => {
//                             setKeyword(e.target.value);
//                             setErrors({ ...errors, keyword: '' }); // Clear keyword error on change
//                           }}
//                         />
//                         {errors.keyword && <div className="text-danger">{errors.keyword}</div>}
//                       </div>
//                     </div>
    
//                     <div class="form-group row justify-content-center">
//                       <label for="category" class="col-sm-2 col-form-label">Category</label>
//                       <div class="col-sm-6 mb-3">
//                         <select
//                           className="form-control"
//                           id="category"
//                           value={category}
//                           onChange={(e) => setCategory(e.target.value)}
//                         >
//                           <option value="All Categories">All Categories</option>
//                           <option value="Art">Art</option>
//                           <option value="Baby">Baby</option>
//                           <option value="Books">Books</option>
//                           <option value="Clothing">Clothing, Shoes & Accessories</option>
//                           <option value="Computers">Computers/Tablets & Networking</option>
//                           <option value="Music">Music</option>
//                           <option value="Health&Beauty">Health & Beauty</option>
//                           <option value="VideoGames">Vidoe Games & Consoles</option>
//                         </select>
//                       </div>
//                     </div>
    
//                     {/* ... [Continue with the same pattern for other fields] */}
//                     <div class="form-group row justify-content-center">
//                       <label class="col-sm-2">Condition</label>
//                       <div class="col-sm-6 mb-3" >
//                         <div className="form-check form-check-inline">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             id="new"
//                             value="New"
//                             checked={condition.New}
//                             onChange={() => setCondition(prevState => ({ ...prevState, New: !prevState.New }))}
//                           />
//                           <label className="form-check-label" htmlFor="new">New</label>
//                         </div>
//                         <div className="form-check form-check-inline">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             id="used"
//                             value="Used"
//                             checked={condition.Used}
//                             onChange={() => setCondition(prevState => ({ ...prevState, Used: !prevState.Used }))}
//                           />
//                           <label className="form-check-label" htmlFor="used">Used</label>
//                         </div>
//                         <div className="form-check form-check-inline">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             id="unspecified"
//                             value="Unspecified"
//                             checked={condition.Unspecified}
//                             onChange={() => setCondition(prevState => ({ ...prevState, Unspecified: !prevState.Unspecified }))}
//                           />
//                           <label className="form-check-label" htmlFor="unspecified">Unspecified</label>
//                         </div>
//                       </div>
//                     </div>
    
    
//                     {/* Shipping Options */}
//                     <div class="form-group row justify-content-center">
//                       <label class="col-sm-2">Shipping Options</label>
//                       <div class="col-sm-6 mb-3">
//                         <div className="form-check form-check-inline">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             name="shippingOption"
//                             id="localPickup"
//                             value="localPickup"
//                             checked={shippingOption.localPickup}
//                             onChange={() => setShippingOption(prevState => ({ ...prevState, localPickup: !prevState.localPickup }))}
//                           />
//                           <label className="form-check-label" htmlFor="localPickup">Local Pickup</label>
//                         </div>
//                         <div className="form-check form-check-inline">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             name="shippingOption"
//                             id="freeshipping"
//                             value="freeshipping"
//                             checked={shippingOption.freeshipping}
//                             onChange={() => setShippingOption(prevState => ({ ...prevState, freeshipping: !prevState.freeshipping }))}
//                           />
//                           <label className="form-check-label" htmlFor="freeshipping">Free Shipping</label>
//                         </div>
//                       </div>
//                     </div>
    
    
    
//                     <div class="form-group row justify-content-center">
//                       <label for="distance" class="col-sm-2 col-form-label">Distance (Miles)</label>
//                       <div class="col-sm-6 mb-3">
//                         <input
//                           type="number"
//                           className="form-control"
//                           id="distance"
//                           placeholder="10"
//                           value={distance}
//                           onChange={(e) => setDistance(e.target.value)}
//                         />
//                       </div>
//                     </div>
    
//                     <div class="form-group row justify-content-center">
//                       <label class="col-sm-2">From<span class="text-danger">*</span></label>
//                       <div class="col-sm-6">
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="radio"
//                             name="fromOption"
//                             id="currentLocation"
//                             value="currentLocation"
//                             checked={fromOption === 'currentLocation'}
//                             onChange={() => setFromOption('currentLocation')}
//                           />
//                           <label className="form-check-label" for="currentLocation">Current Location</label>
//                         </div>
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="radio"
//                             name="fromOption"
//                             id="other"
//                             value="other"
//                             checked={fromOption === 'other'}
//                             onChange={() => setFromOption('other')}
//                           />
//                           <label className="form-check-label" htmlFor="other">Other. Please specify zip code:</label>
//                           <input
//                             type="text"
//                             className="form-control mt-2 mb-3"
//                             value={zipCode}
//                             onChange={(e) => {
//                               setZipCode(e.target.value);
//                               setErrors({ ...errors, zipCode: '' }); // Clear keyword error on change
//                             }}
//                           />
//                             {errors.zipCode && <div className="text-danger">{errors.zipCode}</div>}
//                           {/* {fromOption === 'other' && (
//           <PostalCodeAutocomplete zipCode={zipCode} setZipCode={setZipCode} /> */}
        
//                         </div>
//                       </div></div>
//                     {/* Conditions */}
    
    
    
    
//                     {/* Buttons */}
//                     <div class="form-group row">
//                       <div class="col-sm-8 offset-sm-2 d-flex justify-content-start">
//                         <button type="submit" className="btn btn-primary me-2 mb-2" onClick={handleSearch}>Search</button>
//                         <button type="reset" className="btn btn-secondary mb-2" onclick={clear}>Clear</button>
//                       </div>
//                     </div>
    
    
//                   </form>
//                 </div>
//               </div>
//             </div>
    
//             {/*resulst and wishlist buttons  */}
//             <div class="text-center mt-4">
//               {/* <button class="btn btn-outline-dark me-2 mr-2" onClick={toggleWishList}>
//                 Results
//               </button> */}
//                <button class="btn btn-outline-dark me-2 mr-2 mb-2" onClick={() => setShowWishlist(false)}>
//                 Results
//               </button>
    
//               {/* <button class="btn btn-outline-dark" onClick={toggleWishList}>
//                 Wish List
//               </button> */}
//               <button class="btn btn-outline-dark mb-2" onClick={handleWishlistClick}>
//                 Wish List
//               </button>
    
//             </div>
//             {/* <div class="col-md-4"></div>
//         <h1>{isWishlist ? 'Results' : 'Wishlist' } </h1> */}
    
        
    
//           {/* <div className="container mt-3">
//             <div class="row mb-3">
//               <div class="col">
//               </div>
//               <div class="col-auto">
//                 {(showDetail && <button class="btn custom-hover">
//                   Detail<i class="fas fa-chevron-right"></i>
//                 </button>)}
//               </div>
//             </div> */}
//     {/* </div> */}
//     {/* get detail button from result table here */}
    
//     {/* {showTableHeaders===true && showDetail === true  && <ResultTable tableData={products}/> } */}
//     {/* {!showWishlist && showTableHeaders && showDetail && <ResultTable tableData={products} />} */}
//     {!showWishlist && showTableHeaders && showDetail && products.length === 0
//       ? noRecordsAlert
//       : <ResultTable tableData={products} />
//     }
// {/* //getdetails={getIdandShipping} */}
//     {showWishlist && <WishlistTable wishlistProducts={wishlistItems} />}
   
    
   
//             </>
//   )
// }

import { useState, useEffect } from 'react'
import styles from './styles/Home.module.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ResultTable from './SearchResult';
import WishlistTable from './Wishlist';

import PostalCodeAutocomplete from './AutoComplete';
//newcommit
export default function Home() {
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('All Categories');
    const [condition, setCondition] = useState({ New: false, Used: false, Unspecified: false });
    const [shippingOption, setShippingOption] = useState({ localPickup: false, freeshipping: false });
    const [distance, setDistance] = useState('');
    const [fromOption, setFromOption] = useState('currentLocation'||'90007');
    const [zipCode, setZipCode] = useState('');
    const [products, setProducts] = useState([]);


    // const [isWishlist, setWishlist] = useState(false);
  
    // const [wishlist_products, setWProducts] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
  
    // // const { wishlist_products, loading, error } = useFetchProducts('/api/wishlist');
    const [showTableHeaders, setShowTableHeaders] = useState(false);
    const [showDetail, setShowDetail] = useState(false);//button detail
    // const[showSearchTable,setshowSearchTable]=useState(false);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [showWishlist, setShowWishlist] = useState(false);
    const[shippingDetails,setShippingDetails]=useState({});
    const [seller,setSeller]=useState({})
    const [sp,setSp]=useState([]);
   
    const handleWishlistClick = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getWishlist');
            setWishlistItems(response.data);
            setShowWishlist(true); // Show wishlist table
        } catch (error) {
            console.error("Error fetching wishlist data:", error);
        }
    };
    const [errors, setErrors] = useState({});

    const validateForm = () => {
      let formIsValid = true;
      let errors = {};
    
      // Check if the keyword is not empty
      if (!keyword.trim()) {
        formIsValid = false;
        errors['keyword'] = 'Please enter a product name.';
      }
    
      // Check if the zip code is not empty and if it is in the correct format
      const zipCodePattern = /^\d{5}(-\d{4})?$/; // This pattern is for US zip codes
      if (!zipCode.trim()) {
        formIsValid = false;
        errors['zipCode'] = 'Please enter a zip code.';
      } else if (!zipCodePattern.test(zipCode.trim())) {
        formIsValid = false;
        errors['zipCode'] = 'Please enter a valid zip code.';
      }
    
      setErrors(errors);
      return formIsValid;
    };
  
//write clear function and it shoudl also 
const clear = () => {
  // Reset all state variables
  setKeyword('');
  setCategory('All Categories');
  setCondition({ New: false, Used: false, Unspecified: false });
  setShippingOption({ localPickup: false, freeshipping: false });
  setDistance('');
  setFromOption('');
  setZipCode('');
  setProducts([]);
  setWishlistItems([]); // Only if you want to clear the wishlist items as well
  setShowTableHeaders(false);
  setShowDetail(false);
  setShowWishlist(false);
  setErrors({}); // Clear any validation errors

  // If you're using a ref for the form, you might want to reset it as well
  // formRef.current.reset(); // Assuming you have a ref attached to your form
};
    //  


    
      const handleSearch = async (e) => {
        // To prevent form submission
        e.preventDefault();
        if (validateForm()){
          const conditions = [];
          for (let key in condition) {
            if (condition[key]) {
              conditions.push(key);
            }
          }
          console.log(conditions);
      
          const shippingOptions = [];
          for (let key in shippingOption) {
            if (shippingOption[key]) {
              shippingOptions.push(key);
            }
          }
      
          const params = new URLSearchParams({
            keyword: keyword,
            category: category,
            condition: conditions.join(','),
            ...shippingOptions.reduce((acc, val) => ({ ...acc, [val]: true }), {}),
            distance: distance,
            buyerPostalCode: fromOption === 'other' ? zipCode : undefined
          });
      
          const url = `http://localhost:8080/search?${params.toString()}`;
          console.log(url);
      
          try {
            const response = await axios.get(url);
            console.log(response.data);  // Handle response data as needed
            setShowTableHeaders(true);
  
            setShowDetail(true);
            setProducts(response.data.message.items);
            console.log("GETTING TABLE DATA",(response.data.message.items));
      
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
       
      }
      // export const searchresponse = response
     
      const noRecordsAlert = (
        <div className="alert alert-warning" role="alert">
          No records found.
        </div>
      );
    
    
    
      return (
        <>
    
         
            {/* <div className={styles.row + " bg-dark text-white p-2 justify-content-center align-items-center search_container"}> */}
            <div class="container mt-3">
    
              <div class="row justify-content-center">
                <div class="col-md-10 bg-dark text-white">
                  <div class="col-sm-8 offset-sm-2 ">
                    <h3 class="mb-4 mt-3">Product Search</h3>
                  </div>
    
                  <form>
    
                    <div class="form-group row justify-content-center">
                      <label for="keyword" class="col-sm-2 col-form-label">Keyword<span class="text-danger">*</span></label>
                      <div class="col-sm-6 mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="keyword"
                          placeholder="Enter Product Name(Eg. iPhone 8)"
                          value={keyword}
                          onChange={(e) => {
                            setKeyword(e.target.value);
                            setErrors({ ...errors, keyword: '' }); // Clear keyword error on change
                          }}
                        />
                        {errors.keyword && <div className="text-danger">{errors.keyword}</div>}
                      </div>
                    </div>
    
                    <div class="form-group row justify-content-center">
                      <label for="category" class="col-sm-2 col-form-label">Category</label>
                      <div class="col-sm-6 mb-3">
                        <select
                          className="form-control"
                          id="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="All Categories">All Categories</option>
                          <option value="Art">Art</option>
                          <option value="Baby">Baby</option>
                          <option value="Books">Books</option>
                          <option value="Clothing">Clothing, Shoes & Accessories</option>
                          <option value="Computers">Computers/Tablets & Networking</option>
                          <option value="Music">Music</option>
                          <option value="Health&Beauty">Health & Beauty</option>
                          <option value="VideoGames">Vidoe Games & Consoles</option>
                        </select>
                      </div>
                    </div>
    
                    {/* ... [Continue with the same pattern for other fields] */}
                    <div class="form-group row justify-content-center">
                      <label class="col-sm-2">Condition</label>
                      <div class="col-sm-6 mb-3" >
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="new"
                            value="New"
                            checked={condition.New}
                            onChange={() => setCondition(prevState => ({ ...prevState, New: !prevState.New }))}
                          />
                          <label className="form-check-label" htmlFor="new">New</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="used"
                            value="Used"
                            checked={condition.Used}
                            onChange={() => setCondition(prevState => ({ ...prevState, Used: !prevState.Used }))}
                          />
                          <label className="form-check-label" htmlFor="used">Used</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="unspecified"
                            value="Unspecified"
                            checked={condition.Unspecified}
                            onChange={() => setCondition(prevState => ({ ...prevState, Unspecified: !prevState.Unspecified }))}
                          />
                          <label className="form-check-label" htmlFor="unspecified">Unspecified</label>
                        </div>
                      </div>
                    </div>
    
    
                    {/* Shipping Options */}
                    <div class="form-group row justify-content-center">
                      <label class="col-sm-2">Shipping Options</label>
                      <div class="col-sm-6 mb-3">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="shippingOption"
                            id="localPickup"
                            value="localPickup"
                            checked={shippingOption.localPickup}
                            onChange={() => setShippingOption(prevState => ({ ...prevState, localPickup: !prevState.localPickup }))}
                          />
                          <label className="form-check-label" htmlFor="localPickup">Local Pickup</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="shippingOption"
                            id="freeshipping"
                            value="freeshipping"
                            checked={shippingOption.freeshipping}
                            onChange={() => setShippingOption(prevState => ({ ...prevState, freeshipping: !prevState.freeshipping }))}
                          />
                          <label className="form-check-label" htmlFor="freeshipping">Free Shipping</label>
                        </div>
                      </div>
                    </div>
    
    
    
                    <div class="form-group row justify-content-center">
                      <label for="distance" class="col-sm-2 col-form-label">Distance (Miles)</label>
                      <div class="col-sm-6 mb-3">
                        <input
                          type="number"
                          className="form-control"
                          id="distance"
                          placeholder="10"
                          value={distance}
                          onChange={(e) => setDistance(e.target.value)}
                        />
                      </div>
                    </div>
    
                    <div class="form-group row justify-content-center">
                      <label class="col-sm-2">From<span class="text-danger">*</span></label>
                      <div class="col-sm-6">
                        <div className="form-check">
                          {/* <input
                            className="form-check-input"
                            type="radio"
                            name="fromOption"
                            id="currentLocation"
                            value="currentLocation"
                            checked={fromOption === 'currentLocation'}
                            onChange={() => setFromOption('currentLocation')}
                          />
                          <label className="form-check-label" for="currentLocation">Current Location</label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="fromOption"
                            id="other"
                            value="other"
                            checked={fromOption === 'other'}
                            onChange={() => setFromOption('other')}
                          />
                          <label className="form-check-label" htmlFor="other">Other. Please specify zip code:</label>
                          <input
                            type="text"
                            className="form-control mt-2 mb-3"
                            value={zipCode}
                            onChange={(e) => {
                              setZipCode(e.target.value);
                              setErrors({ ...errors, zipCode: '' }); // Clear keyword error on change
                            }}
                          />
                            {errors.zipCode && <div className="text-danger">{errors.zipCode}</div>}
                          {/* {fromOption === 'other' && (
          <PostalCodeAutocomplete zipCode={zipCode} setZipCode={setZipCode} /> */}
          <input
    className="form-check-input"
    type="radio"
    name="fromOption"
    id="currentLocation"
    value="currentLocation"
    checked={fromOption === 'currentLocation'}
    onChange={() => {
      setFromOption('currentLocation');
      // Disable the zipCode input field when current location is selected
      document.getElementById('zipCodeInput').disabled = true;
    }}
  />
  <label className="form-check-label" htmlFor="currentLocation">
    'current location'
  </label>
</div>
<div className="form-check">
  <input
    className="form-check-input"
    type="radio"
    name="fromOption"
    id="other"
    value="other"
    checked={fromOption === 'other'}
    onChange={() => {
      setFromOption('other');
      // Enable the zipCode input field when other is selected
      document.getElementById('zipCodeInput').disabled = false;
    }}
  />
  <label className="form-check-label" htmlFor="other">
    Other. Please specify zip code:
  </label>
  <input
    type="text"
    className="form-control mt-2 mb-3"
    id="zipCodeInput"
    value={zipCode}
    onChange={(e) => {
      setZipCode(e.target.value);
      setErrors({ ...errors, zipCode: '' }); // Clear zip code error on change
    }}
    disabled={fromOption !== 'other'} // The input field is disabled by default
  />
  {errors.zipCode && <div className="text-danger">{errors.zipCode}</div>}
        
                        </div> 
                      </div></div>
                    {/* Conditions */}
    
    
    
    
                    {/* Buttons */}
                    <div class="form-group row">
                      <div class="col-sm-8 offset-sm-2 d-flex justify-content-start">
                        <button type="submit" className="btn btn-primary me-2 mb-2" onClick={handleSearch}>Search</button>
                        <button type="reset" className="btn btn-secondary mb-2" onclick={clear}>Clear</button>
                      </div>
                    </div>
    
    
                  </form>
                </div>
              </div>
            </div>
    
            {/*resulst and wishlist buttons  */}
            <div class="text-center mt-4">
              {/* <button class="btn btn-outline-dark me-2 mr-2" onClick={toggleWishList}>
                Results
              </button> */}
               <button class="btn btn-outline-dark me-2 mr-2 mb-2" onClick={() => setShowWishlist(false)}>
                Results
              </button>
    
              {/* <button class="btn btn-outline-dark" onClick={toggleWishList}>
                Wish List
              </button> */}
              <button class="btn btn-outline-dark mb-2" onClick={handleWishlistClick}>
                Wish List
              </button>
    
            </div>
            {/* <div class="col-md-4"></div>
        <h1>{isWishlist ? 'Results' : 'Wishlist' } </h1> */}
    
        
    
          {/* <div className="container mt-3">
            <div class="row mb-3">
              <div class="col">
              </div>
              <div class="col-auto">
                {(showDetail && <button class="btn custom-hover">
                  Detail<i class="fas fa-chevron-right"></i>
                </button>)}
              </div>
            </div> */}
    {/* </div> */}
    {/* get detail button from result table here */}
    
    {/* {showTableHeaders===true && showDetail === true  && <ResultTable tableData={products}/> } */}
    {!showWishlist && showTableHeaders && showDetail &&<ResultTable tableData={products}/>}
  
    {/* {!showWishlist && showTableHeaders && showDetail && products.length === 0
      ? noRecordsAlert
      : <ResultTable tableData={products} />
    } */}
   
{/* //getdetails={getIdandShipping} */}
    {showWishlist && <WishlistTable wishlistProducts={wishlistItems} />}
   
    
   
            </>
  )
}