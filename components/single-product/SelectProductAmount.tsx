import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export enum Mode {
    SingleProduct = 'singleProduct',
    CardItem = 'cardItem',
}

type SelectProductAmountProps = {
    mode:Mode.SingleProduct;
    amount:number;
    setAmount:(value:number) => void;
}

type SelectCardItemAmountProps = {
    mode: Mode.CardItem
    amount: number;
    setAmount:(value:number) => Promise<void>;
    isLoading:boolean;
}

function SelectProductAmount(props: SelectProductAmountProps |SelectCardItemAmountProps ) {
    const {mode, amount, setAmount } = props
    const cardItem = mode === Mode.CardItem
    return (
        <>
            <h4 className='mb-2'>Amount:  </h4>
            <Select 
                defaultValue={amount.toString()} 
                onValueChange={(value)=> setAmount(Number(value))}
                disabled={cardItem? props.isLoading:false}    
            >
                <SelectTrigger className={cardItem? 'w[100px]': 'w-[150px]'}>
                    <SelectValue placeholder={amount} />
                </SelectTrigger>
                <SelectContent>
                    {Array.from({length:cardItem? amount +10 : 10},(_, index)=> {
                        const selectValue = (index+1).toString()
                        return (
                            <SelectItem key={selectValue} value={selectValue}>
                                {selectValue}
                            </SelectItem>
                        )
                    }  )}
                </SelectContent>
            </Select>
        </>
    )
}

export default SelectProductAmount