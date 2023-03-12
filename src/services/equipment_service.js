import { firestoredb } from "../../firebase-config"
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteField, deleteDoc, listCollections, arrayUnion, arrayRemove } from "firebase/firestore"
import login_service from "./login_service";

const equipmentCollectionRef = collection(firestoredb, "equipment");

let gymID = '';

class EquipmentService {


    getAllEquipment = async (loginEmail=currentLoginEmail) => {

        // ensure gymID is set
        if (gymID === '') {
            await this.getGymID()
        }

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

    getGymID = async(loginEmail=currentLoginEmail) => {
        // retrieve associated gym from manager account
        let managerDataSnap = await getDoc(doc(collection(firestoredb, 'managers'), loginEmail))
        gymID = managerDataSnap.data()['gymID']
        return gymID
    }

    getEquipment = async(eqName, loginEmail=currentLoginEmail) => {

        // ensure gymID is set
        if (gymID === '') {
            await this.getGymID()
        }

        // let eqRef = doc(collection(doc(collection(firestoredb, 'gym metadata'), gymID), 'equipment'), eqName)
        // let gymCollection = collection(firestoredb, 'gym metadata')
        // let gymRef = doc(gymCollection, gymID)
        // let eqColRef = collection(gymRef, 'equipment')
        // let eqRef = doc(eqColRef, eqName)

        let eqRef = doc(firestoredb, 'gym metadata', gymID, 'equipment', eqName)
        let eqSnap = await getDoc(eqRef)
        let eqData = {'id':eqSnap.id, 'data':eqSnap.data(), 'ref': eqSnap.ref}

        return eqData
    }

    getAllExercises = async (loginEmail=currentLoginEmail) => {

        const equipmentQuery = await this.getAllEquipment(loginEmail);
        const exercises = [];

        // Loop through each equipment document
        for (const equipmentDoc of equipmentQuery) {            
            const exerciseRefs = collection(equipmentDoc.ref, 'exercises')
            const exerciseDocs = await getDocs(exerciseRefs)

            exerciseDocs.forEach((exerciseDoc) => {
                // doc.data() is never undefined for query doc snapshots
                const exerciseData = exerciseDoc.data()
                if (exerciseData['difficulty'] === undefined) {
                    console.log('difficulty undefined')
                    exerciseData['difficulty'] = 'N/A'
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