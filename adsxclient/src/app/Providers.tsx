'use client'
import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

interface AuthProvider{
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProvider) => {
    return <SessionProvider>{ children }</SessionProvider>
}