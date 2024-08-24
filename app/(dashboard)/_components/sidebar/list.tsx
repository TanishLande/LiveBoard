"use client"
import { useOrganizationList } from "@clerk/nextjs";
import { Item } from "./item";

export const List = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      limit: 100,
      // Use other pagination options as needed
    },
  });

  if (!userMemberships?.data?.length) return null;

  return (
    <ul className="space-y-4">
      {userMemberships.data.map((member: any) => (
        <Item 
        key={member.organization.id}
        id={member.organization.id}
        name={member.organization.name}
        imageUrl={member.organization.imageUrl}
        />
      ))}
    </ul>
  );
};