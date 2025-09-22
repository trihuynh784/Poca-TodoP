const _404NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-200">
        <img
          src="/404_NotFound.png"
          alt="404 Not Found"
          className="max-w-full mb-6 w-96"
        />
        <p className="flex text-2xl font-semibold text-gray-800">
          Oops! Trang này có vẻ như không tồn tại.
        </p>

        <a
          href="/"
          className="text-lg mt-6 px-6 py-3 inline-block font-medium text-white transition shadow-md bg-primary rounded-2xl hover:bg-primary-dark"
        >
          Quay về trang chủ
        </a>
      </div>
    </>
  );
};

export default _404NotFound;
