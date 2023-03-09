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
        // let equipmentRefs = gymDataSnap.data()['equipment']
        let equipmentRefs = [];
        if (gymDataSnap.exists()) {
            let equipmentRef = collection(gymDataSnap.ref, 'equipment')
            let equipmentQuery = await getDocs(equipmentRef)
            if (equipmentQuery.empty) {
                // equipment collection doesn't exist
                // TODO: create equipment collection
            } else {
                // equipment collection exists, pull data
                equipmentQuery.forEach((doc) => {
                    equipmentRefs.push(doc)
                })
                return equipmentRefs
            }
        } else {
            //TODO: gym doesn't exist?
        }

        return equipmentRefs
    };

    getAllExercises = async (currentLoginEmail) => {

        console.log('hi')
        const equipmentQuery = await this.getAllEquipment(currentLoginEmail);
        const exercises = [];

        // Loop through each equipment document
        for (const equipmentDoc of equipmentQuery) {
            console.log(equipmentDoc.id)
            
            const exerciseRefs = collection(equipmentDoc.ref, 'exercises')
            
            const exerciseDocs = await getDocs(exerciseRefs)

            exerciseDocs.forEach((exerciseDoc) => {
                // doc.data() is never undefined for query doc snapshots
                const exerciseData = exerciseDoc.data()
                if (exerciseData['difficulty'] === undefined) {
                    console.log('difficulty undefined')
                    exerciseData['difficulty'] = 'N/A'
                } else {
                    console.log('difficulty:', exerciseData['difficulty'])
                }

                // build exercise data object
                let exerciseObj = {
                    'exercise name': exerciseDoc.id,
                    'equipment name': equipmentDoc.id,
                    'difficulty': exerciseData['difficulty']
                }
                exercises.push(exerciseObj)
            });
        }
      
    
        return exercises;
    }

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