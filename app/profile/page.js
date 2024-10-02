import Link from "next/link"

export default function Profile() {
    return (
        <>
            <h1>Profile</h1>
            <p><Link href="/profile/doctor-profile">DP</Link></p>
            <p><Link href="/profile/patient-profile">PP</Link></p>
        </>
    )
}