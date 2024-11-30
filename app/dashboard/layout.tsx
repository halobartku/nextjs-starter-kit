import { ReactNode, Suspense } from "react"
import DashboardSideBar from "./_components/dashboard-side-bar"
import DashboardTopNav from "./_components/dashboard-top-nav"
import { isAuthorized } from "@/utils/data/user/isAuthorized"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await currentUser()
  
  if (!user) {
    redirect("/auth/signin")
  }

  const { authorized, message } = await isAuthorized(user.id)
  
  if (!authorized) {
    console.log("Authorization failed:", message)
    redirect("/auth/unauthorized")
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <DashboardSideBar />
      <DashboardTopNav>
        <Suspense fallback={<LoadingSpinner />}>
          <main className="flex flex-col gap-4 p-4 lg:gap-6">
            {children}
          </main>
        </Suspense>
      </DashboardTopNav>
    </div>
  )
}