import { useState, useEffect } from "react";
import axios from "axios";

function useUser() {
  const [users, setUser] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async (pageid) => {
    let token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const response = await axios.get(
      `http://localhost:4100/api/users/list/${pageid}`,
      config
    );
    const { data, status } = response;
    if (data.users && status == 200) {
      let newUsers = data.users;

      if (users.length >= 1) {
        newUsers = [...users, ...data.users];
      }

      setUser(newUsers);
      console.log({ users: newUsers, page: pageid });

    }
  };

  const nextPage = () => {
    let nextPage = page + 1;
    setPage(nextPage);
    getUser(nextPage);
    console.log({ users: users, page: nextPage });
  };

  return {
    users,
    getUser,
    nextPage,
  };
}

export default useUser;
