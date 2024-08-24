import Image from 'next/image'

const EmptyFav = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center text-center'> 
        <Image 
         src='/fav.svg' 
         alt='Not-Found'
         width={200}
         height={200}
        />
        <h2 className='text-4xl font-semibold mt-6'>
            No favourite boards!
        </h2>
        <p className='text-muted-foreground text-lg mt-2'>
            Try favouriting a board
        </p>
    </div>
  )
}

export default EmptyFav