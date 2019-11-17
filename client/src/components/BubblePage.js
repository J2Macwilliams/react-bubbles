import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const axiosWithAuth = () => {
  return axios.create({
      headers: {
          authorization: localStorage.getItem("token")
      }
  });
};

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  

  useEffect(() => {
     if (!localStorage.getItem("token")) {
            console.error("Please Login!!!");
        } else {
            console.info("We are logged in");
        }
        const authAxios = axiosWithAuth();
        authAxios
            .get("http://localhost:5000/api/colors")
            .then(response => {
                // console.log('Axios with Auth response', response)
                setColorList(response.data);
            });

  },[]);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
