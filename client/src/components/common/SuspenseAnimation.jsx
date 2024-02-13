const SuspenseAnimation = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#eee] bg-transparent absolute top-0 -z-10">
      <div className="animate-spin w-28 h-28 rounded-full border-b-2 border-[#111827]"></div>
    </div>
  );
};

export default SuspenseAnimation;
