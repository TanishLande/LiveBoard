import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Move this import to the top
import { useOrganization } from '@clerk/nextjs';
import { api } from "@/convex/_generated/api";
import { Button } from '@/components/ui/button';
import useApiMutation from '@/hooks/use-api-mutation';
import { toast } from 'sonner';

const EmptyBoard = () => {
    const router = useRouter(); // Use the hook at the top level
    const { organization } = useOrganization();
    const { mutate, pending } = useApiMutation(api.board.create);

    const onClick = () => {
        if (!organization) return;

        mutate({
            orgId: organization.id,
            title: "untitled"
        })
        .then((id) => {
            toast.success("Board was successfully created.");
            router.push(`/board/${id}`);
        })
        .catch(() => {
            toast.error("Failed to create board.");
        });
    };

    return (
        <div className='h-full flex flex-col items-center justify-center text-center'> 
            <Image 
                src='/nosearch.svg' 
                alt='Not-Found'
                width={200}
                height={200}
            />
            <h2 className='text-4xl font-semibold mt-6'>
                Create your first board
            </h2>
            <p className='text-muted-foreground text-lg mt-2'>
                Start by creating a board for your organization 
            </p>
            <div className='mt-6'>
                <Button disabled={pending} onClick={onClick} size='lg'>
                    Create board
                </Button>
            </div>
        </div>
    );
};

export default EmptyBoard;
