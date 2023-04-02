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

        // update manager doc with gymID
        await updateDoc(doc(firestoredb, "managers", currentLoginEmail),
            {
                gymID: gymName,
            });

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
        let gymDataSnap = await getDoc(doc(collection(firestoredb, 'gym metadata'), global.gymID))
        return gymDataSnap.data()['users']?.length || 0
    }

    // helper method to get gym document for a user
    getGymOfUser = async() => {

        let userDoc = doc(firestoredb, 'users', currentLoginEmail)
        let currentUserDataSnap = await getDoc(userDoc)
        let currentUserData = currentUserDataSnap.data()

        if(currentUserData !== undefined && currentUserData['gymID'] !== undefined) {
            global.gymID = currentUserData['gymID']
            return currentUserData['gymID']
        } else {
            console.log('user doc doesn\'t have gym')

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
                            return gymDoc.data().Name;
                        }
                    }
                }
            }
            // couldn't find a matching gym; return undefined
            return undefined
        }

    }
}

export default new gymInfoService();
