// module.exports = {
//     validateUserBody
// }

// function validateUserBody(user) {
//     let errors = [];

//     if(!user.username || user.username.length < 6) {
//         errors.push('Please provide a username with at least 6 characters')
//     } 
//     if(!user.password || user.password.length < 8) {
//         errors.push('Please provide a password with at least 6 characters')
//     }
//     if(!user.department) {
//         errors.push('Please provide a department for this user')
//     }
//     return {
//         isSuccessful: errors.length > 0 ? false : true,
//         errors
//     }
// }