import { query  } from './_generated/server'
import { v } from 'convex/values';
import { favourite } from './board';

export const get  = query({
    args:{
        orgId: v.string(),
    },
    handler: async (ctx, args) =>{
        const identify = await ctx.auth.getUserIdentity();

        if(!identify){
            throw new Error("Unauthorized");
        }

        const boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q)=> q.eq("orgId",args.orgId))
        .order("desc")
        .collect();

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