import Link from "next/link";

export default function NotFound() {
  return (
    <section className="px-4 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-3xl">
        <p className="label">404</p>
        <h1 className="display mt-5 text-title">
          This page traversed to a node that isn&rsquo;t there.
        </h1>
        <Link
          href="/"
          className="link-underline mt-8 inline-block text-accent"
        >
          Back to the index
        </Link>
      </div>
    </section>
  );
}
