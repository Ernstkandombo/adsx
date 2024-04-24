import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';
import { useRouter } from 'next/router'; // Import useRouter

export default NextAuth({
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    const { email, password } = credentials;

                    // Make a request to your authentication endpoint
                    const response = await axios.post('http://localhost:5001/api/auth/', { email, password });

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
    pages: {
        signIn: '/', // Custom sign-in page
        signUp: '/auth/sign-up', // Custom sign-up page
    },

    callbacks: {
        async jwt(token, user) {
            // This callback is used to manage the JWT token
            if (user) {
                token.id = user.userId;
                token.userType = user.userType;
                token.email = user.email;
                token.accessToken = user.token;
            }
            return token;
        },
        async session(session, token) {
            // This callback is used to manage the user session
            session.user = token;
            return session;
        }
    },
    events: {
        async signIn({ user, account, profile, isNewUser }) {
            const router = useRouter(); // Initialize useRouter

            if (user) {
                // Redirect based on user type
                if (user.userType === 'advertiser') {
                    router.push('/advertisers'); // Use router.push for redirection
                } else if (user.userType === 'publisher') {
                    router.push('/publishers'); // Use router.push for redirection
                }
            } else {
                // Handle authentication failure with toast
                toast.error('Authentication failed. Please check your credentials.');
            }
        }
    }
});
