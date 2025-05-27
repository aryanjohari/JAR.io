export const AmplifyConfig = {
  Auth: {
    region: "ap-south-1",
    userPoolId: "ap-south-1_Vmg7nC4qu", // From SAM output
    userPoolWebClientId: "3nsjtbc7r05k2ujuna2nd58gks", // From SAM output
  },
  API: {
    endpoints: [
      {
        name: "JARioAPI",
        endpoint: "http://127.0.0.1:3000/api", // Update to API Gateway URL later
        region: "ap-south-1",
      },
    ],
  },
};
