import { useQuery } from "@vigilio/preact-fetching"
import usePaginator from "@vigilio/preact-paginator"
import { useEffect } from "preact/hooks"
import { PokemonAPI } from "../validations/types/pokemon"

const Pokemons = () => {
  const {updateData, pagination} = usePaginator({
    limit: 10,
    offset: 0
  })

  const { refetch, data } = useQuery<PokemonAPI,unknown>(
    "pokemon",
    (url) => {
      const params = new URLSearchParams();
      params.set("limit", String(pagination.value.limit));
      params.set("offset", String(pagination.value.offset));
      return fetch(`https://pokeapi.co/api/v2/${url}?${params}`).then((res) =>
        res.json()
      );
    },
    {
      onSuccess: (data) => {
        updateData({ total: data.count });
      },
    }
  );
  useEffect(() => {
    refetch()
  }, [pagination.value.limit, pagination.value.offset])
  
  return (
    <div>
      <h1 className="text-4xl font-bold leading-loose">
        Pokemon API usePaginator
      </h1>
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-gray-100 uppercase text-start">
              ID
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-100 uppercase text-start">
              Nombre
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-100 uppercase text-start">
              Más info
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-100 uppercase text-start">
              Imagen
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {data?.results.map((p, i) => (
            <tr key={p.name}>
              <td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
                {pagination.value.offset + i + 1}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
                {p.name}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
                {p.url}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    pagination.value.offset + i + 1
                  }.png`}
                  alt=""
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
}

export default Pokemons