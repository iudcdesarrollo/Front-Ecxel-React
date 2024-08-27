import PropTypes from 'prop-types';
import { useTable, usePagination } from 'react-table';
import '../css/DataTable.css';

/* This code defines a functional component called `DataTable` in JavaScript React. The component takes
several props: `columns`, `data`, `pageCount`, `gotoPage`, `previousPage`, `nextPage`,
`canPreviousPage`, `canNextPage`, and `pageIndex`. */
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
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="page-button"
        >
          ‹
        </button>
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="page-button"
        >
          {'«'}
        </button>
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            onClick={() => gotoPage(index)}
            className={`page-button ${pageIndex === index ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="page-button"
        >
          {'»'}
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="page-button"
        >
          ›
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
  pageIndex: PropTypes.number.isRequired, // Add this line
};

export default DataTable;