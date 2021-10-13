import React, { useState } from "react";
import UpdateProfile from "../../../../../../components/update_profile_button/UpdateProfile";
import DetailTag from "./components/DetailTag";

import UpdateProfileComponents from "./components/UpdateProfileComponents";
const MyDetails = ({ user }) => {
  const [phone, setPhone] = useState(null);
  const [birthday, setBirthday] = useState(new Date().toISOString().split("T")[0]);
  const [address, setAddress] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [email, setEmail] = useState(null);

<<<<<<< HEAD
  const [updateProfile, setUpdateProfile] = useState(false);
  const onSubmit = () => {
    console.log("data is uploaded");
  };
=======
    return (
        <section className = 'mydetails'>
                
                {
                    user ?
                        <>
                            <DetailTag class1 = 'tag ' label = 'phone' value = {user.phoneNumber}/>
                            <DetailTag class1 = 'tag ' label = 'Birthday' value = {user.dateOfBirth}/>
                            <DetailTag class1 = 'tag tag__address' label = 'address' value = {user.address} />
                            <DetailTag class1 = 'tag ' label = 'Country Code' value = {user.countryCode}/>
                            <DetailTag class1 = 'tag ' label = 'Email' value = {user.email}/>
                        </>
                    :
                        null
                }
                
        </section>
    )
}
>>>>>>> main

  

  return (
    <section className="mydetails">
      {user ? (
        <>
          <div className="mydetails__details">
            <DetailTag class1="tag " label="phone" value={user.phoneNumber} />
            <DetailTag
              class1="tag "
              label="Birthday"
              value={user.dateOfBirth}
            />
            <DetailTag
              class1="tag tag__address"
              label="address"
              value={user.address}
            />
            <DetailTag
              class1="tag "
              label="Country Code"
              value={user.countryCode}
            />
            <DetailTag class1="tag " label="Email" value={user.email} />
          </div>

          <div className="mydetails__update-button">
            <UpdateProfile setUpdateProfile={setUpdateProfile} />
          </div>
          {
              updateProfile ? 
              (
                    <UpdateProfileComponents onSubmit = {setUpdateProfile}/>
            ) 
                : 
                null
        }
        </>
      ) : null}
    </section>
  );
};

export default MyDetails;
