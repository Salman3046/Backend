require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../../helpers/responce";

import * as groupsPostFuncs from "../../funcs/groups/grpPosts.funcs";
import * as grpPollPosts from "../../funcs/groups/grpPollPosts.funcs";
import * as grpThoughtPosts from "../../funcs/groups/grpThoughtPost.funcs";
import * as grpMediaPosts from "../../funcs/groups/grpMediaPosts.funcs";
import * as grpAudioPosts from "../../funcs/groups/grpAudioPost.funcs";
import * as grpThreatPosts from "../../funcs/groups/grpThreatPosts.funcs";
import * as grpEventPosts from "../../funcs/groups/grpEventsPosts.funcs";
import * as grpArticalPosts from "../../funcs/groups/grpArticlePosts.funcs";
import * as getGroupGeneralSetings from "../../funcs/groups/group.funcs";
import * as grpManagementHistory from '../../funcs/groups/grpManagementHistory.funcs';
import * as user from '../../funcs/users.funcs';
import * as groupAdministraterFuncs from '../../funcs/groups/grpAdministrator.funcs';
import * as taggedPeoples from '../../funcs/groups/grpPostTaggedUsers.funs';
import * as groupPollPost from '../../funcs/groups/grpPollPosts.funcs';
import * as postFuncs from "../../funcs/post.funcs";
import * as groupsMemberFuncs from "../../funcs/groups/grpMembers.funcs";
import * as adminContNotificationFuncs from '../../funcs/adminContNotificationFuncs/adminContNotification.funcs'


