import { firestoredb } from "../../firebase-config"
import { collection, doc, setDoc, getDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"

const auth = getAuth();
const usersRef = collection(firestoredb, 'users');

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
    loginUser = async (email, password, accountType) => {
        return await signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                let user = userCredential.user;

                let docRef = doc(usersRef, user.email)
                let docSnap = await getDoc(docRef)
                
                let actualAccountType = docSnap.data()['accountType']
                if (actualAccountType !== accountType){
                    throw new Error('Error: Incorrect account type!')
                } else {
                    return user;
                }
            })
    }
}

export default new LoginService();