import { getCategory } from "@/fetching/category";
import AddCategory from "@/components/category/addCategory";
import DeleteCategory from "@/components/category/deleteCategory";
import UpdateCategory from "@/components/category/updateCategory";


export default async function CategoryPage() {
  const categories = await getCategory();
  return (
    <>
    <div className="mx-auto">
      <h1 className="text-xl font-bold py-5 text-center">List Categories</h1>
      <div className="relative overflow-x-auto shadow-md mt-5">
        <AddCategory/>
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
                          ACTION
                      </th>
                  </tr>
              </thead>
              <tbody>
                {categories.data.map((category, index) => (
                    <tr key={category.id} className="text-black">
                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                            {index + 1}
                        </th>
                        <td className="px-6 py-4">
                            {category.name}
                        </td>
                        <td className="px-6 py-4 flex justify-center">
                          <UpdateCategory {...category}/>
                          |
                          <DeleteCategory {...category}/>
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
