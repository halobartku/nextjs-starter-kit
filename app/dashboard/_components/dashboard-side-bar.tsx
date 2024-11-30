"use client"

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  Banknote,
  Folder,
  HomeIcon,
  Settings,
  Users
} from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Home', icon: HomeIcon },
  { href: '/dashboard/clients', label: 'Clients', icon: Users },
  { href: '/dashboard/offers', label: 'Offers', icon: Folder },
  { href: '/dashboard/pipeline', label: 'Pipeline', icon: Banknote },
]

export default function DashboardSideBar() {
  const pathname = usePathname();

  return (
    <div className="lg:block hidden border-r h-full">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <span>Nextjs Starter Kit</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  pathname === href && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                )}
                href={href}
              >
                <div className="rounded-lg p-1">
                  <Icon className="h-4 w-4" />
                </div>
                {label}
              </Link>
            ))}
            <Separator className="my-4" />
            <Link
              href="/dashboard/settings"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname === "/dashboard/settings" && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
              )}
            >
              <div className="rounded-lg p-1">
                <Settings className="h-4 w-4" />
              </div>
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
