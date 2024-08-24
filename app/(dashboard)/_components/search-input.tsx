"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { useDebounceCallback } from 'usehooks-ts';

const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");

    const debouncedCallback = useDebounceCallback((value: string) => {
        const url = qs.stringifyUrl({
            url: "/",
            query: { search: value }
        },{skipEmptyString:true, skipNull:true});
        router.push(url);
    }, 500);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        debouncedCallback(value);
    }, [value, debouncedCallback]);

    return (
        <div className="w-full relative">
            <Search
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
            />
            <Input
                className="w-full max-w-[700px] pl-9"
                placeholder="Search Board"
                onChange={handleChange}
                value={value}
            />
        </div>
    );
};

export default SearchInput;
