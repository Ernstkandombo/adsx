import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

const handler = NextAuth({
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

                    // If authentication is successful, return the user object
                    if (response.status === 200 && response.data.token) {
                        return { email, userType: response.data.userType, token: response.data.token, userId: response.data.userId };
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
        jwt: true
    },
    callbacks: {
        async jwt(token, user) {
            // This callback is used to manage the JWT token
            if (user) {
                token.id = user.userId;
                token.userType = user.userType;
                token.email = user.email;
                token.token = user.token; // Corrected typo here
            }
            return token;
        },
        async session(session, token) {
            // This callback is used to manage the user session
            session.user = token;
            return session;
        }
    }
});

export { handler as GET, handler as POST }