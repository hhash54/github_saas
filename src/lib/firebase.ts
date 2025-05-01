// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcgxWzvosvOj1DSlxZxK58C7QSexhQHQU",
    authDomain: "gh-saas-48ef8.firebaseapp.com",
    projectId: "gh-saas-48ef8",
    storageBucket: "gh-saas-48ef8.firebasestorage.app",
    messagingSenderId: "358828552234",
    appId: "1:358828552234:web:b02ad459b75da6c98ed353"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)
export async function uploadFile(file: File, setProgress?: (progress: number) => void) {
    return new Promise((resolve, reject) => {
      try {
        const storageRef = ref(storage, file.name)
        const uploadTask = uploadBytesResumable(storageRef, file)
  
        uploadTask.on('state_changed', snapshot => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          if (setProgress) setProgress(progress)
          switch (snapshot.state) {
            case 'paused':
              console.log('upload is paused'); break;
            case 'running':
              console.log('upload is running'); break;
          }
        }, error => {
          reject(error)
        },()=>{
            getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
                resolve(downloadUrl)
            })
              
        })
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
  }
  