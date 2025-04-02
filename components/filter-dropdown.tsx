"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { useState } from 'react';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function FilterDropdown() {

  const [filterStatus, setFilterStatus] = useState('')

  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  function handleChangeFilter(value: string) {

    const params = new URLSearchParams(searchParams)
    console.log(value)
    if (value) {
      //passando dados via query string ficam armazenados no params mas não sao passados para a URL 
      params.set('status', value)
    } else {
      params.delete('status')
    }

    // funcão do useRouter que passa informações via URL
    replace(`${pathName}?${params.toString()}`)

    //trocar o status apenas o botao do lado 
    setFilterStatus(value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={'default'}
          className="flex gap-2 text-slate-600"
        >
          <Filter className="h-4 w-4" />
          Status
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-16">
        <DropdownMenuLabel>Filtrar por:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={filterStatus} onValueChange={handleChangeFilter}>
          <DropdownMenuRadioItem value="">Todos</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="pending">
            Pendente
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="completed">
            Completo
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
