import React, {useState, useEffect} from "react"
import PropTypes from "prop-types"
import {ModalWindow, Overlay, Img} from "./Modal.styled"

const Modal = (largeImageURL, showModal, closeModal) => {

  // componentDidMount() {
  //   window.addEventListener("keydown", handleKeyDown)
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("keydown", handleKeyDown)
  // }

 const handleKeyDown = e => {
    if (e.code === "Escape") {
closeModal()
    }
  }

 const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
     closeModal()
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
  showModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired
}

export default Modal
