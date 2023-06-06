import React from 'react'

const CartTree = ({bag,details,success}) => {
  return (
	<div className='w-full flex px-4 mt-2'>
		<div className='w-[33%]  flex items-center'>
			<div className={`w-full h-1 bg-gray-400 ${bag && "bg-green-400"}  transition-all duration-500`}></div>
			<div className={`w-[10%] md:w-[3.3%] h-2 md:h-3 ml-[1px] rounded-full transition-all duration-500 bg-gray-500 ${bag && "border md:border-2 border-green-400"} `}></div>
			<div className='w-fit p-text ml-0.5'>Bag</div>
		</div>
		<div className='w-[33%]  flex items-center ml-1'>
			<div className={`w-full h-1 bg-gray-400 transition-all duration-1000 ${details && "bg-green-400"}`}></div>
			<div className={`w-[15%] md:w-[3.4%] h-2 md:h-3 ml-[1px] rounded-full transition-all duration-500 bg-gray-500 ${details && "border md:border-2 border-green-400"}`}></div>
			<div className='w-fit p-text ml-0.5'>Details</div>
		</div>
		<div className='w-[33%]  flex items-center ml-1'>
			<div className={`w-full h-1 bg-gray-400 transition-all duration-1000 ${success && "bg-green-400"}`}></div>
			<div className={`w-[15%] md:w-[3.4%] h-2 md:h-3 ml-[1px] rounded-full transition-all duration-500 bg-gray-500 ${success && "border md:border-2 border-green-400"}`}></div>
			<div className='w-fit p-text ml-0.5'>Success</div>
		</div>
		
	
	</div>
  )
}

export default CartTree