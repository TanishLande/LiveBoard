import { v } from 'convex/values'
import { defineSchema, defineTable } from 'convex/server'

export default defineSchema ({
    boards: defineTable({
        title: v.string(),
        orgId: v.string(),
        authorId: v.string(),
        authorName: v.string(),
        imageUrl: v.string()
    })
        //below by_org is a name  and second argument the the actual name of row.
        .index("by_org",["orgId"]) // WHERE(SQL) OrgId is store in by_org
        .searchIndex("search_title",{
            searchField: "title",
            filterFields: ["orgId"]
        })
})