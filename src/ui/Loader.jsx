function Loader() {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-base/60 backdrop-blur-sm"
      role="status"
      aria-label="Loading"
    >
      <div className="loader" />
    </div>
  );
}

export default Loader;
