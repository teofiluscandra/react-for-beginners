import Rebase from 're-base'
import Firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
export const app = Firebase.initializeApp({
    apiKey: "AIzaSyBnGUNWEIewrb6vCvg7DKvbjaQKExJPxDc",
    authDomain: "myblog-code.firebaseapp.com",
    databaseURL: "https://myblog-code.firebaseio.com"
})
export const base = Rebase.createClass(app.database())
