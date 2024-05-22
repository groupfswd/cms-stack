import { getAllProducts } from "@/fetching/product";
import { getCategory } from "@/fetching/category";
import AddProduct from "@/components/product/AddProduct";
import DeleteProduct from "@/components/product/DeleteProduct";
import UpdateProduct from "@/components/product/UpdateProduct";

export default async function ProductPage() {
    function convertToRupiah(angka) {
        var rupiah = '';
        var angkarev = angka.toString().split('').reverse().join('');
        for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    }

    const [category, products] = await Promise.all([
        getCategory(),
        getAllProducts()
    ])
    return (
    <>
        <div className="container mx-auto">
        <h1 className="text-xl font-bold py-5 text-center">List Products</h1>
            <div className="relative overflow-x-auto shadow-md mt-5">
            <AddProduct category={category}/>
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
                                    <UpdateProduct product={product} category={category}/>
                                    |
                                    <DeleteProduct {...product}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
}