export const sendPostToFeed = async (req, res, feedPostData) => {
  try {
      const postType = req.body.postType

      if (!postType) {
          return failResponse(req, res, "postTypeNotAvailable")
      }
      if (feedPostData.locationLAT === undefined) {
          return failResponse(req, res, "locationLATNotAvailable")
      }
      if (feedPostData.locationLONG === undefined) {
          return failResponse(req, res, "locationLONGNotAvailable")
      }
      if (!feedPostData.location2) {
          return failResponse(req, res, "location2NotAvailable")
      }
      if (!feedPostData.location3) {
          return failResponse(req, res, "location3NotAvailable")
      }

      switch (postType) {
          case "text": {
              if (!feedPostData.caption) {
                  return failResponse(req, res, "captionNotAvailable")
              }
              await postFuncs.createTextPost(req.user.id, feedPostData)
              break;
          }
          case "thought": {
              await postFuncs.createThoughtPost(req.user.id, feedPostData)
              break;
          }
          case "media": {
              if (!feedPostData.mediaList || !feedPostData.mediaList.length) {
                  return failResponse(req, res, "noMediaForMediaPost")
              }
              try {
                  await postFuncs.createMediaPost(req.user.id, feedPostData)
              } catch (err) {
                  return errorResponse(req, res, { err, mediaList: feedPostData.mediaList })
              }
              break;
          }
          case "article": {
              if (!feedPostData.articleCategoryId) {
                  return failResponse(req, res, "articleCategoryIdNotAvailable")
              }
              if (!feedPostData.articleCoverImageURL) {
                  return failResponse(req, res, "articleCoverImageURLNotAvailable")
              }
              if (!feedPostData.articleItems || !feedPostData.articleItems.length) {
                  return failResponse(req, res, "noArticleItemForMediaPost")
              }
              await postFuncs.createArticlePost(req.user.id, feedPostData)
              break;
          }
          case "recommendation": {
              if (!feedPostData.caption) {
                  return failResponse(req, res, "captionNotAvailable")
              }
              // if (!req.body.recommendationCoverImageURL) {
              //     return failResponse(req, res, "recommendationCoverImageURLNotAvailable")
              // }
              await postFuncs.createRecommendationPost(req.user.id, feedPostData)
              break;
          }
          case "poll": {
              if (!feedPostData.caption) {
                  return failResponse(req, res, "captionNotAvailable")
              }
              if (!feedPostData.pollStartTime) {
                  return failResponse(req, res, "pollStartTimeNotAvailable")
              }
              if (!feedPostData.pollEndTime) {
                  return failResponse(req, res, "pollEndTimeNotAvailable")
              }
              await postFuncs.createPollPost(req.user.id, feedPostData)
              break;
          }
          case "event": {
              if (!feedPostData.caption) {
                  return failResponse(req, res, "captionNotAvailable")
              }
              if (!feedPostData.eventCoverImageURL) {
                  return failResponse(req, res, "eventCoverImageURLNotAvailable")
              }
              if (!feedPostData.eventStartTime) {
                  return failResponse(req, res, "eventStartTimeNotAvailable")
              }
              if (!feedPostData.eventEndTime) {
                  return failResponse(req, res, "eventEndTimeNotAvailable")
              }
              if (!feedPostData.eventCategoryId) {
                  return failResponse(req, res, "eventCategoryIdNotAvailable")
              }
              await postFuncs.createEventPost(req.user.id, feedPostData)
              break;
          }
          case "alert": {
              if (!feedPostData.caption) {
                  return failResponse(req, res, "captionNotAvailable")
              }
              if (!feedPostData.alertLevelId) {
                  return failResponse(req, res, "alertLevelIdNotAvailable")
              }
              if (!feedPostData.alertRangeMeter) {
                  return failResponse(req, res, "alertRangeMeterNotAvailable")
              }
              await postFuncs.createAlertPost(req.user.id, feedPostData)
              break;
          }
          case "shotz": {
              if (!feedPostData.shotzLength) {
                  return failResponse(req, res, "shotzLengthNotAvailable")
              }
              if (!feedPostData.shotzAudioId) {
                  return failResponse(req, res, "shotzAudioIdNotAvailable")
              }
              if (!feedPostData.shotzMediaURL) {
                  return failResponse(req, res, "shotzMediaURLNotAvailable")
              }
              await postFuncs.createShotzPost(req.user.id, feedPostData)
              break;
          }
          case "goLive": {
              await postFuncs.createGoLivePost(req.user.id, feedPostData)
              break;
          }
          case "podcast": {
              await postFuncs.createPodcastPost(req.user.id, feedPostData)
              break;
          }
      }
      return
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const createGroupPost = async (req, res) => {
  try {
    const postType = req.body.postType;
    // const userId = req.user?.id || req.body.user.id;
    const userId = req.user.id || req.body.user.id;

    if (!postType) {
      return failResponse(req, res, "postTypeNotAvailable");
    }
    let settings = await getGroupGeneralSetings.getGroupGeneralSettings({
      groupId: req.body.groupId,
    });
    let isPostReviewed;

    if (settings) {
      if (req.body.isCreatedByGrpOwner) {
        isPostReviewed = true;
      } else {
        isPostReviewed = settings[0].isPostReviewed === 1 ? false : true;
      };
    };

    const findAdmin = await groupAdministraterFuncs.findGrpAdministrater({ groupId: req.body.groupId, userId });
    if (findAdmin) {
      const getUser = await user.getUserById(userId);
      let eventKey = `Added ${postType} post to the group`;
      const createHistory = grpManagementHistory.createGroupManagementHistory({ groupId: req.body.groupId, grpAdminId: userId, eventKey });
    };

    switch (postType) {
      case "text": {
        if (!req.body.caption) {
          return failResponse(req, res, "captionNotAvailable");
        }
        await groupsPostFuncs.createGroupTextPost(req.body, isPostReviewed);
        break;
      }
      case "thought": {
        // let checkColorExists = await grpThoughtPosts.checkColorExists(req.body.thoughtData);
        // if (!checkColorExists) return failResponse(req, res, "colorIds notExist")
        await groupsPostFuncs.createThoughtPost(req.body, isPostReviewed);
        break;
      }
      case "media": {
        if (!req.body.mediaList || !req.body.mediaList.length) {
          return failResponse(req, res, "noMediaForMediaPost");
        }
        await groupsPostFuncs.createMediaPost(req.body, isPostReviewed);
        break;
      }
      case "podcast": {
        if (!req.body.audioList || !req.body.audioList.length) {
          return failResponse(req, res, "noAudioForMediaPost");
        }
        await groupsPostFuncs.createAudioPost(req.body, isPostReviewed);

        break;
      }
      case "threat": {
        if (!req.body.threatPostData) {
          return failResponse(req, res, "noThreatPostData");
        }
        await groupsPostFuncs.creategrpThreatPosts(req.body, isPostReviewed);
        break;
      }
      case "event": {
        if (!req.body.eventPostData) {
          return failResponse(req, res, "noEventPostData");
        }
        await groupsPostFuncs.creategrpEventPosts(req.body, isPostReviewed);
        break;
      }
      case "blog": {
        if (!req.body.blogPostData) {
          return failResponse(req, res, "noBlogPostData");
        }
        await groupsPostFuncs.createGrpBlogPosts(req.body, isPostReviewed);
        break;
      }
      case "poll": {
        if (!req.body.pollPostData) {
          return failResponse(req, res, "noPollPostData");
        }
        await groupsPostFuncs.createGrpPollPosts(req.body, isPostReviewed);
        break;
      }
    }
    if(req.body.isPostShareToFeed) {
      const shareToFeed = await sendPostToFeed(req, res, req.body.feedPostData);
    };
    const grpData = await groupsMemberFuncs.getGroupDetailByGroupId(req.body.groupId);
    const name = grpData[0].name;
    const grpMembers = await groupsMemberFuncs.getGroupMembersByGroupId(req.body.groupId);
    req.user.id = userId;
    for (let i = 0; i < grpMembers.length; i++) { 
      // NOTIFICATION CODE 
      const userData = {
          ...req.user,
          name,
          userId : grpMembers[i].membersId
      }
      const inApp = {
          notificationType : "group-newPost",
          postId : req.body.groupId
      }
      await adminContNotificationFuncs.sendNotificationsByType("group-newPost", userData, inApp)
    };
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

/*Get groups posts by groups*/
export const getGroupPostByGrpId = async (req, res) => {
  try {
    const data = await groupsPostFuncs.getAllGroupPosts(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

/*Report POST*/
export const reportPost = async (req, res) => {
  try {
    const data = await groupsPostFuncs.reportPost(req.body);
    return successResponse(req, res, "reported");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

/*votePollPosts*/
export const votePollPosts = async (req, res) => {
  try {
    const data = await grpPollPosts.votePollPosts(req.body);
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getPostsByPostType = async (req, res) => {
  try {
    const postType = req.body.postType;

    if (!postType) {
      return failResponse(req, res, "postTypeNotAvailable");
    }
    switch (postType) {
      case "text": {
        if (!req.body.caption) {
          return failResponse(req, res, "captionNotAvailable");
        }
        await groupsPostFuncs.createTextPost(req.body);
        break;
      }
      case "thought": {
        let result = await grpThoughtPosts.getGroupThoughtPost(req.body);
        return successResponse(req, res, result);
        break;
      }
      case "media": {
        let result = await grpMediaPosts.getGroupMediaPost(req.body);
        return successResponse(req, res, result);
        break;
      }
      case "podcast": {
        let result = await grpAudioPosts.getGroupAudioPost(req.body);
        return successResponse(req, res, result);
        break;
      }
      case "threat": {
        let result = await grpThreatPosts.getGroupThreatPost(req.body);
        return successResponse(req, res, result);
        break;
      }
      case "event": {
        let result = await grpEventPosts.getGroupEventPost(req.body);
        return successResponse(req, res, result);
        break;
      }
      case "blog": {
        let result = await grpArticalPosts.getGroupArticalPost(req.body);
        return successResponse(req, res, result);
        break;
      }
      case "poll": {
        let result = await grpPollPosts.getGroupPollPostOptions(req.body);
        return successResponse(req, res, result);
        break;
      }
    }
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

/*Get Review post*/
export const getReviewPost = async (req, res) => {
  try {
    const data = await groupsPostFuncs.getAllGroupPostForReview(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

/*Get Review post*/
export const reviewPost = async (req, res) => {
  try {
    let { groupId, postIds } = req.body;
    if (!groupId) return failResponse(req, res, "groupIdIsRequired");
    if (!postIds.length) return failResponse(req, res, "postIdsIsRequired");
    for (let i = 0; i < postIds.length; i++) {
      var data = await groupsPostFuncs.reviewPost(
        groupId,
        postIds[i].status,
        postIds[i].postId
      );
    }
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getGroupPost = async (req, res) => {
  try {
    const data = await groupsPostFuncs.getAllPostList(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteGroupPost = async (req, res) => {
  try {
    if (!req.body.postId) {
      return failResponse(req, res, "NoPostId");
    };
    if (!req.body.groupId) {
      return failResponse(req, res, "NoGroupId");
    };
    const data = await groupsPostFuncs.deleteGroupPost(req.body);
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error);
  };
};

export const updatePost = async (req, res) => {
  try {
    const postType = req.body.postType;

    if (!postType) {
      return failResponse(req, res, "postTypeNotAvailable");
    };

    switch (postType) {
      case "text": {
        await groupsPostFuncs.updateGroupsPostDetails(req.body);
        break;
      };
      case "thought": {
        let thoughtData = req.body.thoughtData;
        const postId = req.body.postId;
        delete req.body["thoughtData"];
        const result = await groupsPostFuncs.updateGroupsPostDetails(req.body);
        const updateThought = await grpThoughtPosts.updateThought(postId, thoughtData);
        return successResponse(req, res, result);
        break;
      };
      case "media": {
        const mediaList = req.body.mediaList;
        const postId = req.body.postId;
        delete req.body["mediaList"]
        let result = await groupsPostFuncs.updateGroupsPostDetails(req.body);
        let updateMediaList = await grpMediaPosts.updateGrpMediadToPost(postId, mediaList);
        return successResponse(req, res, result);
        break;
      };
      case "podcast": {
        const audioList = req.body.audioList;
        const postId = req.body.postId;
        delete req.body["audioList"];
        const result = await groupsPostFuncs.updateGroupsPostDetails(req.body);
        const updatePodcast = await grpAudioPosts.updateGrpAudioPost(postId, audioList);
        return successResponse(req, res, result);
        break;
      };
      case "threat": {
        const result = await groupsPostFuncs.updateGroupsPostDetails(req.body);
        return successResponse(req, res, result);
        break;
      };
      case "event": {
        const eventDetails = req.body.eventDetails;
        console.log("eventDetails", eventDetails)
        delete req.body["eventDetails"];
        console.log("req.body", req.body)
        const postId = req.body.postId;
        const result = await groupsPostFuncs.updateGroupsPostDetails(req.body);
        const updateEvent = await grpEventPosts.updateEvent(postId, eventDetails);
        return successResponse(req, res, result);
        break;
      };
      case "blog": {
        const postId = req.body.postId;
        const blogDetails = req.body.articalDetails;
        delete req.body["articalDetails"];
        const result = await groupsPostFuncs.updateGroupsPostDetails(req.body);
        const blog = await grpArticalPosts.updateGroupArticalPost(postId, blogDetails)
        return successResponse(req, res, result);
        break;
      };
      case "poll": {
        const postId = req.body.postId;
        let pollPostData = req.body.pollPostData;
        delete req.body["pollPostData"];
        const result = await groupsPostFuncs.updateGroupsPostDetails(req.body);
        const updatePoll = await groupPollPost.updatePoll(postId, pollPostData);
        return successResponse(req, res, result);
        break;
      };
    };
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error);
  };
};

export const bookMarkGroupPost = async (req, res) => {
  try {
    const { groupId, postId, userId, bookmarkId } = req.body;
    const data = await groupsPostFuncs.addPostBookMark(req.body);
    return successResponse(req, res, bookmarkId ? "Success" : { bookmarkId: data });
  } catch (error) {
    return errorResponse(req, res, error);
  };
};

export const getAllPostTagedUsers = async (req, res) => {
  try {
    const { groupId, postId, userId, bookmarkId } = req.body;
    const data = await taggedPeoples.getGrpPostTaggedUsers(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  };
};

export const getPostById = async (req, res) => {
  try {
    const {postId} = req.body
    const userId = req.user.id
    const data = await groupsPostFuncs.getPostById(postId,userId)
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  };
};