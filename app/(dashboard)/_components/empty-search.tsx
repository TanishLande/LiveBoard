import Image from 'next/image'

const EmptySearch = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center text-center'> 
        <Image 
         src='/search.svg' 
         alt='Not-Found'
         width={200}
         height={200}
        />
        <h2 className='text-4xl font-semibold mt-6'>
            No result found!
        </h2>
        <p className='text-muted-foreground text-lg mt-2'>
           Try searching for something else
        </p>
    </div>
  )
}

export default EmptySearch;