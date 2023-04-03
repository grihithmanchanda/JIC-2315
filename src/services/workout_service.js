import { firestoredb } from "../../firebase-config"
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import equipment_service from "./equipment_service";


const difficultyMapping = {0: 'novice', 1:'intermediate', 2:'advanced'};

class WorkoutService {

    addExercise = async (equipmentName, exerciseName, difficultyLevel, numReps, amtWeight, exerciseComment) => {
        let difficultyMapping = {0: 'novice', 1:'intermediate', 2:'advanced'}
        let difficultyLevelText = difficultyMapping[difficultyLevel];
        let exerciseData = {
            'difficulty': difficultyLevelText,
            'numReps': numReps,
            'amtWeight': amtWeight,
            'exerciseComment': exerciseComment
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

        const date = this.getDateString();
        const difficultyLevelText = difficultyMapping[workoutDifficulty];

        // This arrangement can be altered based on how we want the date's format to appear.
        let wotdDocRef = doc(workoutsCollectionRef, date)

        let wotdData = {
            [difficultyLevelText]: workoutList
        }

        let wotdDoc = await setDoc(wotdDocRef, wotdData, { merge: true })

        return wotdDoc

    }

    // gets current date, formatted as padded MM-DD-YYYY
    getDateString() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const date = `${month}-${day}-${year}`;
        return date;
    }

// gets Workout of the Day for the current day
    getWOD = async (workoutDifficulty = 0) => {
        let gymDoc = doc(firestoredb, 'gym metadata', global.gymID)
        let workoutsCollectionRef = collection(gymDoc, 'workouts')

        const currentDate = this.getDateString();
        const difficultyLevelText = difficultyMapping[workoutDifficulty];

        let wodDocRef = doc(workoutsCollectionRef, currentDate)
        let wodDoc = await getDoc(wodDocRef)
        let wodData = wodDoc.data()

        // format: {"difficulty1": ['exercise1', 'exercise2', ...], "difficulty2": [...], ...}
        return wodData

    }
}

export default new WorkoutService();