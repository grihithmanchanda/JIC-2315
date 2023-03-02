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
                if (accountType === "User") {
                    let userData = {
                        'username': email,
                    }
    
                    let userDoc = doc(firestoredb, 'users', email);
                    await setDoc(userDoc, userData);
                }
                else {
                    let managerData = {
                        'username': email,
                        'gymID': null
                    }
                    let managerDoc = doc(firestoredb, 'managers', email);
                    await setDoc(managerDoc, managerData);
                }
                // hacky global variable to make this info available everywhere. Probably want to change this.
                global.currentLoginEmail = userCredential.user.email
                return userCredential.user
            })
    }

    //Method to log in as an existing user
    loginUser = async (email, password, accountType) => {
        return await signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                let user = userCredential.user;
                let docRef = doc(usersRef, user.email)
                if (accountType === "Manager") {
                    docRef = doc(collection(firestoredb, 'managers'), user.email)
                }

                let docSnap = await getDoc(docRef)
                
                if (!docSnap.exists){
                    throw new Error('Error: Incorrect account type!')
                } else {
                    // hacky global variable to make this info available everywhere. Probably want to change this.
                    global.currentLoginEmail = user.email
                    return user;
                }
            })
    }
}

export default new LoginService();