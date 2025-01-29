export default function SignInPage() {
  return (
    <div className="my-a mx-auto w-96 rounded-3xl bg-gray-50 p-8 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">Sign in</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-sm border border-gray-300 px-3 py-2"
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
            className="w-full rounded-sm border border-gray-300 px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
}
