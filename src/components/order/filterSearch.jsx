'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.error("Search cannot be empty.")

export default function FilterSearch() {
	const searchParams = useSearchParams();
	const pathName = usePathname();
	const [search, setSearch] = useState('');
	const { replace } = useRouter();

	const handleFilter = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set("q", term);
		} else {
			notify()
			params.delete("q");
		}
		replace(`${pathName}?${params.toString()}`);
	}, 500);

	const handleSubmit = (e) => {
		setSearch(e);
		handleFilter(search);
	};

	return (
		<div className='flex flex-row p-2 items-center'>
			<div className='w-44 mr-2'>
				<input type="text"
					onChange={(e) => setSearch(e.target.value)}
					defaultValue={searchParams.get("q")?.toString()}
					className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
					placeholder='Id order or user_id'
				/>
			</div>
			<div>
				<button type='submit' onClick={() => handleSubmit()} className='btn btn-primary btn-sm'>Search</button>
				<Toaster />
			</div>
		</div>
	);
}