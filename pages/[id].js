import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
export async function getStaticPaths() {
  const res = await fetch(`https://swapi.dev/api/people/`);
  const data = await res.json();

  const paths = data.results.map((person) => ({
    params: { id: person.url.split("people/")[1] },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://swapi.dev/api/people/${params.id}`);
  const post = await res.json();

  return { props: { post } };
}

export default function Home({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <Head>
        <title>{post.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article className="details">
        <h1>{post.name}</h1>
        <h3>
          Height: {post.height} | Mass: {post.height} | Gender: {post.gender}
        </h3>
        <h3>
          Hair Color : {post.hair_color} | Skin Color: {post.skin_color}
        </h3>
      </article>
    </div>
  );
}
