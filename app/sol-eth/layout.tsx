export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col w-full items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block w-full max-w-lg text-center justify-center">
        {children}
      </div>
    </section>
  );
}
