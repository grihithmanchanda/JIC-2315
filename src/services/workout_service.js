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
    };

    addWorkout = async (workoutList, gymID) => {
        console.log(workoutList, gymID)
        let gymDoc = doc(firestoredb, 'gym metadata', gymID)
        let workoutsCollectionRef = collection(gymDoc, 'workouts')

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const date = `${month}-${day}-${year}`;

        // This arrangement can be altered based on how we want the date's format to appear.
        let wotdDocRef = doc(workoutsCollectionRef, date)

        let wotdData = {
            'exercises': workoutList
        }

        let wotdDoc = await setDoc(wotdDocRef, wotdData)

        return wotdDoc

    }
}

export default new WorkoutService();