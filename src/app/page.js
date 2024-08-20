import { Sidebar } from "./compnents/Sidebar";
import { Feed } from "./compnents/Feed";
import { Widgets } from "./compnents/Widgets";

export default async function Home() {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());

  const randomUsers = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,login,picture"
  ).then((res) => res.json());

  return (
    <main className="flex   min-h-screen   mx-auto">
      {/* Sidebar */}
      <Sidebar />

      {/* Feeds */}

      <Feed />

      {/* Widgets */}
      <Widgets
        newsResults={newsResults.articles}
        randomUsers={randomUsers.results}
      />
    </main>
  );
}

//https://saurav.tech/NewsAPI/top-headlines/category/business/us.json
