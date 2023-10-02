import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function useUser() {
  const [users, setUser] = useState([]);
  const [page, setPage] = useState(1);
  const [following, setFollowing] = useState([]);
  const [followed, setFollowed] = useState([]);
  let token = localStorage.getItem("token");

  useEffect(() => {
    getUser(1);
  }, []);

  const getUser = async (pageid) => {
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
      setFollowing(data.userfollowings);
      console.log({ users: newUsers, page: pageid });
    }
  };

  const nextPage = () => {
    let nextPage = page + 1;
    setPage(nextPage);
    getUser(nextPage);

    console.log({ users: users, page: nextPage, following: following });
  };


  const handleLike = async (userId) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const body = {
      followed: userId,
    };

    const response = await axios.post(
      "http://localhost:4100/api/follow/save",
      body,
      config
    );

    // Manejar la respuesta del servidor
    const { data, status } = response;

    if (status == 200) {
      setFollowing([...following,userId]);
      console.log(data.user);
    }
  };

  const handleDislike = async (userId) => {
    console.log(userId);
    const token = localStorage.getItem("token");
    console.log(token);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };


    const response = await axios.delete(`http://localhost:4100/api/follow/delete/${userId}`,config );

    // Manejar la respuesta del servidor
    const { data, status } = response;

    if (status == 200) {
      setFollowing(following.filter((follow) => follow !== userId));
      console.log(data.user);
    }
  };
  return {
    users,
    getUser,
    nextPage,
    following,
    handleLike,
    handleDislike,
  };
}

export default useUser;
