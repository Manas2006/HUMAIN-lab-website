import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const adminUsername = process.env.ADMIN_USERNAME || 'admin'
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

        // For first-time setup, if no hash is set, use plain password comparison
        // In production, you should hash the password and set ADMIN_PASSWORD_HASH
        if (!adminPasswordHash) {
          const plainPassword = process.env.ADMIN_PASSWORD || 'admin123'
          if (
            credentials.username === adminUsername &&
            credentials.password === plainPassword
          ) {
            return {
              id: '1',
              name: 'Admin',
              email: 'admin@humainlab.edu',
            }
          }
          return null
        }

        // Compare with hashed password
        const isValid =
          credentials.username === adminUsername &&
          (await bcrypt.compare(credentials.password, adminPasswordHash))

        if (isValid) {
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@humainlab.edu',
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
}

