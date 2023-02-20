import { firestoredb } from "../../firebase-config"
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteField, deleteDoc, listCollections } from "firebase/firestore"

const equipmentCollectionRef = collection(firestoredb, "equipment");

class EquipmentService {


    getAllEquipment = async (currentLoginEmail) => {

        // retrieve associated gym from manager account
        let managerDataSnap = await getDoc(doc(collection(firestoredb, 'managers'), currentLoginEmail))
        let gymID = managerDataSnap.data()['gymID']

        // retrieve all equipment present at this gym
        let gymDataSnap = await getDoc(doc(collection(firestoredb, 'gym metadata'), gymID))
        let equipmentRefs = gymDataSnap.data()['equipment']

        // iterate through all equipment refs, 
        for (let i = 0; i < equipmentRefs.length; i++) {
            let docSnap = await getDoc(equipmentRefs[i])
            //console.log(docSnap.data())
        }

        console.log(getDocs(equipmentCollectionRef))
    };

    addEquipment = async (equipmentName, equipmentCount, equipmentMuscleGroups) => {
        let equipmentData = {
            'count': equipmentCount,
            'muscle groups': equipmentMuscleGroups
        }
        let equipmentDoc = doc(firestoredb, 'equipment', equipmentName)
        return setDoc(equipmentDoc, equipmentData);
    };

    deleteEquipment = async (equipmentName) => {
        let equipmentDoc = doc(firestoredb, 'equipment', equipmentName)
        return deleteDoc(equipmentDoc);
    };

    updateEquipment = async (equipmentName, equipmentCount, equipmentMuscleGroups) => {
        let equipmentData = {
            'count': equipmentCount,
            'muscle groups': equipmentMuscleGroups
        }
        let equipmentDoc = doc(firestoredb, 'equipment', equipmentName)
        return updateDoc(equipmentDoc, equipmentData);
    };

}

export default new EquipmentService();