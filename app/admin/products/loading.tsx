'use client'

import LoadingTable from '@/components/global/LoadingTable'
import React from 'react'

function loading() {
    return (
        <LoadingTable rows={10}/>
    )
}

export default loading