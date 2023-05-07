import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getIdToken } from "../auth/authStorage";

const BoardList = () => {
  useEffect(() => {
    fetch("/api/boards", {
      headers: {
        Authorization: `Bearer ${getIdToken()}`
      }
    })
      .then(res => res.json())
      .then(data => console.dir(data))
      .catch(err => console.error(err));
  }, []);

  const [title, setTitle] = useState("");
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    fetch("/api/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getIdToken()}`
      },
      body: JSON.stringify({ title })
    })
      .then(res => res.json())
      .then(newBoard => console.dir(newBoard))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Board List</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Board Title
          <input value={title} onChange={handleTitleChange} />
        </label>
        <button>Create Board</button>
      </form>
    </div>
  )
};

export default BoardList;
