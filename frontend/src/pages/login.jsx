export default function Login() {
  return (
    <div className="max-w-sm space-y-4">

      <h1 className="text-xl font-semibold">Login</h1>

      <input className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Email" />
      <input type="password" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Password" />
      <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>

    </div>
  );
}
