"use client";
import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";

export default function SignInPage() {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  if (!providers) {
    return (
      <p className="flex items-center justify-center text-red-600 mt-24 text-lg font-bold">
        Loading...........
      </p>
    );
  }

  return (
    <div>
      <div className="flex justify-center mt-20 space-x-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRhv1i6NR8T6U-DSGmqGg5cp5A7XAMLr1cv4sgWIlxAliMeKYRw2XHq8hyxM_oTt_Q8LY&usqp=CAU"
          alt="twitter image inside a phone"
          className="hidden object-cover md:w-44 md:h-80 rotate-6  md:inline-flex"
        />
        <div className="">
          {Object.values(providers).map((provider) => (
            <div key={provider.name} className="flex flex-col items-center">
              <img
                className="w-20 object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTl6PFlBBSev_Aj-u7I-PS05rSGYVsA1cO9Q&s"
                alt="twitter logo"
              />
              <p className="text-center text-sm italic my-10">
                This app is created for learning purposes
              </p>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
