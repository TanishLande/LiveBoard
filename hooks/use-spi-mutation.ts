import { useState } from "react";
import { useMutation } from "convex/react";
import { mutation } from "@/convex/_generated/server";

const useApiMutation = (mutationFunction: any) => {
    const [pending, setPending] = useState(false);
    const apiMutation = useMutation(mutationFunction);

    const mutate = async (payload: any) => {
        setPending(true);
        try {
            const result = await apiMutation(payload);
            return result;
        } catch (error) {
            throw error;
        } finally {
            setPending(false);
        }
    };

    return {
        mutate,
        pending
    };
};

export default useApiMutation;
