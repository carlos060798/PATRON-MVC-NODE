# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

  const getCounters = async () => {
    let token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const request = await axios.get(
      `http://localhost:4100/api/users/counter/${userId}`,
      config
    );
    const { data, status } = request;
    const { following, followed, publications } = data;
    setCounters({ following, followed, publications });
  };
  const getPublications = async (nextPage = 1) => {
    let token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const request = await axios.get(
      `http://localhost:4100/api/public/user/${userId}/${nextPage}`,
      config
    );

    const { data, status } = request;
    const { publications } = data;
    console.log(publications);
    setPublics(publications);
    if (status == 200) {
      let newPublications= publications;

      if(publics.length >= 1){
        newPublications = [...publics, ...newPublications];
      }
      setPublics(newPublications);

    }
  };
  const newPage = () => {
     let pagenext= page + 1;
    setPage(pagenext);
    getPublications(pagenext);
  }