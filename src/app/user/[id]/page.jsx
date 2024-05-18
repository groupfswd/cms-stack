'use client'
import { updateUser, getUserById } from "@/fetching/user";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from 'next/link'

export default function UpdateUserPage() {
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [phone_number, setPhoneNumber] = useState("")
  const { id } = useParams(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const user = await getUserById(id)

        if (user.id !== parseInt(id)) {
          router.push('/error-not-found')
        }

        setFullname(user.fullname)
        setEmail(user.email)
        setPhoneNumber(user.phone_number)
      } catch (err) {
        console.log(err);
      }
    }

    fetchUserById(id)
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
        <div className="flex w-[400px] py-4 border rounded-lg items-center justify-center">
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold py-4 text-center">Edit Profile</h2>
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
                  onChange={(e) => setFullname(e.target.value)} />
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
                  onChange={(e) => setEmail(e.target.value)} />
              </label>
            </div>
            <div>
              <label className="form-control max-w-xs">
                <div className="label">
                  <span className="label-text">Fullname</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered max-w-xs"
                  name="phone_number"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)} />
              </label>
            </div>
            <div className="flex my-6 justify-end">
              <button
                type="submit"
                className="btn btn-primary max-w-xs mr-2">
                Save
              </button>
              <Link href='/'>
                <button
                  className="btn btn-active max-w-xs">
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
