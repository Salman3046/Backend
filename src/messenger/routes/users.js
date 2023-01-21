import * as users from "../controllers/users.controller";
import express from "express";
const router = express.Router();

router.post("/expireAllOtherSessions", users.expireAllOtherSessions);
router.post("/byId", users.getOne);
router.post("/getUserProfileById", users.getUserProfileById);
router.post("/update", users.updateUser);
router.post("/updateSession", users.updateSession);
router.post("/logOut", users.logOut);
router.post("/getUserConnections", users.getUserConnections);
router.post("/addUserConnection", users.addUserConnection);
router.post("/addUserToConnection", users.addUserToConnection);
router.post("/removeUserFromConnection", users.removeUserFromConnection);
router.post("/getNotifications", users.getNotifications);
router.post("/removeNotifications", users.removeNotifications);

router.post("/getUserFollowers", users.getUserFollowers);
router.post("/getUserFollowings", users.getUserFollowings);

router.post("/followUnFollow", users.followUnFollow);
router.post("/getFollowingRequests", users.getFollowingRequests);
router.post("/disapproveFollowingRequest", users.disapproveFollowingRequest);
router.post("/approveFollowRequest", users.approveFollowRequest);

router.post("/setBlockUser", users.setBlockUser);
router.post("/blockUser", users.blockUser);
router.post("/unblockUser", users.unblockUser);

router.post("/userDndUser", users.userDndUser);
router.post("/userUnDndUser", users.userUnDndUser);

router.post("/getAllBlockedUsers", users.getAllBlockedUsers);
router.post("/reportUser", users.reportUser);

router.post("/getContacts", users.getContacts);
router.post("/addContact", users.addContact);

router.post("/getEmailAddress", users.getEmailAddress);
router.post("/updateEmailPrimary", users.updateEmailPrimary);

router.post("/getInterests", users.getInterests);
router.post("/addInterests", users.addInterests);

router.post("/getHobbies", users.getHobbies);
router.post("/addHobbies", users.addHobbies);

router.post("/updateUserSpeakLanguage", users.updateUserSpeakLanguage);
router.post("/deleteUserSpeakLanguage", users.deleteUserSpeakLanguage);
router.post("/getUserSpeakLanguage", users.getUserSpeakLanguage);
router.post("/deleteUserSpeakLanguageById", users.deleteUserSpeakLanguageById);

router.post("/getAllSports", users.getAllSports);
router.post("/addToAllSports", users.addToAllSports);
router.post("/getSports", users.getSports);
router.post("/addSports", users.addSports);

router.post("/getAllBooks", users.getAllBooks);
router.post("/addToAllBooks", users.addToAllBooks);
router.post("/addBooks", users.addBooks);
router.post("/getBooks", users.getBooks);

router.post("/getMoviesByName", users.getMoviesByName);
router.post("/getAllMovies", users.getAllMovies);
router.post("/addMovies", users.addMovies);
router.post("/getMovies", users.getMovies);

router.post("/getAllMusic", users.getAllMusic);
router.post("/addMusic", users.addMusic);
router.post("/getMusic", users.getMusic);
// router.post('/unFollow', users.unFollow)
// router.post('/', users.getAll)
// router.post('/updateProfileImage', users.updateUserDp)
// router.post('/updateCoverImage', users.updateUserCover)
// router.post('/getOwnProfile', users.getOwnProfile)
// router.post('/getUserFollowingsByConnectionId', users.getUserFollowingsByConnectionId)
// router.post('/searchUserFollowingsByConnectionId', users.searchUserFollowingsByConnectionId)
// router.post('/searchUserFollowers', users.searchUserFollowers)
//router.post('/searchUserFollowings', users.searchUserFollowings)
// router.post('/getMaritalStatus', users.getMaritalStatus)
// router.post('/getAllSpeakLanguages', users.getAllSpeakLanguages)

router.post("/addQualification", users.addQualification);
router.post("/addSchoolCollege", users.addSchoolCollege);
router.post("/getQualification", users.getQualification);
router.post("/getSchoolCollege", users.getSchoolCollege);
router.post("/addUserEducation", users.addUserEducation);
router.post("/getUserEducation", users.getUserEducation);
router.post("/deleteUserEducation", users.deleteUserEducation);
router.post("/updateUserEducation", users.updateUserEducation);

router.post("/getGroupOfUser", users.getGroupOfUser);
router.post("/getUserBusinessPages", users.getUserBusinessPages);
router.post("/deleteContact", users.deleteContact);
router.post("/getUserAllGroups", users.getUserAllGroups);
router.post("/getUserAllBusinessPages", users.getUserAllBusinessPages);
router.post("/getUserAllConnectionCounts", users.getUserAllConnectionCounts);

router.post("/checkUserCompleteDetails", users.checkUserCompleteDetails);

router.post("/addProfileVisit", users.addProfileVisit);
router.post("/updatePrimaryContact", users.updatePrimaryContact);
router.post("/getMutualFriends", users.getMutualFriends);
router.post("/updateUserInterests", users.updateUserInterests);

router.post("/getInAppSettings", users.getInAppSettings)
router.post("/updateInAppSettings", users.updateInAppSettings)

router.post("/syncContactList", users.syncContactList)
module.exports = router;
