const sdk = require('node-appwrite');

module.exports = async function (req, res) {
    // Initialize the Appwrite client
    const client = new sdk.Client();

    const users = new sdk.Users(client);

    // Set your Appwrite project endpoint, project ID, and API key
    client
        .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your API Endpoint
        .setProject(process.env.APPWRITE_PROJECT_ID) // Your Project ID
        .setKey(process.env.APPWRITE_API_KEY); // Your API Key

    try {
        // Fetch all users
        const allUsers = await users.list();  // You can add pagination if needed
        
        // Send the list of users as the response
        res.json({
            success: true,
            data: allUsers,
        });
    } catch (error) {
        // Handle any errors
        res.json({
            success: false,
            error: error.message,
        });
    }
};
