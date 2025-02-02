"use client";

import useDetailsStore from "@/context/mystore";
import { editDetails } from "@/utils/actions";
import React from "react";

const UpdateInfo = () => {
  const { name, welcomeMsg, sub, setDetails, loading, setLoading } =
    useDetailsStore();

  const handleUpdateDetails = async () => {
    try {
      setLoading(true);
      const res = await editDetails(name, welcomeMsg, sub);

      if (res?.success && res?.details) {
        setDetails(res.details);
      }
      if (res?.message) {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong while updating details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <p className="text-xl font-bold">Name</p>
        <input
          type="text"
          className="bg-gray-950 p-3 rounded-xl border"
          value={name}
          onChange={(e) =>
            setDetails({
              name: e.target.value,
              welcomeMsg: welcomeMsg,
              sub: sub,
            })
          }
        />
      </div>
      <div className="flex flex-col mt-5">
        <p className="text-xl font-bold">Welcome Message</p>
        <input
          className="bg-gray-950 p-3 rounded-xl border"
          value={welcomeMsg}
          onChange={(e) =>
            setDetails({
              name: name,
              welcomeMsg: e.target.value,
              sub: sub,
            })
          }
        />
      </div>
      <div className="flex flex-col mt-5">
        <p className="text-xl font-bold">Sub</p>
        <textarea
          rows={6}
          className="bg-gray-950 p-3 rounded-xl border resize-none"
          value={sub}
          onChange={(e) =>
            setDetails({
              name: name,
              welcomeMsg: welcomeMsg,
              sub: e.target.value,
            })
          }
        />
      </div>

      <div className="flex flex-col mt-5">
        <button
          className="bg-blue-500 text-white p-2 rounded-xl w-max disabled:bg-opacity-50 hover:bg-opacity-50"
          onClick={handleUpdateDetails}
          disabled={loading}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default UpdateInfo;
