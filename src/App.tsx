import Board from "./components/shared/board";

function App() {

  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
    </div>
    <section className="pt-14 w-[35rem] mx-auto">
      <Board />
    </section>
    </>
  );
}

export default App
