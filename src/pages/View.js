import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const View = () => {
  const [userInfo, setUserInfo] = useState([]);
  const { id } = useParams();
  const getUser = async (id) => {
    const res = await axios.get(`http://localhost:3001/user/${id}`);
    if (res.status === 200) {
      setUserInfo({ ...res.data[0] });
    }
  };

  useEffect(() => {
    getUser(id);
  }, [id]);

  return (
    <div className="w-full h-full flex justify-center p-4 md:p-8">
      <div className="  w-full md:w-3/6 h-full bg-slate-100 p-4 gap-4 ">
        <h1 className="text-3xl mb-8 bg-slate-300 p-2  "> User Info </h1>
        <div className=" w-full h-full grid grid-cols-1  md:grid-cols-2 place-items-center ">
          <div className="w-full gap-4 flex flex-col items-start text-[18px] ">
            <p>Name: </p>
            <p>Email: </p>
            <p>Address: </p>
          </div>
          <div className="w-full gap-4 flex flex-col items-start text-[18px]">
            <p> {userInfo.name} </p>
            <p>{userInfo.email}</p>
            <p>{userInfo.address}</p>
          </div>
        </div>
        <Link to="/">
          <button className="p-2 mt-8 bg-cyan-500 w-full">Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default View;
