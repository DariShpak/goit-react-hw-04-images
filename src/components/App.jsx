import React, {useState, useEffect} from "react"
import Searchbar from "./Searchbar/Searchbar"
import {LoaderIcon} from "./Loader/Loader"
import ImagesGallery from "./ImagesGallery/ImagesGallery"
import Modal from "./Modal/Modal"
import Button from "./Button/Button"
import Credits from "./Credits/Credits"
import {getAllImages} from "helpers/fetch/api"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {Container, Error, ErrorText} from "./App.styled"

export default function App() {
  const [searchName, setSearchName] = useState("")
  const [page, setPage] = useState(1)
  const [gallery, setGallery] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [largeImageURL, setLargeImgURL] = useState("")

  useEffect(
    () => {
      if (searchName.trim() === "") {
        return
      }

      const fetchImages = async () => {
        try {
          setIsLoading(true)
          const response = await getAllImages(searchName, page)
          const newGallery = response.data.hits

          if (newGallery.length === 0 && page === 1) {
            setGallery([])
            return toast.info(`No images found for ${searchName}`)
          } else {
            setGallery(prevState => [...prevState, ...newGallery])
            setError(null)
          }
        } catch (error) {
          setError(error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchImages()
    },
    [page, searchName]
  )

  const handleSubmit = event => {
    event.preventDefault()
    const imgName = event.target[0].value.toLowerCase()

    if (searchName === imgName) {
      return toast.info(`Oh, you already watching ${searchName} images`)
    } else {
      setSearchName(imgName)
      setPage(1)
      setGallery([])
      setError(null)
    }
  }

  const toggleModal = largeImageURL => {
    setShowModal(!showModal)
    setLargeImgURL(largeImageURL)
  }

  const loadMore = () => setPage(prevState => prevState + 1)

  const showLoadMoreButton = gallery.length > 0 && !isLoading

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <LoaderIcon />}
      {error &&
        <Error>
          <ErrorText>
            "{error}"
          </ErrorText>
        </Error>}
      <ImagesGallery gallery={gallery} toggleModal={toggleModal} />
      {showModal &&
        <Modal largeImageURL={largeImageURL} toggleModal={toggleModal} />}
      {showLoadMoreButton && <Button onClick={loadMore} />}
      <Credits />
      <ToastContainer autoClose={3000} pauseOnHover={false} theme="colored" />
    </Container>
  )
}

