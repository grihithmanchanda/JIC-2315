import { firestoredb } from "../../firebase-config"
import { collection, doc, setDoc, updateDoc } from "firebase/firestore"
import equipment_service from "./equipment_service";

class WorkoutService {

    addExercise = async (equipmentName, exerciseName, difficultyLevel, numReps, amtWeight, exerciseComment, healthSafety) => {
        let difficultyMapping = {0: 'novice', 1:'intermediate', 2:'advanced'}
        let difficultyLevelText = difficultyMapping[difficultyLevel];
        let exerciseData = {
            'difficulty': difficultyLevelText,
            'numReps': numReps,
            'amtWeight': amtWeight,
            'exerciseComment': exerciseComment,
            'healthSafety': healthSafety
        }

        let equipmentData = await equipment_service.getEquipment(equipmentName)
        let eqRef = equipmentData.ref

        let exerciseRef = doc(eqRef, 'exercises', exerciseName)

        await setDoc(exerciseRef, exerciseData)
        
        return exerciseData
    };

    addWorkout = async (workoutList, gymID, workoutDifficulty) => {
        let gymDoc = doc(firestoredb, 'gym metadata', gymID)
        let workoutsCollectionRef = collection(gymDoc, 'workouts')

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const date = `${month}-${day}-${year}`;

        let difficultyMapping = {0: 'novice', 1:'intermediate', 2:'advanced'}
        let difficultyLevelText = difficultyMapping[workoutDifficulty];

        // This arrangement can be altered based on how we want the date's format to appear.
        let wotdDocRef = doc(workoutsCollectionRef, date)

        let wotdData = {
            [difficultyLevelText]: workoutList
        }

        let wotdDoc = await updateDoc(wotdDocRef, wotdData)

        return wotdDoc

    }
}

export default new WorkoutService();