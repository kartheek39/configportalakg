"use client";

import { useEffect, useState } from "react";

type Row = {
  id: number;
  name: string;
  email: string;
};
type Role = {
  Name: string;
};

export default function Home() {
  const [data, setData] = useState<Row[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
    getRoles();
  }, []);

  const getRoles = () => {
    fetch("/api/roles")
      .then((res) => res.json())
      .then(setRoles)
      .catch(console.error);
  };

  return (
    <div>
      <h1>Welcome to Next.js POC for Teams</h1>
      <p>This page is embedded in Microsoft Teams.</p>
      <main className="p-6">
        <h1 className="text-xl font-bold">Data from API Server</h1>
        <ul className="mt-4">
          {data.map((row: Row) => (
            <li key={row.id} className="py-1">
              {row.name} - {row.email}
            </li>
          ))}
        </ul>

        <button className="text-xl font-bold" onClick={getRoles}>
          Click to fetch Data from SQL Server
        </button>
        <ul className="mt-4">
          {roles.map((role: Role, i) => (
            <li key={i} className="py-1">
              {role.Name}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
