import { useEffect } from "react";
import { createPortal } from "react-dom";
import s from "../Modal/Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

function Modal({ closeModal, image }) {
  useEffect(() => {
    window.addEventListener("keydown", hendelKeydown);
    return () => {
      window.removeEventListener("keydown", hendelKeydown);
    };
  });

  const hendelKeydown = (event) => {
    if (event.code === "Escape") {
      closeModal();
    }
  };

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={image.src} alt={image.alt} />
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.hendelKeydown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.hendelKeydown);
//   }

//   hendelKeydown = (e) => {
//     if (e.code === "Escape") {
//       this.props.closeModal();
//     }
//   };

//   handleBackdropClick = (event) => {
//     if (event.currentTarget === event.target) {
//       this.props.closeModal();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={s.overlay} onClick={this.handleBackdropClick}>
//         <div className={s.modal}>
//           <img src={this.props.image.src} alt={this.props.image.alt} />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }

// export default Modal;
