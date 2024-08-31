import { query  } from './_generated/server'
import { v } from 'convex/values';
import { favourite } from './board';
import { getAllOrThrow }  from "convex-helpers/server/relationships"

export const get  = query({
    args:{
        orgId: v.string(),
        search: v.optional(v.string()),
        isFavorite: v.optional(v.string())
    },
    handler: async (ctx, args) =>{
        const identify = await ctx.auth.getUserIdentity();

        if(!identify){
            throw new Error("Unauthorized");
        }

        if (args.isFavorite) {
            const favourite = await ctx.db
                .query("useFavourite")
                .withIndex("by_user_org", (q) =>
                    q
                        .eq("userId", identify.subject)
                        .eq("orgId", args.orgId)
                )
                .order("desc")
                .collect();
            
            const ids = favourite.map((b) => b.boardId);
            
            // Assuming getAllOrThrow is an async function
            const boards = await getAllOrThrow(ctx.db, ids);
            
            return boards.map((board) => ({
                ...board,
                isFavourite: true
            }));
        }

        const title = args.search as string;
        let boards = [];
        if(title){
            boards = await ctx.db
                .query("boards")
                .withSearchIndex("search_title", (q)=>
                    q
                        .search("title", title)
                        .eq("orgId", args.orgId)
                )
                .collect();
        } else {
            boards = await ctx.db
            .query("boards")
            .withIndex("by_org", (q)=> q.eq("orgId",args.orgId))
            .order("desc")
            .collect();

        }
      

        const boardsWithFavoriteRelation =  boards.map((board)=>{
            return ctx.db 
                .query("useFavourite")
                .withIndex("by_user_board", (q)=>
                    q
                        .eq("userId", identify.subject)
                        .eq("boardId", board._id)
                )
                .unique()
                .then((favourite)=>{
                    return{
                        ...board,
                        isFavourite: !!favourite
                    }
                });

        })
        
        const boardsWithFavoriteBoolean = Promise.all(boardsWithFavoriteRelation);
        return boardsWithFavoriteBoolean ;
    },


    
});