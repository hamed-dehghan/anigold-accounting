import React from 'react'
interface EditProductProp {
  describtion: React.ReactNode
}

const Trash = ({ describtion }: EditProductProp) => {
  return (
    <div className='text-gray_45'>
      {describtion}
    </div>
  )
}

export default Trash