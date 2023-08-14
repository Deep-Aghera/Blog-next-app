import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  
  providers: [
    GithubProvider({
      clientId: `1cab17898333bbeb0c65`,
      clientSecret: '33c2946339ffdae893f5dd17653c972ff3c869f5',
    }),
   
  ],
}

export default NextAuth(authOptions)