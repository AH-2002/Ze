import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import BASE_URL from "../config";


export default function UserDetails() {
    let params = useParams();
    let [userDetails, setUserDetails] = useState({});
    async function getUserDetials() {
        let { data } = await axios.get(`${BASE_URL}/users/${params.id}`)
        console.log(data);
        setUserDetails(data);
    }
    useEffect(() => { getUserDetials() }, [])
    return (
        <section className='user-details' style={{
            padding: '20px 0', width: '85%', margin: 'auto',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <img
                        src={userDetails.image}
                        alt={`${userDetails.firstName} ${userDetails.lastName}`}
                        width="100"
                        height="100"
                        style={{ borderRadius: "50%", objectFit: "cover", marginRight: "10px" }}
                    />
                </div>
                <div style={{ fontSize: '40px' }}>
                    {`${userDetails.firstName} ${userDetails.maidenName} ${userDetails.lastName}`}
                </div>
            </div>
            <div className='personal-details' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <h5>Personal Details</h5>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        {userDetails.gender === 'male' ?
                            (<><i style={{ fontSize: '30px' }} className="fa-solid fa-person"></i><span> {userDetails.gender}</span></>) :
                            (<><i style={{ fontSize: '30px' }} className="fa-solid fa-person-dress"></i> <span> {userDetails.gender}</span></>)}
                    </div>
                    <div>
                        <i className="fa-solid fa-phone"></i>
                        <span> {userDetails.phone}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <i className="fa-solid fa-cake-candles"></i>
                        <span> {userDetails.birthDate}</span>
                    </div>
                    <div>
                        <i className="fa-solid fa-droplet"></i>
                        <span> {userDetails.bloodGroup}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <i className="fa-solid fa-arrows-up-down"></i>
                        <span> {userDetails.height}</span>
                    </div>
                    <div>
                        <i className="fa-solid fa-weight-scale"></i>
                        <span>{userDetails.weight}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <i className="fa-solid fa-eye"></i>
                        <span>{userDetails.eyeColor}</span>
                    </div>
                    <div>
                        <i className="fa-solid fa-head-side-virus"></i>
                        <span> {`${userDetails?.hair?.color} ${userDetails?.hair?.type}`}</span>

                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <i className="fa-solid fa-location-dot"></i>
                        <span> {`${userDetails?.address?.address} ${userDetails?.address?.city}`}</span>
                    </div>
                    <div>
                        <i className="fa-solid fa-location-dot"></i>
                        <span> {`${userDetails?.address?.state} ${userDetails?.address?.country}`}</span>
                    </div>
                </div>
            </div>
            <div className="education">
                <h5>Education</h5>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <i class="fa-solid fa-graduation-cap"></i>
                        <span>{userDetails.university}</span>
                    </div>
                </div>
            </div>
            <div className="Work-Experience">
                <h5>Work Experience</h5>
                <div style={{fontSize: 'larger', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'auto', textAlign: 'left' }}>
                    <div>
                        {`Company: ${userDetails?.company?.name}`}
                    </div>
                    <div>
                        {`Job title: ${userDetails?.company?.name}`}
                    </div>
                    <div>
                        {`Department: ${userDetails?.company?.department}`}
                    </div>
                    <div>
                        {`Address: ${userDetails?.company?.address?.address}, ${userDetails?.company?.address?.city}, ${userDetails?.company?.address?.state}, ${userDetails?.company?.address?.country} `}
                    </div>
                    <div>
                        {`Role: ${userDetails.role}`}
                    </div>
                </div>
            </div>
        </section >
    )
}