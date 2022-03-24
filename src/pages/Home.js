import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await axios.get("http://localhost:3001/users");
    if (res.status === 200) {
      setUsersData(res.data);
    }
  };

  const deleteUser = async (userID) => {
    if (window.confirm("Are you sure you want to delete this record!!")) {
      const res = await axios.delete(`http://localhost:3001/user/${userID}`);
      if (res.status === 200) {
        toast.success(res.data);
        getUsers();
      }
    }
  };

  //   console.log(usersData);

  return (
    <div className="w-full h-full flex justify-center p-4">
      <table className="table-auto w-full md:w-3/4 h-full mt-8 shadow-xl">
        <thead className=" bg-slate-400  ">
          <tr className=" ">
            <th className="p-4">No.</th>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Address</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user, i) => (
            <tr
              className={` ${i % 2 === 0 ? "bg-slate-200" : ""}  `}
              scope="row"
              key={user.id}
            >
              <th className="p-2"> {i + 1} </th>
              <td className="p-2"> {user.name} </td>
              <td className="p-2"> {user.email} </td>
              <td className="p-2"> {user.address} </td>
              <td className="space-x-2 p-2 ">
                <Link to={`/update/${user.id}`}>
                  <button className=" p-2 rounded-md bg-emerald-300 px-4 ">
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => deleteUser(user.id)}
                  className=" p-2 rounded-md bg-red-300 px-4 "
                >
                  Delete
                </button>

                <Link to={`/view/${user.id}`}>
                  <button className=" p-2 rounded-md bg-cyan-300 px-4 ">
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
