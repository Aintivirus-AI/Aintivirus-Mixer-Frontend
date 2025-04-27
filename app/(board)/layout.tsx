import { ENV } from '@/config/env';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 py-8 md:py-10">
      {ENV.PROJECT_DISABLE && (
        <p className="text-lg font-bold">Sorry, The mixer is under maintenance and will be back soon</p>
      )}
      <div className="inline-block w-full max-w-lg justify-center text-center">{children}</div>
    </section>
  );
}
