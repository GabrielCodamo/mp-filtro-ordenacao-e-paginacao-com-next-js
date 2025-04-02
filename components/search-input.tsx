'use client'
import { Replace, Search, SearchCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';


// um biblioteca que serve nessa aplicação de filtragem pelo "back-end" como restrição para o número de chamadas via query parameters 
import { useDebouncedCallback } from 'use-debounce';


export default function SearchInput() {

  const searchParams = useSearchParams()
  // caminho de URL padrão
  const pathName = usePathname()
  const { replace } = useRouter()

  const handleChange =  useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event)
      
      const params = new URLSearchParams(searchParams)
      const searchString = event.target.value
      
      if (searchString) {
        params.set('search', searchString);
      } else {
        params.delete('search');
      }
      replace(`${pathName}?${params.toString()}`)
    },500
  )

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Busque por nome..."
        onChange={handleChange}
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  );
}
