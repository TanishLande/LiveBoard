import Image from 'next/image'
import { CreateOrganization } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'

import {
    Dialog,
    DialogContent,
    DialogTrigger
} from '@/components/ui/dialog'

const EmptyOrg = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center text-center'> 
        <Image 
         src='/element.svg' 
         alt='Not-Found'
         width={200}
         height={200}
        />
        <h2 className='text-4xl font-semibold mt-6'>
            Welcome to LiveBoard
        </h2>
        <p className='text-muted-foreground text-lg mt-2'>
            Create an Organization to get started
        </p>
        <div className='mt-6'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size='lg'>
                        Create Organization
                    </Button>
                </DialogTrigger>
                <DialogContent className='p-0 bg-transparent border-none max-w-[480px]'>
                    <CreateOrganization routing='hash' />
                </DialogContent>
            </Dialog>
        </div>
    </div>
  )
}

export default EmptyOrg;
