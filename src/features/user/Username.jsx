import { useSelector } from "react-redux";
import { getUserName } from "./userSlice";

function Username() {
  const userName = useSelector(getUserName);
  if (!userName) return null;

  return (
    <div
      className="font-display hidden text-xs font-bold tracking-widest text-white/60 uppercase md:block"
      aria-label={`Logged in as ${userName}`}
    >
      Hi, {userName}
    </div>
  );
}

export default Username;
