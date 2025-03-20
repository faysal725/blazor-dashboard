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
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {rowData.length > 0 &&
                    rowData.map((data, index) => (
                      <tr key={data.email}>
                        {headTitles[0] == "S/L" && (
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold text-gray-900 sm:pl-6">
                            {index + 1}
                          </td>
                        )}

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {data[headTitles[1]]}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {data[headTitles[2]]}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {data[headTitles[3]]}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {data[headTitles[4]]}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {headTitles[5] === "image" ? (
                            <img
                              src={data[headTitles[5]]}
                              className="h-8 w-8"
                            />
                          ) : (
                            data[headTitles[5]]
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {data[headTitles[6]]}
                        </td>
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
