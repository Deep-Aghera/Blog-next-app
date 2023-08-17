import NextAuth from 'next-auth/next'
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from 'next-auth/providers/github'

const AUTH_RESTPOINT = process.env.NEXT_PUBLIC_AUTH_REST_ENDPOINT;

export const authOption = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {
                Email: { label: 'Email', type: 'text', placeholder: 'enter your email' },
                Password: { label: 'Password', type: 'password', placeholder: 'enter your password' }
            },
            async authorize(cred, req) {
             
                let res = await fetch(`${AUTH_RESTPOINT}/users/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        login: cred?.Email,
                        password: cred?.Password,
                        // expiresInMins: 60, // optional
                    })
                })

                const user = await res.json();

                if(!user || user.message)
                    return null;

                return user;
            }
        }),
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID || '',
        //     clientSecret: process.env.GITHUB_SECRET || '',
        // }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {

            // if (user?.id) {
            //     token.id = user.id
            // }
            // if (user?.username) {
            //     token.username = user.username;
            // }
            return token
        },
        async session({ session, token }) {
            // session.user.id = token.id;
            // session.user.name = token.username;
            return session;
        }
    },
    pages: {
        signIn: "/auth/signin"
    }
}

export default NextAuth(authOption)