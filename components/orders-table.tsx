'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from './ui/badge';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import type { orders } from '@/lib/types';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


const formatter = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

interface ordersProps { orders: orders[] }



export default function OrdersTable({ orders }: ordersProps) {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  function handleClick(key: string) {

    const params = new URLSearchParams(searchParams)

    if (params.get('sort') === key) {
      params.set('sort', `-${key}`)
    } else if (params.get('sort') === `-${key}`) {
      params.delete('sort')
    } else if (key) {
      params.set('sort', key)
    }

    replace(`${pathName}?${params.toString()}`)
  }

  function getSortIcon(key: string) {

    if (searchParams.get('sort') === key) {
      return <ChevronDown className='w-4' />
    } else if (searchParams.get('sort') === `-${key}`) {
      return <ChevronUp className='w-4' />
    }
    return <ChevronsUpDown className='w-4' />
  }


  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">
            <div className='flex items-center gap-1'>
              Cliente
              <ChevronsUpDown />
            </div>
          </TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead onClick={() => handleClick('order_date')} className=" hidden md:table-cell cursor-pointer justify-end items-center gap-1">
            <div className="flex items-center gap-1">
              Data
              {getSortIcon('order_date')}
            </div>
          </TableHead>
          <TableHead onClick={() => handleClick('amount_in_cents')} className="text-right cursor-pointer flex justify-end items-center gap-1">
            Valor
            {getSortIcon('amount_in_cents')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody >
        {
          orders.map((orders) => (
            <TableRow key={orders.id}>
              <TableCell >
                <div className="font-medium">{orders.customer_name}</div>
                <div className="hidden md:inline text-sm text-muted-foreground">
                  {orders.customer_email}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`text-xs`} variant="outline">
                  {
                    orders.status === 'pending' ? 'Pendente' : 'Completo'
                  }
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">{orders.order_date.toString()}</TableCell>
              <TableCell className="text-right">{formatter.format(orders.amount_in_cents / 100)}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}
