export default function TableUser({ users }) {
   return (
      <div className="w-[800px] mx-auto">
         <h1 className="text-xl font-bold py-10 text-center">List Users</h1>
         <div className="overflow-x-auto justify-center border">
            <table className="table">
               <thead>
                  <tr>
                     <th>No</th>
                     <th>ID</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Phone Number</th>
                  </tr>
               </thead>
               <tbody>
                  {users.map((user, i) => (
                     <tr key={user.id}>
                        <td>{i + 1}</td>
                        <td>{user.id}</td>
                        <td>{user.fullname}</td>
                        <td>{user.email}</td>
                        <td>{user.phone_number}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}
