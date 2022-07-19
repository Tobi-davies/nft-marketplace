const Header = () => {
  return (
    <div
      className="flex items-center justify-between max-w-2xl w-full mx-auto"
      style={{ border: "1px solid red" }}
    >
      <div>NFTERS</div>

      <div>
        <ul className="flex gap-5">
          <li>About</li>
          <li className="mx-4">Marketplace</li>
          <li>Resources</li>
        </ul>
      </div>

      <div>
        <button>Upload</button>
        <button>Connect</button>
      </div>
    </div>
  );
};

export default Header;
