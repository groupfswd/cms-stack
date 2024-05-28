import DeleteProduct from "@/components/product/DeleteProduct";
import UpdateProduct from "@/components/product/UpdateProduct";
import { convertToRupiah } from "@/lib/convertRupiah";
import DetailProduct from "@/components/product/DetailProduct";
import { getAllProducts } from "@/fetching/product";
import { getCategory } from "@/fetching/category";

export const ListTable = async (query) => {

    const products = await getAllProducts(query);
    const category = await getCategory();

    return(
        <>
            <table className="table text-black dark:text-gray-400 text-center mt-5 border">
                <thead className="text-xs uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            CATEGORY NAME
                        </th>
                        <th scope="col" className="px-6 py-3">
                            PRODUCT NAME
                        </th>
                        <th scope="col" className="px-6 py-3">
                            SKU
                        </th>
                        <th scope="col" className="px-6 py-3">
                            STOCK
                        </th>
                        <th scope="col" className="px-6 py-3">
                            PRICE
                        </th>
                        <th scope="col" className="px-6 py-3">
                            WEIGHT (gram)
                        </th>
                        <th scope="col" className="px-6 py-3">
                            IMAGE
                        </th>
                        <th scope="col" className="px-6 py-3">
                            DESCRIPTION
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ACTION
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.result.data.map((product, index) => (
                        <tr key={product.id} className="text-black">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                {index + 1}
                            </th>
                            <td className="px-6 py-4">
                                {product.category.name}
                            </td>
                            <td className="px-6 py-4">
                                {product.name}
                            </td>
                            <td className="px-6 py-4">
                                {product.sku}
                            </td>
                            <td className="px-6 py-4">
                                {product.stock}
                            </td>
                            <td className="px-6 py-4">
                                {convertToRupiah(product.price)}
                            </td>
                            <td className="px-6 py-4">
                                {product.weight} g
                            </td>
                            <td className="px-6 py-4">
                                <a href={product.image} target="_blank">
                                    {<img src={product.image} width={50} height={50} alt="Picture product" />}
                                </a>
                            </td>
                            <td className="px-6 py-4">
                                {product.description}
                            </td>
                            <td className="px-6 py-4 flex justify-center">
                                <DetailProduct product={product} category={category}/>
                                |
                                <UpdateProduct product={product} category={category}/>
                                |
                                <DeleteProduct {...product}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ListTable;