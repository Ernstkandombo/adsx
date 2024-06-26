import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';
import SignUp from '@/components/auth/SignUp';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    const { email, password } = credentials;

                    // Make a request to your authentication endpoint
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/authenticate`, { email, password });

                    // If authentication is successful, modify the response data to include the user key
                    // If authentication is successful, return the user object
                    if (response.status === 200 && response.data.token) {
                        
                        const user = response.data.user;
                        return user;
                    } else {
                        // If authentication fails, return null
                        return null;
                    }
                } catch (error) {
                    // Log any errors that occur during authentication
                    console.error('Authentication error:', error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        
    },
    pages: {
        signIn: '/',
        SignUp: '/auth/sign-up',
        signOut: '/',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    callbacks: {
        async jwt({ user, token }) {
            if (user) {
                token.user = { ...user };
            }
            return token
            },
        async session({ session, token }) {
            if(token?.user){
                session.user = token.user;
            } 
                return Promise.resolve(session);
            }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
