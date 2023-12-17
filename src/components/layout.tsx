import { sweetAlert, sweetModal } from "@vigilio/sweet";
import { Link, useRoute } from "wouter";

const ActiveLink = (props: any) => {
  const [isActive] = useRoute(props.href);
  return (
      <Link
        href={props.href}
        class={`relative inline-block w-full h-full px-4 py-5 mx-2 font-medium leading-tight text-center duration-300 ease-out md:py-2 ${isActive?'text-white': 'group hover:text-white'} md:w-auto md:px-2 lg:mx-3 md:text-center`}
      >
        <span>{props.children}</span>
        <span
          className={`absolute bottom-0 h-px duration-300 ease-out ${
            isActive
              ? "w-full left-0"
              : "left-1/2 w-0 group-hover:left-0 group-hover:w-full"
          } translate-y-px bg-gradient-to-r md:from-gray-700 md:via-gray-400 md:to-gray-700 from-gray-900 via-gray-600 to-gray-900`}
        ></span>
      </Link>
  );
};


const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <section class="w-full px-3 antialiased bg-gradient-to-br from-gray-900 via-black to-gray-800 lg:px-6 min-h-screen">
        <div class="mx-auto max-w-7xl">
          <nav class="flex items-center w-full h-24 select-none">
            <div class="relative flex flex-wrap items-start justify-between w-full mx-auto font-medium md:items-center md:h-24 md:justify-between">
              <Link
                href="/"
                class="flex items-center w-1/4 py-4 pl-6 pr-4 space-x-2 font-extrabold text-white md:py-0"
              >
                Robert
              </Link>
              {/*  :class="{'flex': showMenu, 'hidden md:flex': !showMenu }" */}
              <div class="absolute z-50 flex-col items-center justify-center w-full h-auto px-2 text-center text-gray-400 -translate-x-1/2 border-0 border-gray-700 rounded-full md:border md:w-auto md:h-10 left-1/2 md:flex-row md:items-center">
                <ActiveLink href="/posts">Publicaciones</ActiveLink>
                <ActiveLink href="/pokemon">Pokemon</ActiveLink>
                <ActiveLink href="/characters">Rick y morty</ActiveLink>
              </div>
              {/* :class="{'flex': showMenu, 'hidden': !showMenu }" */}
              <div class="fixed top-0 left-0 z-40 items-center hidden w-full h-full p-3 text-sm bg-gray-900 bg-opacity-50 md:w-auto md:bg-transparent md:p-0 md:relative md:flex">
                <div class="flex-col items-center w-full h-full p-3 overflow-hidden bg-black bg-opacity-50 rounded-lg select-none md:p-0 backdrop-blur-lg md:h-auto md:bg-transparent md:rounded-none md:relative md:flex md:flex-row md:overflow-auto">
                  <div class="flex flex-col items-center justify-end w-full h-full pt-2 md:w-full md:flex-row md:py-0">
                    <button
                      type="button"
                      aria-label="abrir Toast"
                      class="w-full py-5 mr-0 text-center text-gray-200 md:py-3 md:w-auto hover:text-white md:pl-0 md:mr-3 lg:mr-5"
                      onClick={() => sweetAlert({
                        title: 'Hola'
                      })}
                    >
                      Toast
                    </button>
                    <button
                      type="button"
                      aria-label="abrir Modal"
                      class="inline-flex items-center justify-center w-full px-4 py-3 md:py-1.5 font-medium leading-6 text-center whitespace-no-wrap transition duration-150 ease-in-out border border-transparent md:mr-1 text-gray-600 md:w-auto bg-white rounded-lg md:rounded-full hover:bg-white focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700"
                      onClick={() => sweetModal({
        title: 'hola'
    })}
                    >
                      Modal
                    </button>
                  </div>
                </div>
              </div>
              {/* @click="showMenu = !showMenu" */}
              <div class="absolute right-0 z-50 flex flex-col items-end translate-y-1.5 w-10 h-10 p-2 mr-4 rounded-full cursor-pointer md:hidden hover:bg-gray-200/10 hover:bg-opacity-10 min-h-screen h-full">
                <svg
                  class="w-6 h-6"
                  x-show="!showMenu"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  x-cloak
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                <svg
                  class="w-6 h-6"
                  x-show="showMenu"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  x-cloak
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
            </div>
          </nav>
          {children}
        </div>
      </section>
    </>
  );
}

export default Layout