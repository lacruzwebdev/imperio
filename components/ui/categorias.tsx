'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { Button } from './button'

type Props = {
  opciones: string[]
  active: {
    activeCategory: any
    setActiveCategory: any
  }
}

export function Categorias({ opciones, active }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">{active.activeCategory}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          value={active.activeCategory}
          onValueChange={active.setActiveCategory}
        >
          {opciones.map((opcion: string) => (
            <DropdownMenuRadioItem key={opcion} value={opcion}>
              {opcion}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
