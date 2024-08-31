import { v } from 'convex/values'
import { mutation } from './_generated/server'

const images = [
    "/placeholder/1.svg",
    "/placeholder/2.svg",
    "/placeholder/3.svg",
    "/placeholder/4.svg",
    "/placeholder/5.svg"

]

export const create = mutation({
    args:{
        orgId: v.string(),
        title: v.string()
    },
    handler: async (ctx, args) =>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("unauthorized");
        }

        const randomImages = images[Math.floor(Math.random() * images.length)];

        const board = await ctx.db.insert("boards",{
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImages
        })

        return board;
    }
})


export const remove = mutation({
    args: {id: v.id("boards")},

    handler: async (ctx,args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorized");
        }


        const userId = identity.subject;

        const existingFavourite = await ctx.db
            .query("useFavourite")
            .withIndex("by_user_board", (q)=>
            q
                .eq("userId", userId)
                .eq("boardId", args.id)
        )
            .unique();


            if(existingFavourite){
                await ctx.db.delete(existingFavourite._id)
            }

        await ctx.db.delete(args.id);
    }
})

export const update =  mutation({
    args: { id: v.id("boards"), title: v.string() },
    handler: async (ctx,args) =>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorized");
        }

        const title = args.title.trim();

        if(!title){
            throw new Error("Tittle is required");
        }

        if(title.length > 60){
            throw new Error("Title lenght cannot be longer then 60 character");
        }

        const baord = await ctx.db.patch(args.id,{
            title:args.title,
        })

        return baord;
    }
});



export const favourite = mutation({
    args: {
        id: v.id("boards"),
        orgId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("User Unauthorized");
        }

        // Ensure identity.subject is a string
        if (typeof identity.subject !== 'string') {
            throw new Error("Invalid user ID");
        }

        const userId = identity.subject;

        const board = await ctx.db.get(args.id);

        if (!board) {
            throw new Error("Board not found");
        }

        const existingFavourite = await ctx.db
            .query("useFavourite")
            .withIndex("by_user_board_org", (q) => 
                q
                .eq("userId", userId)
                .eq("boardId", board._id)
                .eq("orgId", args.orgId)
            )
            .unique();

        if (existingFavourite) {
            throw new Error("Board already favourited");
        }

        await ctx.db.insert("useFavourite", {
            userId,
            boardId: args.id,
            orgId: args.orgId
        });

        return board;
    }
});



export const unFavourite = mutation({
    args: {
        id: v.id("boards"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("User Unauthorized");
        }

        if (typeof identity.subject !== 'string') {
            throw new Error("Invalid user ID");
        }

        const userId = identity.subject;

        const board = await ctx.db.get(args.id);

        if (!board) {
            throw new Error("Board not found");
        }

        const existingFavourite = await ctx.db
            .query("useFavourite")
            .withIndex("by_user_board", (q) => 
                q
                .eq("userId", userId)
                .eq("boardId", board._id)
            )
            .unique();

        if (!existingFavourite) {
            throw new Error("Can't unfavourite which isn't favourite");
        }

        await ctx.db.delete(existingFavourite._id);

        return board;
    }
});