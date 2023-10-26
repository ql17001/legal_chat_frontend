import React, {ReactNode} from 'react'
//import { render } from 'react-dom'

interface Chil{
    children: ReactNode
}

const Container = ({children}:Chil) => {
return (
<div className='min-h-screen max-w-2xl m-auto flex-wrap px-48 py-40'>
    <div className='align-middle text-center items-center top-auto bottom-auto max-w-md min-w-full p-5 mx-4 my-4 flex-col flex'>
        {children}</div>
</div>
)
}

export default Container