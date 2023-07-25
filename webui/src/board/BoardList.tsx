import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { getIdToken } from "../auth/authStorage";

const BoardList = () => {
  const [boards, setBoards] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/boards", {
      headers: {
        Authorization: `Bearer ${getIdToken()}`
      }
    })
      .then(res => res.json())
      .then(boards => setBoards(boards))
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
      .then(newBoard => setBoards(boards => [...boards, newBoard]))
      .catch(err => console.error(err));
  };

  const handleDelete = (event: MouseEvent) => {
    const btn = event.target as HTMLButtonElement;

    fetch(`/api/boards/${btn.name}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getIdToken()}`
      },
    })
      .then(res => res.json())
      .then(() => setBoards(boards.filter(board => board.id != btn.name)))
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

      <ul>
        {boards.map((board) => (
          <li key={(board as any).id}>
            <pre className="text-blue-600">
              <code>
                {JSON.stringify(board)}
              </code>
            </pre>
            <button name={(board as any).id} onClick={handleDelete}>Delete</button>
          </li>)
        )}
      </ul>
    </div>
  )
};

export default BoardList;
