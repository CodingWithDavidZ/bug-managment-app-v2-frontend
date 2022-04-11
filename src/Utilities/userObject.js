import { useState } from "react";

const [userObj, setUserObj] = useState({
  uid: "",
  providerId: "",
  accessToken: "",
  displayName: "",
  email: "",
  emailVerified: false,
  isAnonymous: false,
  metadata: {
    creationTime: "",
    lastSignInTime: "",
  },
  clientVersion: "",
  phoneNumber: "",
  photoURL: "",
  tenantId: "",
});

// uid:${user.user.uid}
// providerId:${user.user.providerId}
// accessToken:${user.user.accessToken}
// displayName:${user.user.displayName}
// email:${user.user.email}
// emailVerified:${user.user.emailVerified}
// isAnonymous:${user.user.isAnonymous}
//metadata:{
//creationTime:${user.user.metadata.creationTime}
//lastSignInTime:${user.user.metadata.lastSignInTime}
//}
//clientVersion:${user.user.auth.clientVersion}
//phoneNumber:${user.user.phoneNumber}
//photoURL:${user.user.photoURL}
//tenantId:${user.user.tenantId}
