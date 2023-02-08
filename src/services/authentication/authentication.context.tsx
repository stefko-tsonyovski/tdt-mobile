import React, { useState, createContext, useRef, FC } from "react";
import {
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  User,
  UserCredential,
  sendEmailVerification,
} from "firebase/auth";
import { loginRequest } from "./authentication.service";
import { showToast } from "../../utils/notifications";
import { useCreateUser } from "../users/users.service";

export const AuthenticationContext = createContext<any>({});

export type AuthenticationContextProviderProps = {
  children: JSX.Element;
};

export const AuthenticationContextProvider: FC<
  AuthenticationContextProviderProps
> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | UserCredential | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { mutate: createUser, isLoading: isLoadingCreateUser } =
    useCreateUser();
  const auth = useRef(getAuth()).current;

  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const { user } = await loginRequest(auth, email, password);

      setUser(user);
      setIsLoading(false);

      if (!user.emailVerified) {
        showToast("error", "Your account is not verified!");
        await onLogout();
      }
    } catch (error: any) {
      setIsLoading(false);
      setError(error.toString());
    }
  };

  const onRegister = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    repeatedPassword: string
  ) => {
    setIsLoading(true);

    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const newUser = {
        firstName,
        lastName,
        email,
      };
      createUser(newUser);

      setIsLoading(false);
      await onLogout();

      sendEmailVerification(user);

      showToast(
        "success",
        "Account created successfully! Please verify your email!"
      );
    } catch (error: any) {
      setIsLoading(false);
      setError(error.toString());
    }
  };

  const onLogout = async () => {
    await signOut(auth);
    setUser(null);
    setError(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading: isLoading || isLoadingCreateUser,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
