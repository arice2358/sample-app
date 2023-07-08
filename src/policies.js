/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_susi",
        editProfile: "B2C_1_profile"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://sampleB2Corg.b2clogin.com/sampleB2Corg.onmicrosoft.com/B2C_1_susi",
        },
        editProfile: {
            authority: "https://sampleB2Corg.b2clogin.com/sampleB2Corg.onmicrosoft.com/B2C_1_profile"
        }
    },
    authorityDomain: "sampleB2Corg.b2clogin.com"
}