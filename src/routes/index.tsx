import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main>
      <h1>works</h1>
      <Link to="/auth/sign-up">Sign up</Link>
    </main>
  );
}
