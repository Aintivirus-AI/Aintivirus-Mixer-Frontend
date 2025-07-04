import { ENV } from '@/config/env';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mt-7 flex w-full flex-col items-center justify-center px-4 sm:px-10">
      {ENV.PROJECT_DISABLE && (
        <p className="text-lg font-bold">Sorry, The mixer is under maintenance and will be back soon</p>
      )}
      <div className="relative flex w-[581px] max-w-full flex-col justify-center">
        <div className="absolute -top-[40%] left-[30%] max-h-full max-w-full rounded-full bg-blue-50/20 blur-[118.19298553466797px] lg:h-[511px] lg:w-[518px]" />
        <div className="relative flex w-full flex-col gap-4 rounded-[26px] border border-black-80 bg-black-70/80 bg-opacity-60 p-4 text-white shadow-none backdrop-blur-[54px] sm:rounded-[30px] sm:p-[34px]">
          {children}
        </div>
      </div>
    </section>
  );
}
