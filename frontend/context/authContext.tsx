import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const AuthContext = createContext<any>(null);

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}: React.PropsWithChildren){
    const rootSegment = useSegments()[0];
    const router = useRouter();
    const [token, setToken] = useState<string | undefined>("");

    useEffect(()=> {
        const waitandRedirect = async () => {
            if (rootSegment == undefined){
                await sleep(2000);
            }
            if (token === undefined) return;

            if (!token && rootSegment == "(tabs)"){
                router.replace('/login');
            } else if (token && rootSegment !== "(tabs)"){
                router.replace('/home');
            } else if (!token && rootSegment == undefined){
                router.replace('/login');
            }
    }
    waitandRedirect();
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