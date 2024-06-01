"use client";
import Link from "next/link";
import { HiChevronLeft, HiChevronRight} from "react-icons/hi";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";

const Pagination = (totalPages) => {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const currentPage = +searchParams.get("page") || 1;

    const createPageUrl = (pageNumber) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathName}?${params.toString()}`;
    }

    const generatePagination = (currentPage, {totalPages}) => {
        if(totalPages <= 7){
            return Array.from({ length: totalPages}, (_, i) => i+1);
        }

        if(currentPage <= 3){
            return [1,2,3,"...", totalPages - 1, totalPages];
        }

        if(currentPage >= totalPages - 2){
            return [1,2,3, "...", totalPages - 2, totalPages - 1, totalPages];
        }

        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages

        ]
    }

    const allPages = generatePagination(currentPage, totalPages);

    const PaginationNumber = ({
        page,
        href,
        position,
        isActive
    }) => {
        const clasName = clsx("flex h-10 w-10 items-center justify-center text-sm border",
        {
            "rounded-l-sm": position === "first" || position === "single",
            "rounded-r-sm": position === "last" || position === "single",
            "z-10 bg-blue-100 border-blue-500 text-white": isActive,
            "hover:bg-gray-100": !isActive && position!== "middle",
            "text-gray-300 pointer-event-none": position === "middle"
        });
        return isActive && position === "middle" ? (
            <div className={clasName}>{page}</div>
        ):(
            <Link href={href} className={clasName}>
                {page}
            </Link>
        );
    };

    const PaginationArrow = ({ href, direction, isDisabled }) => {
        const clasName = clsx("flex h-10 w-10 items-center justify-center text-sm border",
            {
                "pointer-events-none text-gray-300": isDisabled,
                "hover:bg-gray-100": !isDisabled,
                "mr-2": direction === "left",
                "ml-2": direction === "right"
            }
        );

        const icon = direction === "left" ? (
            <HiChevronLeft size={20} />
        ):(
            <HiChevronRight size={20} />
        );

        return isDisabled ? (
            <div className={clasName}>{icon}</div>
        ):(
            <Link href={href} className={clasName}>{icon}</Link>
        )
    }

    return (
        <div className="inline-flex">
            <PaginationArrow direction="left" href={createPageUrl(currentPage -1)} isDisabled={currentPage <= 1}/>
            <div className="flex -space-x-px">
                {allPages.map((page, index) => {
                    let position = ["first" || "last" || "single" || "middle" || undefined];

                    if(index === 0) position = "first";
                    if(index === allPages.length - 1) position = "last";
                    if(allPages.length === 1) position = "single";
                    if(page === "...") position = "middle";

                    return(
                        <PaginationNumber key={index} href={createPageUrl(page)} page={page} position={position} isActive={currentPage === page} />
                    )
                })}
            </div>
            <PaginationArrow direction="right" href={createPageUrl(currentPage +1)} isDisabled={currentPage >= totalPages}/>
        </div>
    );
}


export default Pagination;