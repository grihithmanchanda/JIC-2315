import { firestoredb } from "../../firebase-config"
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteField, deleteDoc, listCollections, arrayUnion, arrayRemove } from "firebase/firestore"

const equipmentCollectionRef = collection(firestoredb, "equipment");

let gymID = '';

class EquipmentService {


    getAllEquipment = async (currentLoginEmail) => {

        // retrieve associated gym from manager account
        let managerDataSnap = await getDoc(doc(collection(firestoredb, 'managers'), currentLoginEmail))
        gymID = managerDataSnap.data()['gymID']

        // retrieve all equipment present at this gym
        let gymDataSnap = await getDoc(doc(collection(firestoredb, 'gym metadata'), gymID))
        let equipmentRefs = gymDataSnap.data()['equipment']

        // get all equipment docs, return to frontend
        let equipmentDocs = []
        for (let i = 0; i < equipmentRefs.length; i++) {
            equipmentDocs.push((await getDoc(equipmentRefs[i])))
        }

        return equipmentDocs
    };

    addEquipment = async (equipmentName, equipmentCount, equipmentMuscleGroups) => {
        // Creates the new equipment and adds it to the equipment collection under gym metadata
        let equipmentData = {
            'count': equipmentCount,
            'muscle groups': equipmentMuscleGroups
        }

        let equipmentDoc = doc(firestoredb, 'gym metadata/' + gymID + '/equipment', equipmentName)
        setDoc(equipmentDoc, equipmentData);

        // Adds the reference to the equipment under the gym metadata
        const gymdata = doc(collection(firestoredb, 'gym metadata'), gymID)
                await updateDoc(gymdata, {
            equipment: arrayUnion(equipmentDoc)
        })
    };

    deleteEquipment = async (equipmentName) => {
        // Deletes the equipment from equipment collection under gym metadata
        let equipmentDoc = doc(firestoredb, 'gym metadata/' + gymID + '/equipment', equipmentName)
        deleteDoc(equipmentDoc);
        
        // Removes the reference to the equipment
            const gymdata = doc(collection(firestoredb, 'gym metadata'), gymID)
                await updateDoc(gymdata, {
            equipment: arrayRemove(equipmentDoc)
        })
    };

    updateEquipment = async (equipmentName, equipmentCount, equipmentMuscleGroups) => {
        // Updates the equipment in the equipment collection under gym metadata
        let equipmentData = {
            'count': equipmentCount,
            'muscle groups': equipmentMuscleGroups
        }
        let equipmentDoc = doc(firestoredb, 'gym metadata/' + gymID + '/equipment', equipmentName)
        return updateDoc(equipmentDoc, equipmentData);
    };

}

export default new EquipmentService();