import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}: React.PropsWithChildren){
    const rootSegment = useSegments()[0];
    const router = useRouter();
    const [token, setToken] = useState<string | undefined>("");

    useEffect(()=> {
        if (token === undefined) return;

        if (!token && rootSegment == "(tabs)"){
            router.replace('/login');
        } else if (token && rootSegment !== "(tabs)"){
            router.replace('/home');
        }
    }, [token, rootSegment])

    return (
        <AuthContext.Provider
            value={{
                token: token,
                signIn: (new_token: string) => {
                    setToken(new_token)
                },
                signOut: () => {
                    setToken("")
                }
            }}>
        {children}
        </AuthContext.Provider>
    )
}