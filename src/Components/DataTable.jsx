import PropTypes from 'prop-types';
import { useTable, usePagination } from 'react-table';
import '../css/DataTable.css';

const DataTable = ({ columns, data, pageCount, gotoPage, previousPage, nextPage, canPreviousPage, canNextPage, pageIndex }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 }, manualPagination: true },
    usePagination
  );

  const pageRange = 2; // Número de páginas a mostrar a cada lado de la página actual
  const startPage = Math.max(0, pageIndex - pageRange);
  const endPage = Math.min(pageCount - 1, pageIndex + pageRange);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="table-container">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  key={column.id}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination-container">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="page-button"
        >
          {'«'}
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="page-button"
        >
          ‹
        </button>
        {startPage > 0 && (
          <>
            {startPage > 1 && <span className="pagination-ellipsis">...</span>}
            {Array.from({ length: Math.min(startPage, 2) }, (_, index) => (
              <button
                key={index}
                onClick={() => gotoPage(index)}
                className={`page-button ${pageIndex === index ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </>
        )}
        {pages.map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => gotoPage(pageNumber)}
            className={`page-button ${pageIndex === pageNumber ? 'active' : ''}`}
          >
            {pageNumber + 1}
          </button>
        ))}
        {endPage < pageCount - 1 && (
          <>
            {endPage < pageCount - 2 && <span className="pagination-ellipsis">...</span>}
            {Array.from({ length: Math.min(pageCount - endPage - 1, 2) }, (_, index) => (
              <button
                key={endPage + 1 + index}
                onClick={() => gotoPage(endPage + 1 + index)}
                className={`page-button ${pageIndex === endPage + 1 + index ? 'active' : ''}`}
              >
                {endPage + 2 + index}
              </button>
            ))}
          </>
        )}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="page-button"
        >
          ›
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="page-button"
        >
          {'»'}
        </button>
      </div>
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  pageCount: PropTypes.number.isRequired,
  gotoPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  canPreviousPage: PropTypes.bool.isRequired,
  canNextPage: PropTypes.bool.isRequired,
  pageIndex: PropTypes.number.isRequired,
};

export default DataTable;