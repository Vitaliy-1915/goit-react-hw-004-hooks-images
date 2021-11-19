import { useState } from "react";
import { VscSearch } from "react-icons/vsc";
import s from "../Searchbar/Searchbar.module.css";

function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState("");

  const handleFormChange = (event) => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  const handelSubmit = (event) => {
    event.preventDefault();

    if (imageName.trim() === "") {
      alert("Enter images and photos");
      return;
    }

    onSubmit(imageName);
    setImageName("");
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handelSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.buttonLabel}>
            <VscSearch size="2em" />
          </span>
        </button>

        <input
          className={s.input}
          type="text"
          name="imageName"
          value={imageName}
          onChange={handleFormChange}
          autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;

// export class Searchbar extends Component {
//   state = {
//     imageName: "",
//   };

//   handleFormChange = (event) => {
//     this.setState({
//       imageName: event.currentTarget.value.toLowerCase(),
//     });
//   };

//   handelSubmit = (event) => {
//     event.preventDefault();

//     if (this.state.imageName.trim() === "") {
//       alert("Enter images and photos");
//       return;
//     }

//     this.props.onSubmit(this.state.imageName);
//     this.setState({ imageName: "" });
//   };

//   render() {
//     return (
//       <header className={s.searchbar}>
//         <form className={s.form} onSubmit={this.handelSubmit}>
//           <button type="submit" className={s.button}>
//             <span className={s.buttonLabel}>
//               <VscSearch size="2em" />
//             </span>
//           </button>

//           <input
//             className={s.input}
//             type="text"
//             name="imageName"
//             value={this.state.imageName}
//             onChange={this.handleFormChange}
//             autocomplete="off"
//             // autofocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }

// export default Searchbar;
