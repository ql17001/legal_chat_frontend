import React, {ReactNode} from 'react'
//import { render } from 'react-dom'

interface Chil{
    children: ReactNode
}

const Container = ({children}:Chil) => {
return (
<div className='flex-1 max-w-6xl m-auto flex-wrap border border-gray-700 rounded-lg w-full my-8'>
    
        {children}
        
</div>
)
}

export default Container