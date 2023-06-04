import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { Helmet } from 'react-helmet';
import WishlistProd from '../../components/WishlistProd/WishlistProd';

const Wishlist = () => {
  return (
	<div className="w-full min-h-screen">
      <Helmet>
        <title>Buylocity- Wishlist</title>
        <meta
          name="description"
          content="Discover a wide selection of products and categories at our online store. Explore our extensive range of high-quality 
          items to meet all your needs. From electronics to home decor, fashion to kitchenware, we offer a diverse collection to cater to 
          every taste and preference. Whether you're looking for the latest gadgets, stylish clothing, or unique gifts, our website has 
          you covered. Browse through our user-friendly interface, conveniently organized into various categories, making it easy to find 
          exactly what you're searching for. Shop with confidence and enjoy a seamless shopping experience with our trusted online store"
        />
      </Helmet>
      <Navbar home={false} />
	  <div className='pt-28'>
		<WishlistProd/>
	  </div>
	</div>
  )
}

export default Wishlist;