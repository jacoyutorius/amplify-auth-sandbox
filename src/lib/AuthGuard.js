// import Auth from "@aws-amplify/auth";

// function AuthGuard() {
//   Auth.currentAuthenticatedUser()
//     .then(user => {
//       return Auth.changePassword(user, 'oldPassword', 'newPassword');
//     })
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
// }