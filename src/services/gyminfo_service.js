import { firestoredb } from "../../firebase-config"
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"

const gymInfoCollectionRef = collection(firestoredb, "gym metadata");

class gymInfoService {
    getAllGymInfo = async () => {
        return await getDocs(gymInfoCollectionRef)
    };

    addGymInfo = async (gymID, gymAddress, gymName, hourStart, hourEnd, phoneNumber, email) => {
        let gymInfoData = {
            'Address': gymAddress,
            'Name': gymName,
            'hourEnd': hourEnd,
            'hourStart': hourStart,
            'phoneNumber': phoneNumber,
            'managerEmail': email,
        }
        let gymInfoDoc = doc(firestoredb, 'gym metadata', gymID);
        await setDoc(gymInfoDoc, gymInfoData);

        global.gymID = gymName

        await updateDoc(doc(firestoredb, "managers", email),
            {
                gymID: gymName,
            });
    };

    getAllGymNames = async () => {
        const gymMetadataCollection = await this.getAllGymInfo();
        let gymNames = [];
        gymMetadataCollection.docs.forEach((doc) => {
            gymNames.push(doc.data()['Name'])
        });
        return gymNames;
    }

    getGymMemberCount = async () => {
        let gymDataSnap = await getDoc(doc(collection(firestoredb, 'gym metadata'), gymID))
        return gymDataSnap.data()['users'].length
    }
}

export default new gymInfoService();
