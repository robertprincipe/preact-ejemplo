import { useQuery } from "@vigilio/preact-fetching";
import { useTable } from "@vigilio/preact-table";
import { Result, RickAndMortyAPI } from "../validations/types";
import { useEffect } from "preact/hooks";
import { sweetAlert } from "@vigilio/sweet";

const CharactersPage = () => {
  const { updateData, table, pagination, search } = useTable<Result, "", any>({
    columns: [
      {
        key: "id",
        header: "ID",
      },
      {
        key: "name",
        header: "Nombre",
      },
      {
        key: "image",
        header: "Avatar",
        cell: (props) => <img src={props.image} width={50} height={50} alt="" />,
      },
    ],
  });

  const { refetch, data } = useQuery<RickAndMortyAPI, unknown>(
    "https://rickandmortyapi.com/api/character",
    (url) => {
        const params = new URLSearchParams()
        params.set("page", String(pagination.page++));
        params.set("name", String(search.value));
      return fetch(`${url}?${params}`).then((res) => res.json());
    },
    {
        onSuccess: (data) => {
          updateData({ count: data.info.count, result: data.results });        
        },
        onError: () => {
          console.log('eorkerok')
          sweetAlert({
            title: 'Error no hay resultados',
          })
        }
    }
  );

  useEffect(() => {
      refetch()
    // updateData({ count: data?.info.count ?? 0, result: data?.results ?? [] });
  }, [pagination.value.limit, pagination.value.offset, search.value]);
  

  return (
    <div>
      <h1 className="text-4xl font-bold leading-loose">Rick y Morty API useTable</h1>
      <input
        placeholder="Buscar..."
        onChange={(e) =>
          search.onSearchByName((e.target as HTMLInputElement).value)
        }
        className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
      />
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            {table.Thead().map(({ key, value }) => (
              <th
                className="px-6 py-3 text-xs font-medium text-gray-100 uppercase text-start"
                key={key}
              >
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {table.TBody.Row().map((v) => (
            <tr key={v.id}>
              {table.TBody.Cell(v).map(({ key, value }) => (
                <td
                  key={key}
                  className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div>
        <button onClick={() => pagination.onBackPage()}>-</button>
        {pagination.paginator.pages.map((page) => (
          <div>{page}</div>
        ))}
        <button onClick={() => pagination.onNextPage()}>+</button>
      </div> */}
      <nav class="flex items-center gap-x-1">
        <button
          type="button"
          onClick={() => pagination.onBackPage()}
          class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
        >
          <svg
            class="flex-shrink-0 w-3.5 h-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span aria-hidden="true" class="sr-only">
            Previous
          </span>
        </button>

        <div class="flex items-center gap-x-1">
          {pagination.paginator.pages.map((p, i) => (
            <button
              key={p}
              type="button"
              class={`min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-white dark:focus:bg-white/10 ${
                pagination.page === p
                  ? "border border-gray-200 bg-white/10"
                  : ""
              }`}
              onClick={() => pagination.onChangePage(p)}
              aria-current="page"
            >
              {p}
            </button>
          ))}
        </div>
        <button
          type="button"
          class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
          onClick={() => pagination.onNextPage()}
        >
          <span aria-hidden="true" class="sr-only">
            Next
          </span>
          <svg
            class="flex-shrink-0 w-3.5 h-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default CharactersPage;
