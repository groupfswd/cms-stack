'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function FilterStatus() {
   const searchParams = useSearchParams();
   const pathName = usePathname();
   const { replace } = useRouter();

   const handleFilter = useDebouncedCallback((term) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      if (term) {
         params.set("filter_status", term);
      } else {
         params.delete("filter_status");
      }
      replace(`${pathName}?${params.toString()}`);
   }, 500);

   return (
      <label className="form-control w-full max-w-xs mr-3">
         <select className="select select-bordered"
            onChange={(e) => handleFilter(e.target.value)}
            defaultValue={searchParams.get("sort_by")?.toString()}>
            <option value="">Status</option>
            <option value="waiting_payment">Waiting Payment</option>
            <option value="waiting_approval">Waiting Approval</option>
            <option value="cancelled">Cancelled</option>
            <option value="approved">Approved</option>
            <option value="shipping">Shipping</option>
            <option value="delivered">Delivered</option>
            <option value="completed">Completed</option>
         </select>
      </label>
   );
}
