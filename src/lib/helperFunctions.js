// helperFunctions.js

// filter likes by postId, pass complete intial state of likes as it is
export const getLikes = (likes, postId) => {
    return likes.filter((like) => like.postId === postId);
};

export const getLikesForUser = (likes, postId, userId) => {
    return likes.filter((like) => like.postId === postId && like.userId === userId);
};

// Pure function to filter comments by postId
export const getComments = (comments, postId) => {
    // return comments.filter((comment) => comment.postId === postId);
    return comments.filter((comment) => comment.postId === postId).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    // Options for formatting the date
    const day = date.getDate();
    const daySuffix = getDaySuffix(day);
    const month = date.toLocaleString('default', { month: 'long' }); // Full month name
    const year = date.getFullYear();

    return `${day}${daySuffix} ${month} ${year}`;
};

// Helper function to get the suffix for the day
export const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // Catch all for 11th to 19th
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};


export const getFollowersByuserId = (userId,followDetails)=>{
    
}
export const getFollowerByuserIdAndFollowerId = (userId_following,userId_follower,followDetails)=>{
    console.log("pritngfollDetailsfromhelperfunc",followDetails);
    
    return followDetails.filter(ele=>ele.userId_follower==userId_follower && ele.userId_following==userId_following)
}