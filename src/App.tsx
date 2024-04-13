import './App.css'
import SearchBar from './components/SearchBar'
import useMockData from './hooks/useMockData'

function App() {
  const { data } = useMockData()

  return (
    <main>
      <SearchBar data={data} />
    </main>
  )
}

export default App
