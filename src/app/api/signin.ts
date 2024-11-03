// export async function signIn({
//   email,
//   name,
//   clerk_id,
//   profile_picture,
// }: {
//   email: string
//   name: string
//   clerk_id: string
//   profile_picture: string
// }): Promise<VerifyCookDetailsResponse.AsObject> {
//   return new Promise((resolve, reject) => {
//     const request = new VerifyCookDetailsRequest()
//     request.setEmail(email)
//     request.setName(name)
//     request.setClerkId(clerk_id)
//     request.setProfilePicture(profile_picture)

//     cookService.verifyCookDetails(
//       request,
//       {},
//       (err, response: VerifyCookDetailsResponse) => {
//         if (err) {
//           console.error('Failed to sign in', err)
//           reject(err)
//         } else {
//           resolve(response.toObject())
//         }
//       }
//     )
//   })
// }
