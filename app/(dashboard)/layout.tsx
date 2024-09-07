
import React from 'react'
import SideBar from './_components/sidebar'
import Navbar from './_components/Navbar'
import OrgNavbar from './_components/org-navbar'
import { OrgNewbar } from './_components/org-newanavbar'

interface DashboardLayoutProps{
    children: React.ReactNode
}

const layout = ({
    children
}: DashboardLayoutProps) => {
  return (
    <main className='h-full'>
        <SideBar />
        <div className='pl-[60px] h-full'>
            <div className='flex gap-x-3 h-full'>
                <OrgNewbar />
                <div className='h-full flex-1'>
                    <Navbar />
                    {children}
                </div>
            </div>
        </div>
    </main>
  )
}

export default layout