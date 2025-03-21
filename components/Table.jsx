import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Table({
  headTitles = ["dummy", "head"],
  rowData,
  enableEdit = false,
  editLink = "#",
}) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-2 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {headTitles.map((title, index) => (
                      <th
                        key={title}
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 capitalize"
                      >
                        <p className="text-center">{title}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {rowData.length > 0 &&
                    rowData.map((data, index) => (
                      <tr key={index*Math.random()}>
                        {headTitles.map((title, index) => {
                          return (
                            <td key={title} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                              {title === "image" || title === "thumbnail" ? (
                                <div className="w-full h-full flex justify-center">
                                  <img
                                    src={data[title]}
                                    className="h-10 w-10"
                                  />
                                </div>
                              ) : (
                                data[title]
                              )}
                            </td>
                          );
                        })}

                        {enableEdit && (
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Link
                              href={editLink + "/" + data.id}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <PencilSquareIcon className="h-5 w-5 text-gray-900" />
                            </Link>
                          </td>
                        )}
                      </tr>
                    ))}

                  {rowData.length == 0 && (
                    <tr>
                      <td colSpan={headTitles.length}>
                        <p className="text-center py-5 text-xs">No Data Found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
