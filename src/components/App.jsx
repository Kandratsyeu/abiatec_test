import Header from './Header'
import ContentList from './ContentList'
import { useFetchContent } from '../hooks/useFetchContent'
import './App.css'
import Button from './Button'

const App = () => {
  const [content, fetch, fetchMore] = useFetchContent()

  return (
    <div className="App">
      <Header onSearch={fetch} />
      <h1>Simple content list</h1>
      <ContentList content={content} />
      <Button onClick={fetchMore}>More</Button>
      {/* TODO: Put FetchMoreButton component here */}
    </div>
  )
}

export default App
