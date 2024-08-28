import { SparklesIcon } from "@heroicons/react/24/outline";
import { Input } from "./Input";
import { Post } from "./Post";

export const Feed = () => {
  const posts = [
    {
      id: "1",
      name: "Muhammad Zaheer",
      userName: "khan000",
      userImg:
        "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg",
      img: "https://images.unsplash.com/photo-1490780558417-87ed9954aa15?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dmlld3xlbnwwfHwwfHx8MA%3D%3D",
      text: "nice view",
      timeStamp: "2 hours ago",
    },
    {
      id: "2",
      name: "Muhammad Ramzan",
      userName: "leader000",
      userImg:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
      img: "https://images.unsplash.com/photo-1723744903131-8c7920b82b8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D",
      text: "a beautiful lady",
      timeStamp: "2 days ago",
    },
    {
      id: "3",
      name: "Muhammad khan",
      userName: "khan2233",
      userImg:
        "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg",
      img: "https://images.unsplash.com/photo-1490780558417-87ed9954aa15?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dmlld3xlbnwwfHwwfHx8MA%3D%3D",
      text: "nice view",
      timeStamp: "2 hours ago",
    },
    {
      id: "4",
      name: "Awais Nayyar",
      userName: "Nayyar5540",
      userImg:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
      img: "https://images.unsplash.com/photo-1723744903131-8c7920b82b8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D",
      text: "a beautiful lady",
      timeStamp: "2 days ago",
    },
    {
      id: "5",
      name: "Muhammad Saleem",
      userName: "saleem172",
      userImg:
        "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg",
      img: "https://images.unsplash.com/photo-1490780558417-87ed9954aa15?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dmlld3xlbnwwfHwwfHx8MA%3D%3D",
      text: "nice view",
      timeStamp: "2 hours ago",
    },
    {
      id: "6",
      name: "Shehzad Malik ",
      userName: "malik7890",
      userImg:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
      img: "https://images.unsplash.com/photo-1723744903131-8c7920b82b8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D",
      text: "a beautiful lady",
      timeStamp: "2 days ago",
    },
    {
      id: "7",
      name: "Muhammad Ayoun",
      userName: "ayoun0099",
      userImg:
        "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg",
      img: "https://images.unsplash.com/photo-1490780558417-87ed9954aa15?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dmlld3xlbnwwfHwwfHx8MA%3D%3D",
      text: "nice view",
      timeStamp: "2 hours ago",
    },
    {
      id: "8",
      name: "Babar Azam",
      userName: "babar56",
      userImg:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
      img: "https://images.unsplash.com/photo-1723744903131-8c7920b82b8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D",
      text: "a beautiful lady",
      timeStamp: "2 days ago",
    },
  ];
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};


 