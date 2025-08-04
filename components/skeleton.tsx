export const TableSkeleton = () => {
  return (
    <table className="w-full text-gray-500 text-sm text-left">
      <thead className="bg-gray-50 text-gray-700 text-sm uppercase">
        <tr>
          <th className="px-6 py-3">#</th>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Phone Number</th>
          <th className="px-6 py-3">Created At</th>
          <th className="px-6 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="animated-pulse">
        <tr className="bg-white border-gray-50 border-b">
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-4 h-4"></div>
          </td>
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-32 h-4"></div>
          </td>
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-20 h-4"></div>
          </td>
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-32 h-4"></div>
          </td>
          <td className="flex justify-center gap-1 py-3">
            <div className="bg-gray-100 rounded w-7 h-7"></div>
            <div className="bg-gray-100 rounded w-7 h-7"></div>
          </td>
        </tr>
        <tr className="bg-white border-gray-50 border-b">
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-4 h-4"></div>
          </td>
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-32 h-4"></div>
          </td>
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-20 h-4"></div>
          </td>
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-32 h-4"></div>
          </td>
          <td className="flex justify-center gap-1 py-3">
            <div className="bg-gray-100 rounded w-7 h-7"></div>
            <div className="bg-gray-100 rounded w-7 h-7"></div>
          </td>
        </tr>
        <tr className="bg-white border-gray-50 border-b">
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-4 h-4"></div>
          </td>
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-32 h-4"></div>
          </td>
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-20 h-4"></div>
          </td>
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-32 h-4"></div>
          </td>
          <td className="flex justify-center gap-1 py-3">
            <div className="bg-gray-100 rounded w-7 h-7"></div>
            <div className="bg-gray-100 rounded w-7 h-7"></div>
          </td>
        </tr>
        <tr className="bg-white border-gray-50 border-b">
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-4 h-4"></div>
          </td>
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-32 h-4"></div>
          </td>
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-20 h-4"></div>
          </td>
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-32 h-4"></div>
          </td>
          <td className="flex justify-center gap-1 py-3">
            <div className="bg-gray-100 rounded w-7 h-7"></div>
            <div className="bg-gray-100 rounded w-7 h-7"></div>
          </td>
        </tr>
        <tr className="bg-white border-gray-50 border-b">
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-4 h-4"></div>
          </td>
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-32 h-4"></div>
          </td>
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-20 h-4"></div>
          </td>
          <td className="px-6 py-3">
            <div className="bg-gray-100 rounded w-32 h-4"></div>
          </td>
          <td className="flex justify-center gap-1 py-3">
            <div className="bg-gray-100 rounded w-7 h-7"></div>
            <div className="bg-gray-100 rounded w-7 h-7"></div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
