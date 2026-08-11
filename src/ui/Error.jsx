import { useNavigate, useRouteError } from "react-router-dom";
import Button from "./Button";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);

  return (
    <div className="bg-cream min-h-full flex items-center justify-center px-6 py-20">
      <div className="max-w-md text-center">
        <span className="text-7xl opacity-20" aria-hidden="true">🔥</span>

        <h1 className="mt-6 font-display text-4xl font-black uppercase tracking-wide text-base">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm text-stone-500 leading-relaxed">
          {error?.data || error?.message || "An unexpected error occurred."}
        </p>

        <div className="mt-8">
          <Button type="primary" onClick={() => navigate(-1)}>
            ← Go back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
