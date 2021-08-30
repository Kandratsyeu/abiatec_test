const ContentList = ({ content }) => {
  return (
    <ul>
      {content.map((url, index) => {
        return <img key={index} src={url} alt="character"></img>
      })}
      {console.info(`Available content: ${content}`)}
    </ul>
  )
}

export default ContentList
