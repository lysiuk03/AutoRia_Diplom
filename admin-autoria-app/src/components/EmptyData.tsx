import { IconPlus, IconSearch } from "@tabler/icons-react";
import { Button } from "components/ui";
import { Link } from "react-router-dom";

import React from "react";

interface IEmptyDataProps {
  pathTo?: string;
}

const EmptyData: React.FC<IEmptyDataProps> = (props) => {
  const { pathTo } = props;

  return (
    <div className="container px-4 mx-auto">
      <div className="flex items-center mt-6 text-center">
        <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
          <div className="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
            <IconSearch />
          </div>
          <h1 className="mt-3 text-lg text-gray-800 dark:text-white">No data found</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Your search did not match any items. Please try again or create add a new item.
          </p>
          {pathTo && (
            <div className="flex items-center mt-4 sm:mx-auto gap-x-3">
              <Link to={pathTo}>
                <Button variant="secondary" size="sm">
                  <IconPlus />
                  Create
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyData;
