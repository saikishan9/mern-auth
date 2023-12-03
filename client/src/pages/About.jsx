export default function About() {
  return (
    <div className="px-4 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-4">About</h1>
      <p className="text-slate-700 mb-4">
        This is a MERN (MongoDB, Express, React, Node.js) stack application with
        authentication. It allows users to sign up, log in, and log out, and
        provides access to protected routes only for authenticated users.
      </p>
      <p className="text-slate-700 mb-4">
        The front-end of the application is built with React and uses React
        Router for client-side routing. The back-end is built with Node.js and
        Express, and uses MongoDB as the database. Authentication is implemented
        using JSON Web Tokens (JWT).
      </p>
      <p className="text-slate-700 mb-4">
        This application is intended as a starting point for building full-stack
        web applications with authentication using the MERN stack. Feel free to
        use it as a template for your own projects!
      </p>
    </div>
  );
}
