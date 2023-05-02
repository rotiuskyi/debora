import { useEffect } from "react";
import { getIdToken } from "../auth/authStorage";

const BoardList = () => {
  useEffect(() => {
    fetch("/api/boards", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getIdToken()}`
      }
    })
      .then(res => res.json())
      .then(data => console.dir(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Board List</h1>
    </div>
  )
};

export default BoardList;
