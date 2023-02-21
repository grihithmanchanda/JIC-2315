import { firestoredb } from "../../firebase-config"
import { collection, doc, getDocs, setDoc, updateDoc, deleteField, deleteDoc } from "firebase/firestore"

const equipmentCollectionRef = collection(firestoredb, "equipment");

class EquipmentService {
    getAllEquipment = async () => {
        return getDocs(equipmentCollectionRef)
    };

    getAllExercises = async () => {
        const equipmentSnapshot = await this.getAllEquipment();
        const exercises = [];

        // Loop through each equipment document
        for (const equipmentDoc of equipmentSnapshot.docs) {
            const exerciseRef = collection(equipmentDoc.ref, 'exercises')
            const exerciseSnapshot = await getDocs(exerciseRef)

            // loop through each exercise document (of each equipment document)
            for (const exerciseDoc of exerciseSnapshot.docs) {
                const exerciseData = exerciseDoc.data()
                if (exerciseData['difficulty'] === undefined) {
                    exerciseData['difficulty'] = 'N/A'
                }

                // build exercise data object
                exerciseObj = {
                    'exercise name': exerciseDoc.id,
                    'equipment name': equipmentDoc.id,
                    'difficulty': exerciseData['difficulty']
                }
                exercises.push(exerciseObj)
            }
        }
      
    
        return exercises;
    }

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