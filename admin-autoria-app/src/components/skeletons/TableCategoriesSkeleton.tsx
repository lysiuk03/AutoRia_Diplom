const TableCategoriesSkeleton = () => {
  return Array.from({ length: 5 }).map((_, index) => (
    <tr
      key={index}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 animate-pulse"
    >
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div className=" min-w-10 w-10 h-10 bg-gray-200 rounded-full"></div>
      </th>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </td>
      <td className="px-6 py-4 text-right space-x-5">
        <div className="inline-block h-4 bg-gray-200 rounded w-14"></div>
        <div className="inline-block h-4 bg-gray-200 rounded w-14"></div>
      </td>
    </tr>
  ));
};

export default TableCategoriesSkeleton;
