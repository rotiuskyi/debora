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

  const [name, setName] = useState("");
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    fetch("/api/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getIdToken()}`
      },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(newBoard => console.dir(newBoard))
      .catch(() => console.error("Failed to create new board."));
  };

  return (
    <div>
      <h1>Board List</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Board Name
          <input value={name} onChange={handleNameChange} />
        </label>
        <button>Create Board</button>
      </form>
    </div>
  )
};

export default BoardList;
