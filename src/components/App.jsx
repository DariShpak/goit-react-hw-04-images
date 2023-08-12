import {useState, useEffect} from "react"
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

const App = () => {
  const [searchName, setSearchName] = useState("")
  const [largeImageURL, setLargeImageUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [page, setPage] = useState("")
  const [error, setError] = useState(null)
  const [gallery, setGallery] = useState([])

  // state = {
  //   searchName: "",
  //   gallery: [],
  //   largeImageURL: "",
  //   isLoading: false,
  //   showModal: false,
  //   page: "",
  //   error: null
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.searchName !== this.state.searchName ||
  //     prevState.page !== this.state.page
  //   ) {
  //     this.fetchImages()
  //   }
  // }

  const fetchImages = async () => {
    if (searchName.trim() === "") {
      setGallery([])
      return toast.error(
        "Oh, we have nothing to search. Please enter the keyword to find images"
      )
    }

    try {
      setIsLoading(true)
      const response = await getAllImages(searchName, page)
      const gallery = response.data.hits

      if (gallery.length === 0 && page === 1) {
       setGallery([])
        return toast.info(`No images found for ${searchName}`)
      } else {
        this.setState(prevState => ({
          gallery: page === 1 ? gallery : [...prevState.gallery, ...gallery],
          error: null
        }))
      }
    } catch (error) {
      setError({error})
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    const imgName = event.target[0].value.toLowerCase()

    if (searchName === imgName) {
      return toast.info(`Oh, you already watching ${searchName} images`)
    }
    setSearchName(imgName)
    setPage(1)
  }

  const loadMore = () => setPage(prevState => prevState.page + 1)
  

  const openModal = largeImageURL => {
    setShowModal(true)
    setLargeImageUrl(largeImageURL)
  }

  const closeModal = () => setShowModal(false)
  

  const openLoading = () => setIsLoading(true)
  const closeLoading = () => setIsLoading(false)

  const showLoadMoreButton = gallery.length > 0

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <LoaderIcon openLoading={openLoading} closeLoading={closeLoading } />}
      {error &&
        <Error>
          <ErrorText>
            "{error}"
          </ErrorText>
        </Error>}
      <ImagesGallery
        gallery={gallery}
        openModal={openModal}
        closeModal={closeModal}
      />
      {showModal &&
        <Modal
          largeImageURL={largeImageURL}
          openModal={openModal}
          closeModal={closeModal}
        />}
      {showLoadMoreButton && <Button onClick={loadMore} />}
      <Credits />
      <ToastContainer autoClose={3000} pauseOnHover={false} theme="colored" />
    </Container>
  )
}

export default App
