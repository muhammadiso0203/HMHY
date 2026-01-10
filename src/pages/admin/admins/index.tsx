
const Admins = () => {
  return (
    <div className="w-404 p-4">
      <div className="flex items-center gap-4">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-black">Admins</h1>

        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by username, phone or role"
            className="w-full h-8 rounded-md border border-gray-300 bg-white px-4 text-sm outline-none focus:border-gray-400"
          />
        </div>

        {/* Add Admin Button */}
        <button className="flex items-center gap-2 h-8 rounded-md bg-black px-4 text-sm font-medium text-white hover:bg-black/90">
          <span className="text-lg leading-none">+</span>
          Add Admin
        </button>
      </div>
    </div>
  );
};

export default Admins;
