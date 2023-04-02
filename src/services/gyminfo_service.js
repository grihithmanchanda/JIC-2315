import { firestoredb } from "../../firebase-config"
import { collection, doc, getDocs, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore"

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
    }

    addUserToGym = async(gymName) => {
        // TODO: check if gym exists
        // for now, we will assume the gym exists

        let gymDoc = doc(firestoredb, 'gym metadata', gymName)

        let userDoc = doc(firestoredb, 'users', currentLoginEmail)
        
        await updateDoc(gymDoc, {
            users: arrayUnion(userDoc)
        })

        await updateDoc(userDoc,
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

    // helper method to get gym document for a user
    getGymOfUser = async() => {

        // get data for all gyms
        const gymMetadataCollection = await this.getAllGymInfo();

        // loop through each gym until we find one with a matching user entry
        for (const gymDoc of gymMetadataCollection.docs) {
            if (gymDoc.data()['users'] !== undefined) {
                let userDocsArr = await gymDoc.data()['users']
                // loop through gym's user array
                for (const userDoc of userDocsArr) {
                    let userDataSnap = await getDoc(userDoc);
                    let userData = await userDataSnap.data()
                    // if a username matches current user's, we found their gym
                    if (userData !== undefined && userData['username'] === currentLoginEmail) {
                        global.gymID = gymDoc.data().Name
                        return gymDoc.ref;
                    }
                }
            }
        }
        // couldn't find a matching gym; return undefined
        return undefined
    }
}

export default new gymInfoService();
