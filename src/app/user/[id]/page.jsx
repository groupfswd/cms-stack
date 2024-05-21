"use client";
import { updateUser, getUserById } from "@/fetching/user";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UpdateUserPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const { id } = useParams(true);
  const router = useRouter();

  const handleShow = () => setShowPassword(!showPassword);

  useEffect(() => {
    const fetchUserById = async () => {
      const user = await getUserById(id);

      setFullname(user.fullname);
      setEmail(user.email);
      setPassword(user.password);
      setPhoneNumber(user.phone_number);
    };

    fetchUserById(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());
    try {
      await updateUser({
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        phone_number: user.phone_number,
      });

      setSuccess(true);
      router.push("/user");
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
  };

  return (
    <div>
      {success && (
        <div
          role="alert"
          className="alert alert-success flex fixed z-10 w-80 right-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Profile Updated Successfully!</span>
        </div>
      )}
      <div className="flex justify-center h-screen items-center">
        <div className="flex w-[400px] py-4 border rounded-lg items-center justify-center">
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold py-4 text-center">
              Edit Profile
            </h2>
            <div>
              <label className="form-control w-[500px] max-w-xs">
                <div className="label">
                  <span className="label-text">Fullname</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered max-w-xs"
                  name="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label className="form-control max-w-xs">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered max-w-xs"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label className="form-control max-w-xs">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered max-w-xs"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Show Password</span>
                <input
                  onClick={handleShow}
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                />
              </label>
            </div>
            <div>
              <label className="form-control max-w-xs">
                <div className="label">
                  <span className="label-text">Phone number</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered max-w-xs"
                  name="phone_number"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="flex my-5 justify-end">
              <button type="submit" className="btn btn-primary max-w-xs mr-2">
                Save
              </button>
              <Link href="/">
                <button className="btn btn-active max-w-xs">Cancel</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
