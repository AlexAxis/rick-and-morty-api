import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import './Table.scss'

const CSdiv = styled.div`
  @media screen and (max-width: 1000px) {
    tr > td {
      ${(props) => {
        let styles = ''
        for (let i = 0; i < props.columns.length; i += 1) {
          if (
            Object.prototype.hasOwnProperty.call(props.columns[i], 'columnName')
          ) {
            styles += `&:nth-child(${i + 1}):before {content: ' ${
              props.columns[i].columnName
            }:';}`
          }
        }
        return css`
          ${styles}
        `
      }}
    }
  }
`

function Pagination({ currentPage, numPages, setPage }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && setPage) {
      let value = parseInt(e.target.value, 10)
      if (value < 1 || !value) {
        value = 1
      } else if (value > numPages || !value) {
        value = numPages
      }
      setPage(value)
    }
    // if (e.key === 'ArrowDown') {
    //   let value = parseInt(e.target.value, 10)
    //   if (value < 1 || !value) {
    //     value = 1
    //   }
    //   setPage(value)
    // }
  }
  return (
    <div className="pagination__wrapper">
      <input
        className="prev"
        type="button"
        disabled={currentPage === 1}
        onClick={() => setPage(1)}
        value="&#8678; first (1)"
      />

      <input
        type="button"
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
        value="previous"
      />
      <div>
        <input
          type="number"
          disabled={numPages === 1}
          min="1"
          max={numPages}
          placeholder={currentPage}
          onKeyDown={handleKeyDown}
        />
      </div>

      <input
        type="button"
        disabled={currentPage === numPages}
        onClick={() => setPage(currentPage + 1)}
        value="next"
      />

      <input
        className="next"
        type="button"
        disabled={currentPage === numPages}
        onClick={() => setPage(numPages)}
        value={`last (${numPages}) `.concat(String.fromCodePoint(8680))}
      />
    </div>
  )
}
/**
 * This is a resusable list component that renders dynamically the data that is passed into it by props
 */
export default function Table({ ...props }) {
  const [lines, setLines] = useState([])
  const [expanded, setExpanded] = useState({})
  const [filters, setFilters] = useState({})

  const {
    data,
    expandedDefault,
    columns,
    title,
    paginationBottom,
    currentPage,
    numPages,
    setPage,
    expandedRow,
    viewPagination
  } = props // destructuring

  useEffect(() => {
    const expandedArray = {}
    const emptyFilters = {}
    data.forEach((item, i) => {
      expandedArray[i] = expandedDefault
    })
    columns.forEach((item) => {
      if (item.filterable) {
        emptyFilters[item.accessor] = ''
      }
    })
    setLines(data)
    setExpanded(expandedArray)
    setFilters(emptyFilters)
  }, [data])

  useEffect(() => {
    let result = null
    let newLines = [...data]
    if (Object.keys(filters).length > 0) {
      Object.keys(filters).forEach((key) => {
        result = newLines.filter((item) =>
          item[key].toString().startsWith(filters[key])
        )
        newLines = result
      })
      setLines(result)
    } else {
      setLines(newLines)
    }
  }, [filters])

  const handleChange = (e, valueToFilter) => {
    setFilters({ ...filters, [valueToFilter]: e.target.value })
  }

  const handleSort = (valueToSort) => {
    let newLines = JSON.parse(JSON.stringify(lines))
    newLines = newLines.sort((a, b) => {
      const nameA = a[valueToSort]
      const nameB = b[valueToSort]
      if (typeof nameA === 'number') {
        return nameA - nameB
      }
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })

    setLines(newLines)
  }

  const handleExpanded = (valueToExpand) => {
    setExpanded({ ...expanded, [valueToExpand]: !expanded[valueToExpand] })
  }

  const stopEventBubbling = (e) => {
    e.stopPropagation()
  }

  return (
    <>
      <CSdiv {...props} className="table_wrapper">
        <div className="header">{title}</div>
        {viewPagination && !paginationBottom && (
          <Pagination
            currentPage={currentPage}
            numPages={numPages}
            setPage={setPage}
          />
        )}

        <table cellSpacing="0">
          <thead>
            <tr>
              {columns.length !== 0 &&
                columns.map((item) => {
                  const { accessor, columnName, filterable, sortable } = item // destructuring
                  return (
                    <th
                      className={sortable === true ? 'sort' : ''}
                      onClick={() => handleSort(accessor)}
                    >
                      <div>
                        <textbox onClick={() => handleSort(accessor)}>
                          {columnName} {sortable === true && <>&#8693;</>}
                        </textbox>
                        {filterable === true && (
                          <input
                            type="text"
                            value={filters[accessor]}
                            onClick={stopEventBubbling}
                            onChange={(e) => handleChange(e, accessor)}
                          />
                        )}
                      </div>
                    </th>
                  )
                })}
            </tr>
          </thead>

          <tbody>
            {lines.length !== 0 ? (
              lines.map((item, i) => (
                <>
                  <tr className="expandable" onClick={() => handleExpanded(i)}>
                    {columns.map((col) => {
                      const { image, accessor } = col // destructuring
                      if (image) {
                        return (
                          <td>
                            <img src={item[accessor]} alt={item[accessor]} />
                          </td>
                        )
                      }
                      return <td className="rowValue">{item[accessor]}</td>
                    })}
                  </tr>
                  {expanded[i] === true && expandedRow && (
                    <td colSpan={columns.length}>{expandedRow(item)}</td>
                  )}
                </>
              ))
            ) : (
              <tr>
                <td style={{ textAlign: 'center' }} colSpan={columns.length}>
                  no data
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {viewPagination && paginationBottom && (
          <Pagination
            currentPage={currentPage}
            numPages={numPages}
            setPage={setPage}
          />
        )}
      </CSdiv>
    </>
  )
}

Table.propTypes = {
  /** Title that will appear on top of the list */
  title: PropTypes.string,
  /** Data that will appear on the list */
  data: PropTypes.array,
  /** Columns information (by order of appeareance) ------------------------------------------
   * accessor = key of the data row -----------------------------------------------------------
   * columnName = name that will be seen on the header of the table -------------------------
   * filterable = If true, the column will have a text input filter option ---------------------------
   * sortable = If true, the column will have a sort option --------------------------------------
   * image = If true, the value of the row will render an image (instead of an url text)
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      accessor: PropTypes.string.isRequired,
      columnName: PropTypes.string,
      filterable: PropTypes.bool,
      sortable: PropTypes.bool,
      image: PropTypes.bool
    })
  ),
  /** If true, the rows will expand more information */
  expandedDefault: PropTypes.bool,
  /** Component that will be rendered as new row below the clicked row */
  expandedRow: PropTypes.element,
  /** If true, the pagination will appear */
  viewPagination: PropTypes.bool,
  /** If false, the pagination will appear at the top of the list */
  paginationBottom: PropTypes.bool,
  /** Number of the current page of the list */
  currentPage: PropTypes.number,
  /** Number of pages available of the list */
  numPages: PropTypes.number,
  /** Function that triggers the change of page in the parent component */
  setPage: PropTypes.func
}

Table.defaultProps = {
  title: '',
  data: [],
  columns: [],
  expandedDefault: false,
  viewPagination: false,
  paginationBottom: true,
  currentPage: 1,
  numPages: 1
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  numPages: PropTypes.number,
  setPage: PropTypes.func
}
