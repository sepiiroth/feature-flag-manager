import "./App.css";
import { trpc } from "./trpc";

function App() {
  const hello = trpc.hello.useQuery({ name: "Rafael" });
  return (
    <>
      <div>
        <h1>Feature Flags Dashboard</h1>
        <p>{hello.data?.message}</p>
      </div>
    </>
  );
}

export default App;
