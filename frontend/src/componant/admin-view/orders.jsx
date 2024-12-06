import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import React, { useState } from 'react'
import AdminOrderDetails from './order-details'

function AdminOrders() {
  const [openDetailsDialog,setOpenDetailsDialog]=useState(false)
  return <Card>
  <CardHeader>
    <CardTitle>All Orders</CardTitle>
  </CardHeader>
  <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Id</TableHead>
            <TableHead>Order Data</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead>order Status</TableHead>
            <TableHead>
              <span className='sr-only'>Details</span>
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
              <AdminOrderDetails/>
              </Dialog>
            </TableCell>
            
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
</Card>
}

export default AdminOrders