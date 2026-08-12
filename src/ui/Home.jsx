import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const user = useSelector((state) => state.user);

  return (
    <div
      className="relative flex h-[90.75dvh] items-center overflow-hidden"
      style={{ background: "#180F08" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        role="img"
        aria-label="Artisan Neapolitan pizza from a wood-fired oven"
      />

      {/* Gradient overlay — heavy left, fading right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #180F08 0%, #180F08 40%, rgba(24,15,8,0.75) 65%, rgba(24,15,8,0.15) 100%)",
        }}
      />

      {/* Subtle vignette at top & bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(24,15,8,0.5) 0%, transparent 20%, transparent 80%, rgba(24,15,8,0.6) 100%)",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 px-8 sm:px-12 lg:px-20 xl:px-28 py-16 max-w-3xl">
        {/* Eyebrow */}
        <p className="eyebrow mb-5">48-Hour Dough · 450°C Fire</p>

        {/* Headline */}
        <h1
          className="mb-6 font-display font-black uppercase text-white leading-[0.88]"
          style={{ fontSize: "clamp(3.2rem, 8vw, 6.5rem)" }}
        >
          Pizza worth
          <br />
          waiting{" "}
          <span
            style={{
              WebkitTextStroke: "2px #C13708",
              color: "transparent",
            }}
          >
            sixty
          </span>
          <br />
          <span className="text-fire">seconds</span> for.
        </h1>

        {/* Subheading */}
        <p className="mb-10 max-w-sm text-sm leading-relaxed text-white/55">
          Stretched by hand, fired over oak, boxed and moving before the cheese
          stops bubbling.
        </p>

        {/* CTA */}
        {user.userName === "" ? (
          <CreateUser />
        ) : (
          <div>
            <p className="mb-4 eyebrow text-white/40">
              Welcome back,{" "}
              <span className="text-white/80">{user.userName}</span>
            </p>
            <Button to="/menu" type="primary">
              Go to menu →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
