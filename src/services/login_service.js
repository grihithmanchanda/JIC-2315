import { firestoredb } from "../../firebase-config"
import { doc, setDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"

const auth = getAuth();

class LoginService {
    //Method to register new user in firebase
    registerNewUser = async (email, password, accountType) => {
        return await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                let userData = {
                    'username': email,
                    'accountType': accountType
                }

                let userDoc = doc(firestoredb, 'users', email);
                await setDoc(userDoc, userData);
                return userCredential.user;
            })
    }

    //Method to log in as an existing user
    loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                return userCredential.user;
            })
    }
}

export default new LoginService();