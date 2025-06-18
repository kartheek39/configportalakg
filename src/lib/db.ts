// src/lib/db.ts
import sql from "mssql";

const config: sql.config = {
  user: "lucyAdmin",
  password: "we03vsLP0?*!9Y*!",
  server: "sql-lucy-dev-eastus.database.windows.net",
  port: 1433,
  database: "db-lucy-dev-eastus",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function queryDatabase<T>(query: string): Promise<T[]> {
  try {
    console.log(query);
    const pool = await sql.connect(config);
    console.log(pool);
    const result = await pool.request().query(query);
    console.log(result);
    return result.recordset;
  } catch (error) {
    console.error("SQL Error:", error);
    throw error;
  }
}
