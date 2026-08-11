import { useState } from "react";
import Button from "../../ui/Button";
import { updateName } from "./userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
    navigate("/menu");
    setUsername("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="text-xs uppercase tracking-[0.25em] text-white/50 font-display font-semibold">
        What should we call you?
      </p>

      <div className="flex flex-wrap items-stretch gap-3">
        <input
          id="username-input"
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-dark max-w-xs flex-1"
          autoComplete="given-name"
        />

        {username.trim() !== "" && (
          <Button type="primary">Start my order</Button>
        )}
      </div>
    </form>
  );
}

export default CreateUser;
