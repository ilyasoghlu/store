'use client'

import { useState } from 'react'
import SelectProductAmount from './SelectProductAmount'
import { Mode } from './SelectProductAmount'
import FormContainer from '../form/FormContainer'
import { SubmitButton } from '../form/Button'
import { addToCardAction } from '@/utils/actions'
import { useAuth } from '@clerk/nextjs'
import { ProductSignInButton } from '../form/Button'


function AddToCard({productId}: {productId:string}) {
    const [amount, setAmout ] = useState(1)
    const {userId} = useAuth()
    return (
        <div className='mt-4'>
            <SelectProductAmount 
                mode={Mode.SingleProduct}
                amount={amount} 
                setAmount={setAmout}
            />  
            {
                userId?<FormContainer action={addToCardAction}>
                    <input type="hidden" name='productId' value={productId} />
                    <input type="hidden" name='amount' value={amount} />
                    <SubmitButton text='add to card' className='mt-8' />

                </FormContainer> :<ProductSignInButton/>
            }

        </div>
    )
}

export default AddToCard