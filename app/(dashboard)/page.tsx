"use client"
import React from 'react'
import EmptyOrg from './_components/empty-org';
import { useOrganization } from '@clerk/nextjs';
import { BoardList } from './_components/board-list';

interface DashboardProps {  
  searchParams: {
    search?: string;
    favorites?: string;
  }
}

const Page = ({
  searchParams
}: DashboardProps) => {
  const { organization } = useOrganization();

  return (
    <div className='flex-1 h-[calc(100%-30px)] p-6'>
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList 
          orgId={organization.id}
          query={searchParams}
        />
      )}
    </div>
  )
}

export default Page;
