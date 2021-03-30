Example of a list with 2 items and 4 columns

```js
const title = 'Title of the list'
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
const data = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
  }
]

;<Table title={title} columns={columns} data={data} />
```

Example of a list with 2 items and 4 columns and pagination on bottom

```js
const title = 'List with pagination bottom'
const columns = [
  { accessor: 'image', image: true },
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
  }
]
const data = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
  }
]

;<Table title={title} columns={columns} data={data} viewPagination={true} />
```

Example of a list with 2 items and 4 columns and pagination on top

```js
const title = 'List with pagination top'
const columns = [
  { accessor: 'id', columnName: 'ID', sortable: true },
  { accessor: 'name', columnName: 'NAME', filterable: true, sortable: true },
  { accessor: 'image', image: true },
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
  }
]
const data = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
  }
]

;<Table
  title={title}
  columns={columns}
  data={data}
  viewPagination={true}
  paginationBottom={false}
/>
```

Example of a list with an expandable property (click on a row of the list so that it expands)

```js
const title = 'List with expands'
const columns = [
  { accessor: 'id', columnName: 'ID', sortable: true },

  { accessor: 'name', columnName: 'NAME', filterable: true, sortable: true },
  {
    accessor: 'status',
    columnName: 'STATUS',
    filterable: true
  },
  { accessor: 'image', image: true },
  {
    accessor: 'species',
    columnName: 'SPECIES',
    filterable: true,
    sortable: true
  }
]
const data = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    gender: 'male'
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    gender: 'male'
  }
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
    </div>
  )
}

;<Table title={title} columns={columns} data={data} expandedRow={expandedRow} />
```
