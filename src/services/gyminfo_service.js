import { firestoredb } from "../../firebase-config"
import { collection, doc, getDocs, setDoc, updateDoc, deleteField, arrayUnion } from "firebase/firestore"

const gymInfoCollectionRef = collection(firestoredb, "gym metadata");

class gymInfoService {
    getAllGymInfo = async () => {
        return getDocs(gymInfoCollectionRef)
    };

    addGymInfo = async (gymID, gymAddress, gymName, hourStart, hourEnd, phoneNumber, email) => {
        let gymInfoData = {
            'Address' : gymAddress,
            'Name': gymName,
            'hourEnd': hourEnd,
            'hourStart': hourStart,
            'phoneNumber': phoneNumber,
            'managerEmail': email,
        }
        let gymInfoDoc = doc(firestoredb, 'gym metadata', gymID);
        await setDoc(gymInfoDoc, gymInfoData);

        global.gymID = gymName

        await updateDoc(doc(firestoredb, "managers", email), {
            gymID: gymName,
        });
    };

    addUserToGym = async(gymName) => {
        // TODO: check if gym exists
        // for now, we will assume the gym exists

        let gymDoc = doc(firestoredb, 'gym metadata', gymName)
        
        await updateDoc(gymDoc, {
            users: arrayUnion(currentLoginEmail)
        })
    }
}

export default new gymInfoService();
