import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { IconSearch } from "@tabler/icons-react";
import { useGetPagedCategoriesQuery } from "app/services/categoryService.ts";
import { useGetPagedPizzasQuery } from "app/services/pizzaService.ts";
import { Link } from "react-router-dom";

import React, { useRef } from "react";

interface SearchModalProps {
  isOpen: boolean;
  close: () => void;
}

const SearchModal: React.FC<SearchModalProps> = (props) => {
  const { isOpen, close } = props;
  const searchInput = useRef<HTMLInputElement>(null);

  const { data: pizzas } = useGetPagedPizzasQuery({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data: categories } = useGetPagedCategoriesQuery({
    pageIndex: 0,
    pageSize: 3,
  });

  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 backdrop-opacity-20 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center bg-black/50 p-4">
            <TransitionChild
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-out duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <DialogPanel className="bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 overflow-auto max-w-2xl w-full max-h-full rounded-lg shadow-lg">
                {/* Search form */}
                <form className="border-b border-slate-200 dark:border-slate-700">
                  <div className="relative">
                    <label htmlFor="quick-search" className="sr-only">
                      Search
                    </label>
                    <input
                      id="quick-search"
                      className="w-full dark:text-slate-300 bg-white dark:bg-slate-800 border-0 focus:ring-transparent placeholder-slate-400 dark:placeholder-slate-500 appearance-none py-3 pl-10 pr-4"
                      type="search"
                      placeholder="Search Anything…"
                      ref={searchInput}
                    />
                    <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                      <svg
                        className="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-4 mr-2"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                        <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                      </svg>
                    </button>
                  </div>
                </form>
                <div className="py-4 px-2">
                  {/* Pizzas */}
                  <div className="mb-3 last:mb-0">
                    <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase px-2 mb-2">Pizzas</div>

                    <ul className="text-sm">
                      {pizzas?.data.map((pizza) => (
                        <li key={pizza.id}>
                          <Link
                            className="flex items-center p-2 text-slate-800 dark:text-slate-100 hover:text-white hover:bg-indigo-500 rounded group"
                            to={`/pizzas/edit/${pizza.id}`}
                          >
                            <IconSearch className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3" />
                            <span>{pizza.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/*Categories */}
                  <div className="mb-3 last:mb-0">
                    <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase px-2 mb-2">Categories</div>
                    <ul className="text-sm">
                      {categories?.data?.map((category) => (
                        <li key={category.id}>
                          <Link
                            className="flex items-center p-2 text-slate-800 dark:text-slate-100 hover:text-white hover:bg-indigo-500 rounded group"
                            to={`/categories/edit/${category.id}`}
                          >
                            <IconSearch className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3" />
                            <span>{category.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SearchModal;
