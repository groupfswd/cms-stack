import { getCategory } from "@/fetching/category";
import AddProduct from "@/components/product/AddProduct";
import Search from "@/components/product/Search";
import SearchMinRange from "@/components/product/SearchMinRange";
import SearchMaxRange from "@/components/product/SearchMaxRange";
import ListTable from "@/components/product/ListProducts";
// import Pagination from "@/components/product/Pagination";

export default async function ProductPage({searchParams}) {
    const query = searchParams?.search || "";
    const min_price = +searchParams?.min_price || "";
    const max_price = +searchParams?.max_price || "";
    const currentPage = +searchParams?.page || 1;
    const limit = 5;
    const category = await getCategory();
    return (
    <>
        <div className="container mx-auto">
        <h1 className="text-xl font-bold py-5 text-center">List Products</h1>
            <div className="relative overflow-x-auto mt-5">
                <AddProduct category={category} />
                <div className="grid grid-cols-3 mt-3">
                    <Search className="col-span-2"/>
                    <div className="grid col-span-2 grid-cols-2 ml-auto gap-2">
                        <SearchMinRange />
                        <SearchMaxRange />
                    </div>
                </div>
                <ListTable search={query} currentPage={currentPage} limit={limit} min_price={min_price} max_price={max_price} />
                {/* <Pagination totalPages={1} /> */}
            </div>
        </div>
    </>
    );
}
