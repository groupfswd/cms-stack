'use client'
import { updateUser, getUserById } from "@/fetching/user";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdateUserPage() {
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [phone_number, setPhoneNumber] = useState("")
  const { id } = useParams(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserById = async () => {
      const user = await getUserById(id)

      setFullname(user.fullname)
      setEmail(user.email)
      setPhoneNumber(user.phone_number)
    }
    fetchUserById()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());
    try {
      await updateUser({
        fullname: user.fullname,
        email: user.email,
        phone_number: user.phone_number
      })

      router.push('/user')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className="flex justify-center h-screen items-center">
        <div className="flex w-96 py-4 border rounded-lg">
          <form onSubmit={handleSubmit} className="flex flex-col w-full mx-5 items-center">
            <h2 className="text-xl font-semibold py-4">Edit Profile</h2>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Fullname</span>
              </div>
              <input
                type="text" placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)} />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text" placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Fullname</span>
              </div>
              <input
                type="text" placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                name="phone_number"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)} />
            </label>
            <div className="flex my-6 w-full justify-center">
              <button
                type="submit"
                className="btn btn-primary w-full max-w-xs">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
