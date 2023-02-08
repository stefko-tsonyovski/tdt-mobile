/* eslint-disable prettier/prettier */
import { Auth, signInWithEmailAndPassword } from "firebase/auth";

export const loginRequest = (auth: Auth, email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);
