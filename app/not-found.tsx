import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <h1 className="text-9xl font-sans font-bold text-accent opacity-20 select-none">
        404
      </h1>
      <div className="absolute flex flex-col items-center gap-4 z-10">
        <h2 className="text-2xl md:text-4xl font-mono font-bold text-accent">
          // BLOCK_NOT_FOUND
        </h2>
        <p className="text-foreground/60 font-mono text-center max-w-md">
          The transaction you are looking for has failed or does not exist in
          this chain.
        </p>
        <Link
          href="/"
          className="mt-8 px-8 py-4 bg-white text-black font-mono font-bold hover:bg-accent transition-colors"
        >
          RETURN_TO_GENESIS
        </Link>
      </div>
    </main>
  );
}
