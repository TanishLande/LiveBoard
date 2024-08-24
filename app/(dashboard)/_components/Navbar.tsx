"use client";

import { OrganizationSwitcher, UserButton , useOrganization} from '@clerk/nextjs';
import React from 'react';
import SearchInput from './search-input'; 
import { InviteButton } from './sidebar/invite-button';

const Navbar = () => {
  const { organization } = useOrganization();

  return (
    <div className='flex items-center gap-x-4 p-5 '>
      <div className='hidden lg:flex lg:flex-1'>
        <SearchInput /> 
      </div>
      <div className='block lg:hidden flex-1'>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              width: "100%",
              maxWidth: "350px"
            },
            organizationSwitcherTrigger: {
              padding: "12px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              fontSize: "18px",
            },
          },
        }}
      />
      </div>
      {organization && 
        <InviteButton />
      }
      <UserButton />
    </div>
  )
}

export default Navbar;
