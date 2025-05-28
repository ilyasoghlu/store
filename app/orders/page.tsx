import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import SectionTitle from '@/components/global/SectionTitle'
import {fetchUserOrders} from '@/utils/actions'
import { formatCurrency, formatDate } from '@/utils/format'



async function Orders() {
  const orders = await fetchUserOrders()

  return (
    <>
      <SectionTitle text='Your Orders' />
      <Table>
        <TableCaption>Total Orders: {orders.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </>
  )
}

export default Orders