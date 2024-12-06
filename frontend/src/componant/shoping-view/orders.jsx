import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { useState } from 'react'
import ShoppingOrderDetails from './order-details'

function ShoppingOrders() {
  const [openDetailsDialog,setOpenDetailsDialog]=useState(false)
  return <Card className='bg-slate-500'>
    <CardHeader>
      <CardTitle>Orders History</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader >
          <TableRow >
            <TableHead className='text-zinc-900'>Order Id</TableHead>
            <TableHead className='text-zinc-900'>Order Data</TableHead>
            <TableHead className='text-zinc-900'>Order Price</TableHead>
            <TableHead className='text-zinc-900'>order Status</TableHead>
            <TableHead className='text-zinc-800'>
              <span className='sr-only '>Details</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1234</TableCell>
            <TableCell>14 apr</TableCell>
            <TableCell>50</TableCell>
            <TableCell>peding</TableCell>
            <TableCell>
              <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
              <Button onClick={()=>setOpenDetailsDialog(true)}>View Details</Button>
             <ShoppingOrderDetails/>
              </Dialog>
              
            </TableCell>
            
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
}

export default ShoppingOrders