import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router"; 
import { auth, db, googleProvider } from "../firebase";

export default function SignIn() {
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user; 
            
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef); 

            if(!userSnap.exists()) {
                await setDoc(userRef, {
                    uid: user.uid, 
                    email: user.email || "",
                    displayName: user.displayName || "", 
                    photoURL: user.photoURL || "",
                    createAt: serverTimestamp(),
                    lastLoginAt: serverTimestamp()
                });
                navigate('/quiz'); 
                return;
            }

            await setDoc(
                userRef, 
                { lastLoginAt: serverTimestamp(), email: user.email || ""},
                { merge: true}
            );
            navigate('/');
        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    };

    return (
        <div className="container py-5">
            <h1>Sign in</h1>
            <button className="btn btn-primary" onClick={handleGoogleSignIn}>
                Sign in with Google
            </button>
        </div>
    );
}