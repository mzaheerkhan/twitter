"use client";
import { Sidebar } from "./compnents/Sidebar";
import { Feed } from "./compnents/Feed";
import { Widgets } from "./compnents/Widgets";
import { CommentModal } from "./compnents/CommentModal";
import { useState, useEffect } from "react";

export default function Home() {
  const [newsResults, setNewsResults] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const newsResponse = await fetch(
          "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
        );
        const newsResults = await newsResponse.json();
        setNewsResults(newsResults.articles);

        const randomUsersResponse = await fetch(
          "https://randomuser.me/api/?results=30&inc=name,login,picture"
        );
        const randomUsersData = await randomUsersResponse.json();
        setRandomUsers(randomUsersData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen  mx-auto  max-w-[1700px]">
      {/* Sidebar */}
      <Sidebar />
      <Feed />
      {/* Widgets */}
      <Widgets newsResults={newsResults} randomUsers={randomUsers} />
      {/* Modal*/}
      <CommentModal />
    </main>
  );
}

//https://saurav.tech/NewsAPI/top-headlines/category/business/us.json
