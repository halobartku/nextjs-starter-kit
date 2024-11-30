"use client"

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DashboardSideBar } from './dashboard-side-bar'
import { UserNav } from './user-nav'
import { useMediaQuery } from '@/hooks/use-media-query'

interface DashboardTopNavProps {
  children: ReactNode
}

export default function DashboardTopNav({ children }: DashboardTopNavProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="border-b h-[60px] px-4 flex items-center justify-between lg:justify-end">
        {!isDesktop && (
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <DashboardSideBar />
            </SheetContent>
          </Sheet>
        )}
        <UserNav />
      </div>
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
