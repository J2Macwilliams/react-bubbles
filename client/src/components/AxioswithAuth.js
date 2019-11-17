export default const axiosWithAuth = () => {
    return axios.create({
        headers: {
            authorization: sessionStorage.getItem("token")
        }
    });
  };