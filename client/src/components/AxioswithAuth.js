export default axiosWithAuth = () => {
    return axios.create({
        headers: {
            authorization: sessionStorage.getItem("token")
        }
    });
  };