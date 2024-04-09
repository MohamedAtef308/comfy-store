import React from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";

const ComplexPaginationContainer = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { data, meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);

    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNum, active }) => {
    return (
      <button
        key={pageNum}
        onClick={() => {
          handlePageChange(pageNum);
        }}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          active && "bg-base-300 border-base-300"
        }`}
      >
        {pageNum}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageBtns = [];
    pageBtns.push(addPageButton({ pageNum: 1, active: page === 1 }));

    if (page > 2) {
      pageBtns.push(
        <button key="dots-1" className="join-item btn btn-xs sm:btn-md">
          ...
        </button>
      );
    }

    if (page !== 1 && page !== pageCount) {
      pageBtns.push(addPageButton({ pageNum: page, active: true }));
    }

    if (page < pageCount - 1) {
      pageBtns.push(
        <button key="dots-2" className="join-item btn btn-xs sm:btn-md">
          ...
        </button>
      );
    }

    pageBtns.push(
      addPageButton({ pageNum: pageCount, active: page === pageCount })
    );
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          onClick={() => {
            page < 2 ? handlePageChange(pageCount) : handlePageChange(page - 1);
          }}
          className="btn btn-xs sm:btn-md join-item"
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          onClick={() => {
            page > pageCount - 1
              ? handlePageChange(1)
              : handlePageChange(page + 1);
          }}
          className="btn btn-xs sm:btn-md join-item"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ComplexPaginationContainer;
