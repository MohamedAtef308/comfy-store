import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { generateAmount } from "../utils";

const PaginationContainer = () => {
  const { pageCount, page } = useLoaderData().meta.pagination;
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const pages = generateAmount(pageCount);

  const handlePageChange = (pageNumber) => {
    const updatedSearch = new URLSearchParams(search);
    updatedSearch.set("page", pageNumber);

    const updatedUrl = `${pathname}?${updatedSearch.toString()}`;
    navigate(updatedUrl);
  };

  if (pageCount < 2) return null;
  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        {
          // prev
          page - 1 > 0 && (
            <button
              type="button"
              onClick={() => {
                handlePageChange(page - 1);
              }}
              className="btn btn-xs sm:btn-md join-item"
            >
              Prev
            </button>
          )
        }

        {/* numbers */}
        {pages.map((pageNum) => (
          <button
            type="button"
            key={pageNum}
            onClick={() => {
              handlePageChange(pageNum);
            }}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              pageNum === page && "bg-base-300 border-base-300"
            }`}
          >
            {pageNum}
          </button>
        ))}

        {
          // next
          page + 1 <= pageCount && (
            <button
              type="button"
              onClick={() => {
                handlePageChange(page + 1);
              }}
              className="btn btn-xs sm:btn-md join-item"
            >
              Next
            </button>
          )
        }
      </div>
    </div>
  );
};

export default PaginationContainer;
