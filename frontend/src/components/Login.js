function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    // TODO: Send to backend for authentication
    console.log("Login:", { username, password });
  };

  return (
    <div className="container mx-auto mt-10 max-w-md">
      <h2 className="text-2xl font-bold text-white mb-4">Login to JAR.io</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-sakshi-pink text-white p-2 rounded w-full"
        >
          Login
        </button>
        <p id="error" className="text-red-500 mt-2 hidden">
          Invalid credentials
        </p>
      </form>
    </div>
  );
}

export default Login;
