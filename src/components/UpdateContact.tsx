"use client";

import useDetailsStore from "@/context/mystore";
import { updateContacts } from "@/utils/actions";
import React from "react";

const UpdateContact = () => {
  const { contacts, setContacts, loading, setLoading } = useDetailsStore();

  const handleUpdateContacts = async () => {
    try {
      setLoading(true);
      const res = await updateContacts(
        contacts.linkedin,
        contacts.twitter,
        contacts.github,
        contacts.instagram
      );
      if (res?.success) {
        setContacts({
          email: res?.contacts?.email,
          linkedin: res?.contacts?.linkedin,
          twitter: res?.contacts?.twitter,
          github: res?.contacts?.github,
          instagram: res?.contacts?.instagram,
        });
      }
      alert(res?.message);
    } catch (error) {
      console.log(error);
      alert("Something went wrong while updating contacts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-5">
      <p className="text-xl font-bold">Add/Update Contacts</p>

      <div className="flex flex-col gap-3">
        <input
          className="bg-gray-950 p-3 rounded-xl border"
          value={contacts.linkedin}
          onChange={(e) =>
            setContacts({
              email: contacts.email,
              linkedin: e.target.value,
              twitter: contacts.twitter,
              github: contacts.github,
              instagram: contacts.instagram,
            })
          }
          placeholder="Linkedin Url"
        />
        <input
          className="bg-gray-950 p-3 rounded-xl border"
          value={contacts.twitter}
          onChange={(e) =>
            setContacts({
              email: contacts.email,
              linkedin: contacts.linkedin,
              twitter: e.target.value,
              github: contacts.github,
              instagram: contacts.instagram,
            })
          }
          placeholder="Twitter Url"
        />
        <input
          className="bg-gray-950 p-3 rounded-xl border"
          value={contacts.github}
          onChange={(e) =>
            setContacts({
              email: contacts.email,
              linkedin: contacts.linkedin,
              twitter: contacts.twitter,
              github: e.target.value,
              instagram: contacts.instagram,
            })
          }
          placeholder="Github Url"
        />
        <input
          className="bg-gray-950 p-3 rounded-xl border"
          value={contacts.instagram}
          onChange={(e) =>
            setContacts({
              email: contacts.email,
              linkedin: contacts.linkedin,
              twitter: contacts.twitter,
              github: contacts.github,
              instagram: e.target.value,
            })
          }
          placeholder="Instagram Url"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-xl w-max disabled:bg-opacity-50"
          onClick={handleUpdateContacts}
          disabled={loading}
        >
          Update Contacts
        </button>
      </div>
    </div>
  );
};

export default UpdateContact;
