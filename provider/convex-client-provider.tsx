"use client"

import Loading from "@/components/auth/loading"
import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { ConvexProviderWithAuth } from "convex/react"

import{
    AuthLoading,
    Authenticated,
    ConvexReactClient
} from 'convex/react'
import { ConvexProviderWithClerk } from "convex/react-clerk"
import React from "react"

interface ConvexClientProviderProps{
    children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

const ConvexClientProvider = ({
    children
}: ConvexClientProviderProps) => {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
               <Authenticated>
                 {children}
                 </Authenticated>
                <AuthLoading>
                    <Loading />
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};
 
export default ConvexClientProvider;