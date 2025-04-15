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
        <section style={{
            padding: '20px 0', width: '85%', margin: 'auto',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh'
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
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} className='Personal-Details'>
                <h5>Personal Details</h5>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        {userDetails.gender === 'male' ?
                            (<i style={{ fontSize: '30px' }} className="fa-solid fa-person"> {userDetails.gender}</i>) :
                            (<i style={{ fontSize: '30px' }} className="fa-solid fa-person-dress"> {userDetails.gender}</i>)}
                    </div>
                    <div>
                        <i className="fa-solid fa-phone">  {userDetails.phone}</i>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <i className="fa-solid fa-cake-candles"> {userDetails.birthDate}</i>
                    </div>
                    <div>
                        <i className="fa-solid fa-droplet"> {userDetails.bloodGroup}</i>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <i className="fa-solid fa-arrows-up-down"> {userDetails.height}</i>
                    </div>
                    <div>
                        <i className="fa-solid fa-weight-scale">{userDetails.weight}</i>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <i className="fa-solid fa-eye">{userDetails.eyeColor}</i>
                    </div>
                    <div>
                        <i className="fa-solid fa-head-side-virus"> {`${userDetails?.hair?.color} ${userDetails?.hair?.type}`}
                        </i>

                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <i className="fa-solid fa-location-dot"> {`${userDetails?.address?.address} ${userDetails?.address?.city}`}</i>
                    </div>
                    <div>
                        <i className="fa-solid fa-location-dot"> {`${userDetails?.address?.state} ${userDetails?.address?.country}`}</i>
                    </div>
                </div>
            </div>
            <div className="education">
                <h5>Education</h5>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%',margin:'30px 0' }}>
                    <i class="fa-solid fa-graduation-cap"> {userDetails.university}</i>
                </div>
            </div>
            <div className="Work-Experience">
                <h5>Work Experience</h5>
                <div style={{paddingBottom:'20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', textAlign: 'left' }}>
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