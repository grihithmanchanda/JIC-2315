import { firestoredb } from "../../firebase-config"
import { collection, doc, getDocs, setDoc, updateDoc, deleteField } from "firebase/firestore"

const equipmentCollectionRef = collection(firestoredb, "equipment");

class EquipmentService {
    getAllEquipment = async () => {
        return getDocs(equipmentCollectionRef)
    };

    addEquipment = async (equipmentName, equipmentCount, equipmentMuscleGroups) => {
        let equipmentData = {
            'count': equipmentCount,
            'muscle groups': equipmentMuscleGroups
        }
        let equipmentDoc = doc(firestoredb, 'equipment', equipmentName)
        return setDoc(equipmentDoc, equipmentData);
    };

    deleteEquipment = async (equipmentName, equipmentCount, equipmentMuscleGroups) => {
        let equipmentData = {
            'count': equipmentCount,
            'muscle groups': equipmentMuscleGroups
        }
        let equipmentDoc = doc(firestoredb, 'equipment', equipmentName)
        return updateDoc(equipmentDoc, {equipmentData: deleteField()});
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