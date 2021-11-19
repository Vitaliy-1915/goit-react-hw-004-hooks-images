import "./App.css";
import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Button from "./Components/Button/Button";
import Modal from "./Components/Modal/Modal";
import Api from "./Services/Api";

function App() {
  const [imageName, setImageName] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!imageName) {
      return;
    }

    setStatus("pending");

    Api.fetchApi(imageName, page)
      .then((data) => data.hits)
      .then((image) => {
        setImages((images) => [...images, ...image]);
        setStatus("resolved");

        if (page !== setPage) {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }
      })
      .catch((error) => {
        setError(error);
        setStatus("rejected");
      });
  }, [imageName, page]);

  const handleFormSubmit = (imageName) => {
    setImageName(imageName);
    resetState();
  };

  const handleButtonLoadMore = () => {
    setPage((page) => page + 1);
  };

  const toggleModal = (src, alt) => {
    // console.log(src,alt);
    setShowModal(!showModal);
    setSelectedImage({ src, alt });
  };

  const resetState = () => {
    setPage(1);
    setImages([]);
    setStatus("idle");
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      {status === "idle" && <h1>Start your search </h1>}
      {status === "pending" && (
        <Loader
          type="Watch"
          color="#00BFFF"
          height={150}
          width={150}
          timeout={3000} //3 secs
        />
      )}
      {status === "rejected" && <h1>{error.message}</h1>}
      {status === "resolved" && images.length < 1 && <h2>invalid name!!!</h2>}
      {status === "resolved" && (
        <ImageGallery images={images} openModal={toggleModal} />
      )}
      {images.length > 0 && <Button onClick={handleButtonLoadMore} />}
      {showModal && <Modal image={selectedImage} closeModal={toggleModal} />}
    </div>
  );
}

export default App;

// export class App extends Component {
//   state = {
//     imageName: "",
//     page: 1,
//     images: [],
//     error: null,
//     showModal: false,
//     selectedImage: null,
//     status: "idle",
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.imageName !== this.state.imageName) {
//       this.setState({ status: "pending", images: [], page: 1 });
//       this.getImages();
//     }

//     if (prevState.page !== this.state.page) {
//       this.setState({ status: "pending" });
//       this.getImages();
//     }

//     if (prevState.images !== this.state.images) {
//       window.scrollTo({
//         top: document.body.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }

//   getImages = () => {
//     const { imageName, page } = this.state;
//     Api.fetchApi(imageName, page)
//       .then((data) => data.hits)
//       .then((images) =>
//         this.setState((prevState) => ({
//           images: [...prevState.images, ...images],
//           status: "resolved",
//         }))
//       )
//       .catch((error) => this.setState({ error, status: "rejected" }));
//   };

//   handleFormSubmit = (imageName) => {
//     this.setState({ imageName: imageName });
//   };

//   handleButtonLoadMore = () => {
//     this.setState((prevState) => ({ page: prevState.page + 1 }));
//   };

//   toggleModal = (src, alt) => {
//     // console.log(src,alt);
//     this.setState((state) => ({
//       showModal: !state.showModal,
//       selectedImage: { src, alt },
//     }));
//   };

//   render() {
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         {this.state.status === "idle" && <h1>Start your search </h1>}
//         {this.state.status === "pending" && (
//           <Loader
//             type="Watch"
//             color="#00BFFF"
//             height={150}
//             width={150}
//             timeout={3000} //3 secs
//           />
//         )}
//         {this.state.status === "rejected" && (
//           <h1>{this.state.error.message}</h1>
//         )}
//         {this.state.status === "resolved" && this.state.images.length < 1 && (
//           <h2>invalid name!!!</h2>
//         )}
//         {this.state.status === "resolved" && (
//           <ImageGallery
//             images={this.state.images}
//             openModal={this.toggleModal}
//           />
//         )}
//         {this.state.images.length > 0 && (
//           <Button onClick={this.handleButtonLoadMore} />
//         )}
//         {this.state.showModal && (
//           <Modal
//             image={this.state.selectedImage}
//             closeModal={this.toggleModal}
//           />
//         )}
//       </div>
//     );
//   }
// }

// export default App;
