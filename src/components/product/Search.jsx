"use client"
import { IoSearch } from "react-icons/io5";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();


    const handleSerach = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if(term){
            params.set("search", term);
        }else{
            params.delete("search")
        }
        replace(`${pathName}?${params.toString()}`);
    }, 1000);


    return (
        <div className="relative flex felx-1">
            <input type="text" className="w-full border border-gray-200 py-2 pl-10 text-sm outline-2 rounded-sm" placeholder="Search Products Name..." onChange={(e) => handleSerach(e.target.value)} defaultValue={searchParams.get("search")?.toString()} />
            <IoSearch className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
        </div>
    )
}

export default Search;