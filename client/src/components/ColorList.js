import React, { useState } from "react";
import axios from "axios";

const axiosWithAuth = () => {
  return axios.create({
    headers: {
      authorization: localStorage.getItem("token")
    }
  });
};

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log("in colorlist function", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };



  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?


    const authAxios = axiosWithAuth();
    authAxios
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(response => {
        console.log('put request', response.data)
        updateColors(
          colors.find(color => {
            if (colorToEdit.id === colors.id) {
              return (response.data);
            }
            return color;
          })
        );
        setEditing(false);
        updateColors(response.data)
      })
      .catch(err => console.log(err))
  };



  // if (colors.length === 0) {
  //   return <h2>Loading data...</h2>;
  // }

  const deleteColor = color => {
    // make a delete request to delete this color
    const authAxios = axiosWithAuth();
    authAxios
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        console.log('delete', res)
        console.log("colorToEdit", `${colorToEdit.id}`)
        // updateColors(
        //   colors.map(color => {
        //     if ( colorToEdit.id === colors.id) {
        //       return (res.data);
        //     }
        //     return color;
        //   })
        // );
        // setEditing(false);
        // updateColors(res.data)
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
