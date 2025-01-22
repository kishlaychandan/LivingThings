import React, { useEffect, useState } from "react";
import { fetchLogs } from "../services/api";

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const loadLogs = async () => {
      const data = await fetchLogs();
      setLogs(data);
    };
    loadLogs();
  }, []);

  return (
    <div>
      <h2>Access Logs</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Employee</th>
            <th>Algorithm Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{new Date(log.date).toLocaleDateString()}</td>
              <td>{log.time}</td>
              <td>{log.employee}</td>
              <td>{log.algoStatus ? "ON" : "OFF"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;
