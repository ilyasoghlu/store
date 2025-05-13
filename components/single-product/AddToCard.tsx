import React from 'react'
import { Button } from '../ui/button'

function AddToCard({productId}: {productId:string}) {
    return (
        <Button className='capitalize mt-8' size='lg'>
            add to card
        </Button>
    )
}

export default AddToCard