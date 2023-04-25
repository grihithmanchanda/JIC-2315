<div align="center">
    <h1> NextGym </h1>
    <p>💪 Your pocket-sized personal trainer 💪</p>
    <p>An end-to-end solution built with <b> React Native</b> and <b>Google Firebase</b></p>
    <br\>
</div>

---

# Installation Instructions
You will need NodeJS (and the Yarn package manager) to use this app. Additionally, you will need a Firebase account.

1. Download & set up Node.js version `16.18.1`. We recommend using the [node version manager](https://github.com/nvm-sh/nvm) (at your own discretion). For Windows, our team recommends using [nvm for Windows](https://github.com/coreybutler/nvm-windows), also at your discretion.
2. Download the yarn package manager: `npm install -g yarn`
3. Download expo using the yarn package manager: `yarn global add expo-cli`
4. Clone this git repository
5. Navigate to the root directory of this repository (i.e. if the repository is named "jdb2315_coding_demo" and located at "C:\Users\linguini\Documents\jdb2315_coding_demo", open a command prompt and `cd` to "C:\Users\linguini\Documents\jdb2315_coding_demo")
6. Install the required packages: `yarn install`
7. Set up a [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore/quickstart) project and download the firebase config file. Update [the firebase config](firebase-config.js) with your api key, project id, etc.
8. Start the expo project: `npx expo start`


---

# Release Notes / Changelog

## v0.5.0
Streaks and past workout information for gym-goers!
### Features
 - Users now open the app to see their gym's Workout of the Day immediately.
 - Adds user settings for notifications
### Known Issues
 - Lack of security rules for Firebase access (anyone can read/write)
 - Comments and health safety warning text being cutoff if text is too long
 
---

## v0.4.0
Workout features for gym-goers!
### Features
 - Gym managers can add health safety warnings to exercises to alert users of any potential risks
 - Users can start workouts and access the workout screen
 - Workout screen starts a timer that can be paused/resumed when performing exercises
 - Workout screen includes a tracker that users can use for counting the number of reps
 - Workouts can be paused and quit
 - Users can view previous workouts from the workout history screen
### Bug Fixes
 - Frontend for WOTD screens has been implemented
### Known Issues
 - Lack of security rules for Firebase access (anyone can read/write)
 - Comments and health safety warning text being cutoff if text is too long
 
---

## v0.3.0
Added more gym-specific functionality!
### Features
 - Gym managers can add comments on exercises to relay information to users.
 - Users can register for a specific gym and see that gym's specific information.
 - Gym managers now see an accurate number representing the number of users registered to their gym.
 - Users can view gym-specific information such as operating hours, location etc.
 ### Bug Fixes
 - Aggregated all stylesheets to one file instead of each file having their own set.
 ### Known Issues
- Lack of security rules for Firebase access (anyone can read/write)
- WOTD screens lack frontend user functionality for now.
 ### Planned functionality:
  - Users can filter exercises by muscle groups.
  - Users can view Workout of the Day (WOTD) screens - which are workouts created by the gym managers.
    
---

## v0.2.0
UI Specific to Gyms!
### Features
 - Add equipment management screen that allows gym management to input gym equipment
 - Add gym metadata registration page for storing data relating to the gym's name, address, active hours, and phone number
 - Store gym metadata through Firebase
 - Add workout of the day creation screen
 - Store workout of the day through Firebase
 - Add additional fields in equipment that allows managers to create specific workouts for each equipment
 - Allow equipment functionality to be modified or deleted
 - Add exercise management screen
 - Update equipment table to be gym specific
 ### Bug Fixes
 - Code styling and visuals made to be consistent
 ### Known Issues
- Lack of security rules for Firebase access (anyone can read/write)
- Equipment table not refreshing 
    
---
    
## v0.1.0
Initial Release!
### Features
- Add User/Manager account creation & login flows
- Add User/Manager home screens that list relevant information
- Add Firebase account authentication
- Add Firebase equipment storage / service
### Known Issues
- Lack of security rules for Firebase access (anyone can read/write)
- Inconsistent styling for code and visuals

---

Made with love by
[Tyler Jeng](https://github.com/TJeng7),
 [Andy Kao](https://github.com/randyoni),
 [Shashank Lal](https://github.com/shashanklal01),
 [Leo Lee](https://github.com/Leol536),
 [Grihith Manchanda](https://github.com/grihithmanchanda),
 and [Akshin Vemana](https://github.com/AkshinVemana).
