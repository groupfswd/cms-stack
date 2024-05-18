'use client'
import React, { useState, useEffect } from 'react';
import TableUser from "@/components/User";
import BASE_URL from "@/lib/baseUrl";
import Cookies from "js-cookie";

export default function UserPage() {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/cms/users`, {
          headers: {
            'Authorization': `Bearer ${Cookies.get("accessToken")}`
          }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }

        const { data } = await res.json();

        setListUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllUsers();
  }, []);

  return (
    <div>
      <TableUser users={listUsers} />
    </div>
  );
};
