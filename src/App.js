import React, { useState, useEffect } from 'react'
import Table from './components/Table'

function App() {
  const [characters, setCharacters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [numPages, setNumPages] = useState(0)

  // * Fetch -> GET characters
  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
      .then((response) => response.json())
      .then((json) => {
        setCharacters(json.results)
        setNumPages(json.info.pages)
      })
      .catch((err) => {
        throw err
      })
  }, [currentPage])

  const columns = [
    { accessor: 'id', columnName: 'ID', sortable: true },
    { accessor: 'name', columnName: 'NAME', filterable: true, sortable: true },
    {
      accessor: 'status',
      columnName: 'STATUS',
      filterable: true
    },
    {
      accessor: 'species',
      columnName: 'SPECIES',
      filterable: true,
      sortable: true
    },
    { accessor: 'image', image: true }
  ]

  const expandedRow = (item) => {
    const { gender, episode } = item // destructuring
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left'
        }}
      >
        <div>Gender: {gender}</div>
        <div>Number of Episodes: {episode.length}</div>
      </div>
    )
  }

  return (
    <div
      style={{
        marginBottom: '200px',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Table
        title="Rick &amp; Morty characters"
        columns={columns}
        data={characters}
        currentPage={currentPage}
        numPages={numPages}
        setPage={setCurrentPage}
        viewPagination
        paginationBottom={false}
        expandedRow={expandedRow}
        expandedDefault={false}
      />
    </div>
  )
}

export default App
