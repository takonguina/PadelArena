import axios from "axios";
import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

type UserData = {
    first_name: string;
    last_name: string;
    email: string;
    email_validated: boolean;
    birthday: string;
    id_user: number;
    password: string;
    date_insert: string;
  };

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
    const [token, setToken] = useState<string | undefined>(undefined);
    const [userData, setUserData] = useState<UserData | undefined>(undefined);
    const apiURL = 'http://192.168.1.63:3000/users/user/';

    const storeData = async (new_token: string) => {
        try {
            await AsyncStorage.setItem('token', new_token)
        } catch (e) {
            // saving error
        }
    };

    const getData = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if (storedToken === null) {
                return
            } else {
                setToken(storedToken);
            }
            
        } catch (e){
            // saving error
        }
    };

    const removeData = async () => {
        try {
            await AsyncStorage.removeItem('token');
        } catch (e) {
            // saving error
        }
    }

    const handleUser = async (token: string) => {
        try {
            const fixed_token = token.replace(/['"]/g, '');
            const response = await axios.post(`${apiURL}?token=${fixed_token}`, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200)
                setUserData(response.data[0]);
        } catch (e) {
            storeData("")
        }
    };

    useEffect(()=> {
        const waitandRedirect = async () => {
            if (token === undefined) {
                getData();
            } else {
                handleUser(token)
            }

            if (rootSegment == undefined){
                await sleep(2000);
            }

            if (!token && (rootSegment == "(tabs)" || rootSegment == "(modal)")){
                router.replace('/login');
            } else if (token && (rootSegment == "(auth)" || rootSegment == undefined)){
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
                userData: userData,
                signIn: (login_token: string) => {
                    setToken(login_token);
                    storeData(login_token);
                },
                signOut: () => {
                    setToken("");
                    removeData();
                }
            }}>
        {children}
        </AuthContext.Provider>
    )
}