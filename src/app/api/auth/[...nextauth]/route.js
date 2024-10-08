import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: "https://accounts.google.com/o/oauth2/auth?scope=email%20profile&response_type=code&redirect_uri=https://twitter-smoky-gamma.vercel.app/api/auth/callback/google",
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  callbacks: {
    async session({ session, token }) {
      // Convert user.name to lowercase and remove spaces
      if (session.user && session.user.name) {
        session.user.username = session.user.name
          .split(" ")
          .join("")
          .toLowerCase();
      }
      // Add uid to session
      session.user.uid = token.sub;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Add your secret here
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
