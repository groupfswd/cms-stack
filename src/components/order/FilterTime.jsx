'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function FilterTime() {
   const searchParams = useSearchParams();
   const pathName = usePathname();
   const { replace } = useRouter();

   const handleFilter = useDebouncedCallback((term) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
         params.set("sort_by", term);
      } else {
         params.delete("sort_by");
      }
      replace(`${pathName}?${params.toString()}`);
   }, 500);

   return (
      <label className="form-control w-full max-w-xs">
         <select className="select select-bordered"
            onChange={(e) => handleFilter(e.target.value)}
            defaultValue={searchParams.get("sort_by")?.toString()}>
            <option value="">Time</option>
            <option value="created_at desc">Created at descending</option>
            <option value="created_at asc">Created at ascending</option>
            <option value="updated_at desc">Updated at descending</option>
            <option value="updated_at asc">Updated at ascending</option>
         </select>
      </label>
   );
}