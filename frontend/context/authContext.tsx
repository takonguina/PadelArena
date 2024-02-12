import axios from "axios";
import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

import { translations } from '../localizations';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

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

const AuthContext = createContext<any>(null);

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}: React.PropsWithChildren){
    const i18n = new I18n(translations);
    const [locale, setLocale] = useState(Localization.locale);
    i18n.locale = locale;
    i18n.enableFallback = true;
    i18n.defaultLocale = "en"

    const rootSegment = useSegments()[0];
    const router = useRouter();
    const [token, setToken] = useState<string | undefined>();
    const [userData, setUserData] = useState<UserData | undefined>(undefined);
    const apiURL = 'http://192.168.1.63:3000/users/user/';

    const getData = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            if (storedToken === null) {
                setToken(undefined);
            } else {
                setToken(storedToken);
            }
            
        } catch (e){
            // saving error
        }
      };

    const storeData = async (new_token: string) => {
        try {
            await AsyncStorage.setItem('token', new_token)
        } catch (e) {
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
            const response = await axios.post(`${apiURL}?token=${fixed_token}`,{}, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
              setUserData(response.data[0]);
            }
        } catch (e) {
            // router.replace('/login');
            // Alert.alert("Connection Failure ⛔️", "Sorry, our service is not available or you do not have an internet connection.")
        }
      };

    useEffect(()=> {
        getData();
    });

    return (
        <AuthContext.Provider
            value={{
                locale: locale,
                i18n: i18n,
                token: token,
                setToken: (storedToken: string) => {
                    setToken(storedToken)
                },
                userData: userData,
                setUserData : (userData: UserData) => {
                    setUserData(userData)
                },
                signIn: (login_token: string) => {
                    setToken(login_token);
                    storeData(login_token);
                    handleUser(login_token);
                },
                signOut: () => {
                    removeData();
                    router.replace("/login");
                }
            }}>
        {children}
        </AuthContext.Provider>
    )
}