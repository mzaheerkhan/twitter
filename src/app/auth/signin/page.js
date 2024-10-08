"use client";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
export default function SignInPage() {
  const router = useRouter();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const user = auth.currentUser.providerData[0];
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          username: user.displayName.split("").join("").toLocaleLowerCase(),
          userImg: user.photoURL,
          uid: user.uid,
          timestamp: serverTimestamp(),
        });
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex justify-center mt-20 space-x-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRhv1i6NR8T6U-DSGmqGg5cp5A7XAMLr1cv4sgWIlxAliMeKYRw2XHq8hyxM_oTt_Q8LY&usqp=CAU"
          alt="twitter image inside a phone"
          className="hidden object-cover md:w-44 md:h-80 rotate-6  md:inline-flex"
        />
        <div className="">
          <div className="flex flex-col items-center">
            <img
              className="w-20 object-cover"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTl6PFlBBSev_Aj-u7I-PS05rSGYVsA1cO9Q&s"
              alt="twitter logo"
            />
            <p className="text-center text-sm italic my-10">
              This app is created for learning purposes
            </p>
            <button
              onClick={onGoogleClick}
              className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
