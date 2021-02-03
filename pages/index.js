import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export async function getStaticProps(context) {
  const res = await fetch(`https://swapi.dev/api/people/`);
  const data = await res.json();

  return {
    props: { data: data },
  };
}
export default function Home({ data }) {
  const [peoples, setPeople] = useState(data.results);

  const router = useRouter();
  const { page } = router.query;

  useEffect(async () => {
    if (page) {
      const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
      const data = await res.json();
      setPeople(data.results);
    }
  }, [page]);

  return (
    <div className="container">
      <Head>
        <title>All Peoples</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {peoples.map((person) => {
          return (
            <li key={person.name}>
              <h2>
                <Link href={`/${person.url.split("people/")[1]}`}>
                  <a href={`/${person.url.split("people/")[1]}`}>
                    {person.name}
                  </a>
                </Link>
              </h2>
            </li>
          );
        })}
      </ul>

      <div className="btn-group">
        <button
          onClick={() => {
            let pageNo = page === undefined ? 1 : +page;
            router.push(`/?page=${pageNo + 1}`);
          }}
        >
          Next
        </button>
        <button
          onClick={() => {
            if (page !== undefined && page > 1) {
              let pageNo = +page;
              router.push(`/?page=${pageNo - 1}`);
            }
          }}
        >
          Previous
        </button>
      </div>
    </div>
  );
}
