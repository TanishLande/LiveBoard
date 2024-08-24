"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Star } from "lucide-react";
import { Poppins } from "next/font/google";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const OrgNavbar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <div className="hidden lg:flex flex-col w-[206px] pl-5 pt-5">
      <Link href="/" className="mb-6">
        <div className="flex items-center space-x-4">
          <Image src="/logo.svg" alt="Logo" height={50} width={50} />
          <span className={cn("font-semibold text-2xl text-black", font.className)}>
            LiveBoard
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "12px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              fontSize: "18px",
            },
          },
        }}
      />
      <div className="mt-4 space-y-1 w-full">
        <Button
          variant={favorites ? "ghost" : "secondary"} 
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Link href="/">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Team boards
          </Link>
        </Button>
        <Button
          variant={favorites ? "secondary" : "ghost"} 
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
          >
            <Star className="h-4 w-4 mr-2" />
            Favorites
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrgNavbar;
