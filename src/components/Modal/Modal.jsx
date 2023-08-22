import React, {useEffect} from "react"
import PropTypes from "prop-types"
import {ModalWindow, Overlay, Img} from "./Modal.styled"

const Modal = ({toggleModal, largeImageURL}) => {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const handleKeyDown = e => {
    if (e.code === "Escape") {
      toggleModal()
    }
  }

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      toggleModal()
    }
  }

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <Img src={largeImageURL} width="800" height="500" />
      </ModalWindow>
    </Overlay>
  )
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired
}

export default Modal
