import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | MD Khaled Bin",
  description: "Contact route placeholder for the portfolio foundation.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-4xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Contact
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          A place for the contact form.
        </h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          The foundation is ready. The contact experience will be added in the
          next phase with a proper client-side form.
        </p>
      </div>
    </section>
  );
}
