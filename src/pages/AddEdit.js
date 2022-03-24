import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  address: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, address } = initialState;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (userid) => {
    const res = await axios.get(`http://localhost:3001/user/${userid}`);
    console.log(res);
    if (res.status === 200) {
      // console.log(res.data);
      setState({ ...res.data[0] });
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const addUser = async (data) => {
    const res = await axios.post("http://localhost:3001/user", data);
    if (res.status === 200) {
      toast.success(res.data);
    } else {
      toast.error(res.data);
    }
  };

  const updateUser = async (data, id) => {
    const res = await axios.put(`http://localhost:3001/user/${id}`, data);
    if (res.status === 200) {
      toast.success(res.data);
    } else {
      toast.error(res.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!state.name || !state.email || !state.address) {
      toast.error("Please Enter Valid Data!");
    } else {
      if (!id) {
        addUser(state);
      } else {
        updateUser(state, id);
      }
      setTimeout(() => navigate("/"), 500);
    }
  };
  return (
    <div className="w-full h-full flex justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-start justify-center bg-slate-300 w-full md:w-2/5 p-6 h-full mt-8 shadow-xl"
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter Name..."
          value={state.name}
          onChange={handleChange}
          className="p-4 w-full h-full  rounded-sm "
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email..."
          value={state.email}
          onChange={handleChange}
          className="p-4 w-full h-full  rounded-sm "
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Address..."
          value={state.address}
          onChange={handleChange}
          className="p-4 w-full h-full  rounded-sm "
        />

        <input
          className="p-4 cursor-pointer bg-emerald-500 w-full h-full  rounded-sm "
          type="submit"
          value={id ? "Update" : "Add"}
          id="submit"
        />
      </form>
    </div>
  );
};

export default AddEdit;
