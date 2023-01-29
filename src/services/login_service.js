import { firestoredb } from "../../firebase-config"
import { doc, setDoc } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const auth = getAuth();

class LoginService {
    //Method to register new user in firebase
    registerNewUser = async (email, password, accountType) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then()
            .catch(error => alert(error.message))
            
        userData = {
            'username': email,
            'accountType': accountType,
        };
        userDoc = doc(firestoredb, 'users', email);
        console.log(userDoc)
        return await setDoc(userDoc, userData);
    }
}

export default new LoginService();