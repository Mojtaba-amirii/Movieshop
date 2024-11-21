export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-96 rounded-3xl bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="admin" className="flex items-center">
              <input
                type="checkbox"
                id="admin"
                name="admin"
                className="form-checkbox text-blue-500"
              />
              <span className="ml-2 text-gray-600">Login as admin</span>
            </label>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
