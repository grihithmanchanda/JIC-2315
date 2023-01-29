import {firestoredb} from "../../firebase-config"
import {doc, setDoc} from "firebase/firestore"
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth"

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
            .catch(error => alert(error.message));
    }

    //Method to log in as an existing user
    loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                let user = await userCredential.user;
                return user;
            })
            .catch(error => alert(error.message));
    }
}

export default new LoginService();