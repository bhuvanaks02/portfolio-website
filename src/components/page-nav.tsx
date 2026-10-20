import Link from "next/link";

type Step = { href: string; label: string };

/** Back / next links at the foot of a page. */
export function PageNav({ back, next }: { back?: Step; next?: Step }) {
  return (
    <nav className="px-4 pb-10 pt-4 sm:px-8 sm:pb-14">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-y-8 text-center sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-x-10 sm:text-left border-t border-rule pt-8">
        {back && (
          <div>
            <p className="label text-accent">Previous</p>
            <Link
              href={back.href}
              className="link-underline display mt-3 inline-block text-2xl sm:text-3xl"
            >
              ← {back.label}
            </Link>
          </div>
        )}
        {next && (
          <div className="sm:ml-auto sm:text-right">
            <p className="label text-accent">Next</p>
            <Link
              href={next.href}
              className="link-underline display mt-3 inline-block text-2xl sm:text-3xl"
            >
              {next.label} →
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
