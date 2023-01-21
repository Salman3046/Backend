import * as messenger from "./messenger.controller";
import * as user from "../controllers/users.controller";

import express from "express";
const router = express.Router();

router.post("/getFriendsList", messenger.getFriendsList);
router.post("/getFriendsByInterest", messenger.getFriendsByInterest);
router.post("/getFriendsToMention", messenger.getFriendsToMention);
router.post("/getChatHeadList", messenger.getChatHeadList);
router.post("/getChatHeadById", messenger.getChatHeadById);
router.post("/createUserChatHead", messenger.createUserChatHead);
router.post("/deleteChatHead", messenger.deleteChatHead);
router.post("/deleteChatHeads", messenger.deleteChatHeads);
router.post("/setChatHeadPin", messenger.setChatHeadPin);
router.post("/setChatHeadArchive", messenger.setChatHeadArchive);
router.post("/setChatHeadMute", messenger.setChatHeadMute);
router.post("/searchChatHeadMessages", messenger.searchChatHeadMessages);
router.post("/getChatHeadMessages", messenger.getChatHeadMessages);
router.post("/markChatHeadMessageUnread", messenger.markChatHeadMessagesUnread); //dev by linkitsoft
router.post("/sendMessage", messenger.sendMessage);
router.post("/forwardMessages", messenger.forwardMessages);
router.post("/getForwardToList", messenger.getForwardToList);

router.post("/clearChatHead", messenger.clearChatHead);
router.post("/deleteMessageForMe", messenger.deleteMessageForMe);
router.post("/deleteMessageForAll", messenger.deleteMessageForAll);
router.post("/deleteMessagesForMe", messenger.deleteMessagesForMe);
router.post("/deleteMessagesForAll", messenger.deleteMessagesForAll);
router.post("/removeMessage", messenger.removeChatHeadMessage);
router.post("/sendUserMessage", messenger.sendUserMessage);

router.post("/createGroup", messenger.createGroup);
router.post("/updateGroup", messenger.updateGroup);
router.post("/reportGroup", messenger.reportGroup);
router.post("/deleteGroup", messenger.deleteGroup);
router.post("/getGroupById", messenger.getGroupById);
router.post("/getGroupMembers", messenger.getGroupMembers);
router.post("/getUserGroups", messenger.getUserGroups);
router.post("/getGroupMembersToAdd", messenger.getGroupMembersToAdd);
router.post("/removeUsersFromGroup", messenger.removeUsersFromGroup);
router.post("/leaveGroup", messenger.leaveGroup);
router.post("/addUsersInGroup", messenger.addUsersInGroup);
router.post("/changeGroupMembersRole", messenger.changeGroupMembersRole);

router.post("/createBroadcastList", messenger.createBroadcastList);
router.post("/getBroadcastMembers", messenger.getBroadcastMembers);
router.post("/addMemberToBroadcastList", messenger.AddNewUserToBroadcast);
router.post(
  "/removeMemberFromBroadcastList",
  messenger.removeUserFromBroadcast
);

router.post("/initiateCall", messenger.initiateCall);
router.post("/acceptCall", messenger.acceptCall);
router.post("/declineCall", messenger.declineCall);
router.post("/missedCall", messenger.missedCall);
router.post("/endCall", messenger.endCall);
router.post("/updateMemberCallState", messenger.updateMemberCallState);
router.post("/addToCall", messenger.addToCall);

router.post("/getAllCallHistory", messenger.getAllCallHistory);
router.post("/getUserCallHistory", messenger.getUserCallHistory);
router.post("/archiveChat", messenger.archiveChat);
router.post("/unarchiveChat", messenger.unarchiveChat);
router.post("/getArchivedChats", messenger.getArchiveChats);
//

router.post("/followUser", messenger.followUnFollow);
router.post("/acceptRequest", messenger.approveFollowRequest);
router.post("/declineRequest", messenger.disapproveFollowingRequest);
router.post("/getUserConnections", messenger.getUserConnections);
router.post("/getUserProfile", messenger.getUserProfileById);
router.post("/getUserOwnProfile", messenger.getUserOwnProfile);
router.post("/addnotifSettings", messenger.notificationSettings);
router.post("/deleteAccount", messenger.deleteAccount);
router.post("/messengerSettings", messenger.messengerSettings);
router.post("/privacySettings", messenger.privacySettings);
router.post("/getMpChatHeadList", messenger.getMpChatHeadList);
router.post("/getBpChatHeadList", messenger.getBpChatHeadList);
router.post("/getContacsList", messenger.getContactList);
router.post("/updateUserInterests", messenger.updateUserInterests);

module.exports = router;
