import React, { useId } from 'react'

function Select({options,label,className='',ref,...props}) {
    const id=useId();

  return (
    <div>
        {
            label&& <label className='' htmlFor={id}>{label}</label>
        }
        <select 
        {...props}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus-bg-gray-50
            duration-200 border border-gray-200 w-full ${className}`}
        >
             {
                options?.map((option)=>{
                    return(
                        <option key={option}>{option}</option>
                    )
                })
             }
        </select>
    </div>
  )
}

export default Select