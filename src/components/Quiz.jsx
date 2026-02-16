import { useState } from "react";
import { doc, setDoc,serverTimestamp } from "firebase/firestore"; 
import { useNavigate } from "react-router";
import { auth, db } from "../firebase";

const ACTIVITIES = [
    "Fishing",
    "Kayaking",
    "Swimming",
    "Rowing",
    "Paddle Board",
    "Snorkeling",
    "Sailing",
    "Jet Ski",
    "Wakeboarding",
];

export default function Quiz() {
    const navigate = useNavigate(); 
    const [address, setAddress] = useState("");
    const [activity, setActivity] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = auth.currentUser; 
        if(!user) return; 

        await setDoc(
            doc(db, "users", user.uid),
            {
                uid: user.uid, 
                email: user.email || "",
                homeAddress: address.trim(),
                activityType: activity, 
                updateAt: serverTimestamp(),
            },
            { merge: true}
        );
        navigate("/");
    };

    return (
        <div className="container py-5">
            <h1>Tell me more about yourself!</h1>
            <form onSubmit={handleSubmit} className="mt-4" >
                <div className="mb-3">
                    <label className="form-label">Home Address</label>
                    <input 
                        className="form-control"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter home address"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Water Activity</label>
                    <select
                        className="form-select"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        required
                    >
                        <option value="">Select an activity</option>
                        {ACTIVITIES.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <button className="btn btn-primary" type="submit">
                    Submit Quiz
                </button>
            </form> 
        </div>
    );
}