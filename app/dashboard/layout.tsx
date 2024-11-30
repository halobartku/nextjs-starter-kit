import { ReactNode, Suspense } from "react"
import DashboardSideBar from "./_components/dashboard-side-bar"
import DashboardTopNav from "./_components/dashboard-top-nav"
import { isAuthorized } from "@/utils/data/user/isAuthorized"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { Loader2 } from "lucide-react"

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[100px]">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
}

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await currentUser()
  
  if (!user) {
    redirect("/sign-in")
  }

  const { authorized, message } = await isAuthorized(user.id)
  
  if (!authorized) {
    console.log("Authorization failed:", message)
    redirect("/unauthorized")
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