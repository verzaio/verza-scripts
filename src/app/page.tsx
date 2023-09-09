'use client';

export default function HomePage() {
  return (
    <div className="flex p-10 items-center flex-col gap-[30px]">
      <h4 className="text-2xl font-bold text-center">Verza Scripts</h4>

      <a
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="https://docs.verza.io"
        target="_blank">
        Visit Docs
      </a>
    </div>
  );
}
