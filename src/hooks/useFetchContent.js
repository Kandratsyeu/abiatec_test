import { useCallback, useEffect, useState } from 'react'
import noImage from '../assets/not_found.jpg'

export const useFetchContent = () => {
  const [imgList, setImgList] = useState([])
  const [moreList, setMoreList] = useState()
  const [page, setPage] = useState(1)
  const [name, setName] = useState('')

  const fetchData = useCallback(
    async (newName) => {
      if (name === newName) {
        const images = await getImages(name, page)
        setImgList(imgList.concat(images.slice(0, 10)))
        setPage(page + 1)
        setMoreList(images.slice(10))
      } else {
        setName(newName)
        const images = await getImages(newName, 1)
        if (images.length) {
          setImgList(images.slice(0, 10))
          setPage(2)
          setMoreList(images.slice(10))
        } else {
          setMoreList([])
          setImgList([noImage])
        }
      }
    },
    [page, imgList]
  )

  const getImages = useCallback(async (name, page) => {
    return fetch(
      'https://rickandmortyapi.com/api/character/' +
        (name ? `?name=${name}&page=${page}` : `?page=${page}`)
    )
      .then((res) =>
        res
          .json()
          .then((res) =>
            res.results ? res.results.map((character) => character.image) : []
          )
      )
      .catch((e) => console.log(e))
  })

  const fetchMore = useCallback(async () => {
    if (moreList) {
      setImgList(imgList.concat(moreList))
      if (moreList.length < 10) {
        alert('no more images')
      } else {
        setMoreList(false)
      }
    } else {
      fetchData(name)
    }
  })

  useEffect(() => {
    fetchData('')
  }, [])

  return [imgList, fetchData, fetchMore]
}
