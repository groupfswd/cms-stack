'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function FilterStatus() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const handleReset = () => {
		const params = new URLSearchParams(searchParams);

		params.delete("filter_status");
		params.delete("sort_by");
		params.delete("q");

		const newUrl = `${pathname}?${params.toString()}`;
		router.replace(newUrl);
	};

	return (
		<div className='ml-3 flex items-center'>
			<button onClick={() => handleReset()} className='btn btn-secondary btn-sm'>Reset</button>
		</div>
	);
}