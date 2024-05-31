"use client"
import { IoChevronUpCircle } from "react-icons/io5";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchMinRange = () => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();


    const handleSerach = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if(term){
            params.set("min_price", term);
        }else{
            params.delete("min_price")
        }
        console.log(`${pathName}?${params.toString()}`);
        replace(`${pathName}?${params.toString()}`);
    }, 1000);


    return (
        <div className="relative flex felx-1">
            <input type="number" className="w-60 border border-gray-200 py-2 pl-10 text-sm outline-2 rounded-sm" placeholder="Min Price" onChange={(e) => handleSerach(e.target.value)} defaultValue={searchParams.get("min_price")?.toString()} />
            <IoChevronUpCircle  className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
        </div>
    )
}

export default SearchMinRange;