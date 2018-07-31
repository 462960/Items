import React from 'react';

const SearchResultsTable = () => {
  return (
    <div className="block-one-invectory-right pad-0">
      <table className="table-inventor table-head-search">
        <thead className="table-head">
          <tr className="wrap-planning-list-header">
            <td className="wrap-planning-list-header-title p-r-20 bord-r">
              Tasks
            </td>
            <td className="wrap-planning-list-header-date p-l-20">
              <span className="wrap-planning-list-header-date-number p-r-5">
                13
              </span>
              <span className="wrap-planning-list-header-date-day-top">
                results
              </span>
            </td>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          <tr>
            <td>
              <svg className="svg-cube">
                <use xlinkHref="/images/sprite.svg#cube" />
              </svg>
            </td>
            <td>
              {' '}
              Title<span>Айфон</span>Тайвань
            </td>
          </tr>
          <tr>
            <td>
              <svg className="svg-cube">
                <use xlinkHref="/images/sprite.svg#cube" />
              </svg>
            </td>
            <td>
              {' '}
              Title<span>Айфон</span>Тайвань
            </td>
          </tr>
        </tbody>
        {/* Table body end */}
      </table>
      <div className="foot-search">
        <span className="text-gray">
          Displaying 1 to 20 of 235 collaborators
        </span>
        <div className="ta-r">
          <button className="colaborator-pagination-round-btn m-r-5">
            <img
              className="left-arrow"
              src="/images//left-arrow.svg"
              alt="left"
            />
          </button>
          <span className="header-text m-r-5">Page</span>
          <input
            className="colaborator-pagination-white-window m-r-5"
            type="text"
            placeholder="1"
          />
          <span className="header-text m-r-5">of 4</span>
          <button className="colaborator-pagination-round-btn">
            <img
              className="right-arrow"
              src="/images//right-arrow.svg"
              alt="right"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsTable;
