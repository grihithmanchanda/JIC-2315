import { firestoredb } from "../../firebase-config"
import { collection, doc, getDoc, setDoc, updateDoc, deleteField, deleteDoc } from "firebase/firestore"

const equipmentCollectionRef = collection(firestoredb, "equipment");

class WorkoutService {
    addExercise = async (equipmentName, exerciseName, difficultyLevel, numReps, amtWeight) => {
        let difficultyMapping = {0: 'novice', 1:'intermediate', 2:'advanced'}
        let difficultyLevelText = difficultyMapping[difficultyLevel];
        let exerciseData = {
            'difficulty': difficultyLevelText,
            'numReps': numReps,
            'amtWeight': amtWeight
        }
        let equipmentRef = doc(equipmentCollectionRef, equipmentName)
        let exercisesRef = collection(equipmentRef, 'exercises')
        let exerciseRef = doc(exercisesRef, exerciseName)
        await setDoc(exerciseRef, exerciseData)
        
        let exerciseDoc = await getDoc(exerciseRef)
        return exerciseDoc.data()
        // let exerciseCollection = collection(equipmentRef.ref, 'exercises')
        // let exerciseDoc = doc(exerciseCollection, exerciseName)
        // console.log(await getDocs(exerciseCollection).data())
        // return setDoc(exerciseDoc, exerciseData);
    };
}

export default new WorkoutService();