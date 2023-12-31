import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ProfileContent = ({ user }) => {
  const [company_name, setCompany_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAdderss] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    setCompany_name(user.company_name);
    setEmail(user.email);
    setPhone(user.phone);
    setAbout(user.about);
    setWebsite(user.website);
    setCategory(user.category);
    setAdderss(user.address);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (profileImage) {
      const fData = new FormData();
      fData.append("profile", profileImage);
      await axios
        .post(`/api/employer/upload-profile/${user.id}`, fData)
        .then((res) => {})
        .catch((e) => {
          console.log(e);
        });
    }

    const data = {
      company_name,
      phone,
      website: String(website),
      category: String(category),
      about: String(about),
      address: String(address),
    };
    const config = {
      headers: { Authorization: `Bearer ${user.access_token}` },
    };
    const bodyParameters = {
      key: "value",
    };

    await axios
      .put(`/api/employer/${user.id}`, data, bodyParameters, config)
      .then(async (res) => {
        const user1 = JSON.parse(localStorage.getItem("user"));
        const config2 = {
          headers: { Authorization: `Bearer ${user1.access_token}` },
        };
        const bodyParameters2 = {
          key: "value",
        };
        await axios
          .post("/api/employer/me", bodyParameters2, config2)
          .then((res) => {
            user1.user = res.data;
            localStorage.setItem("user", JSON.stringify(user1));
            toast.success("Successfully update profile", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      });
  };

  return (
    <div className="">
      <div className="header p-5 flex justify-end ">
        <div className="flex gap-5 items-center">
          <div className="flex">
            <IoIosNotificationsOutline size={24} />
            <p>Notification</p>
          </div>
          <Link to="/jobs">
            <button className="bg-[#FFFFFF] p-2 rounded-2xl w-[100px]">
              Home
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="pro-container flex flex-col gap-10 justify-center w-[1000px] py-10">
          <div className="w-full">
            <h1 className="text-3xl">Profile</h1>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <div className="bg-secondaryBackground  py-10 px-10 rounded-2xl">
              <div className="w-[800px] flex flex-col gap-5">
                <div className="pro-pic flex gap-8">
                  <CgProfile size={100} />
                  <div className="flex justify-center items-center">
                    <div className="flex justify-center items-center">
                      <input
                        type="file"
                        className="bg-primary p-3 rounded-lg text-white "
                        onChange={(e) => setProfileImage(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>

                <div className="input flex flex-col gap-4">
                  <label htmlFor="Company name">Company/Employer's name</label>
                  <input
                    type="text"
                    name="Company name"
                    className="p-2 rounded-lg"
                    value={company_name}
                    onChange={(e) => setCompany_name(e.target.value)}
                  />
                </div>

                <div className="multi-input flex justify-between">
                  <div className="input flex flex-col w-[40%] gap-4">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="p-2 rounded-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      readOnly
                    />
                  </div>
                  <div className="input flex flex-col w-[40%] gap-4">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      name="website"
                      className="p-2 rounded-lg"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                </div>

                <div className="multi-input flex justify-between ">
                  <div className="input flex flex-col w-[40%] gap-4">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      className="p-2 rounded-lg"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="input flex flex-col w-[40%] gap-4">
                    <label htmlFor="catagory">Category</label>
                    <input
                      type="text"
                      name="catagory"
                      className="p-2 rounded-lg"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                </div>

                <div className="input flex flex-col gap-4">
                  <label htmlFor="about">About Compony</label>
                  <textarea
                    name="about"
                    cols="30"
                    rows="10"
                    className="p-2 rounded-lg"
                    value={about}
                    type="text"
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </div>
                <div className="address flex flex-col gap-4">
                  <label htmlFor="adress">Address</label>
                  <input
                    type="text"
                    className="p-2 rounded-lg"
                    value={address}
                    onChange={(e) => setAdderss(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="social flex flex-col gap-5 bg-secondaryBackground  py-10 px-10 rounded-2xl">
              <div className="w-[800px] flex flex-col gap-5">
                <h1 className="text-2xl">Social Media</h1>
                <div className="input flex flex-col gap-4">
                  <label htmlFor="network">Network 1</label>
                  <input
                    type="text"
                    name="network"
                    className="p-2 rounded-lg"
                  />
                </div>
                <div className="input flex flex-col gap-4">
                  <label htmlFor="network">Network 1</label>
                  <input
                    type="text"
                    name="network"
                    className="p-2 rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div>
              <button className="bg-primary text-white px-10 py-2 rounded-2xl">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProfileContent;
