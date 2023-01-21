require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../helpers/responce";
import * as postFuncs from "../funcs/post.funcs";
import moment from "moment";
import * as hashtagFuncs from "../funcs/hashtag.funcs";
import * as groupsFuncs from "../funcs/groups/group.funcs";
import * as media from "../helpers/media";
import * as userFuncs from "../funcs/users.funcs";
import * as notiFuncs from '../helpers/notification'
import * as notificationFuncs from '../funcs/notification.funcs'
import * as adminContNotificationFuncs from '../funcs/adminContNotificationFuncs/adminContNotification.funcs';
import * as podcastFunc from '../funcs/PodCast/pcSeries.funcs';
import * as adManagerFuncs from '../funcs/adManager/admanager.funcs'
/*       Post Common           */

export const sendSocialNotificationToOtherUsers = async (userData, postId, notiType) => {
  const postData = await postFuncs.getPostOwnerDetails(postId)
  let mainData = {
    ...userData,
    ...postData
  }
  const inAppData = {
    postId: postData.postId,
    postType: postData.postType,
    notificationType: notiType
  }
  await adminContNotificationFuncs.sendNotificationsByType(notiType, mainData, inAppData)

};
export const sendSocialNotificationToSelf = async (userData, postId, notiType) => {
  const postData = await postFuncs.getPostOwnerDetails(postId)
  delete postData.userId
  let mainData = {
    ...userData,
    userId: userData.id,
    ...postData
  }
  const inAppData = {
    postId: postData.postId,
    postType: postData.postType,
    notificationType: notiType
  }
  await adminContNotificationFuncs.sendNotificationsByType(notiType, mainData, inAppData)

};

export const getArticleCategory = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const data = await postFuncs.getArticleCategory(
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getShotzAudioCategory = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const data = await postFuncs.getShotzAudioCategory(
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getShotzRecordingDurations = async (req, res) => {
  try {
    const data = await postFuncs.getShotzRecordingDurations();
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const addEventCategory = async (req, res) => {
  try {
    const { eventName } = req.body;
    if (!eventName) {
      return failResponse(req, res, "Enter eventName");
    }
    const data = await postFuncs.addEventCategory(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getEventCategory = async (req, res) => {
  try {
    const { categoryId, pageIndex, pageSize, searchKey } = req.body;
    const data = await postFuncs.getEventCategory(
      // categoryId,
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getAlertDistance = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const data = await postFuncs.getAlertDistance(
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getAlertLevels = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const data = await postFuncs.getAlertLevels(searchKey, pageIndex, pageSize);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getShotzByAudioId = async (req, res) => {
  try {
    const { audioId } = req.body;
    const userId = req.user.id;
    if (!audioId) {
      return failResponse(req, res, "audioIdNotAvailable");
    }
    const data = await postFuncs.getShotzByAudioId(userId, req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const addShotzAudioToFavourite = async (req, res) => {
  try {
    const userId = req.user.id
    const { add, audioId } = req.body
    if (!audioId) {
      return failResponse(req, res, "Enter audioId")
    }
    const data = await postFuncs.addShotzAudioToFavourite(userId, add, audioId)
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getShotzAudioTrending = async (req, res) => {
  try {
    const { pageIndex, pageSize, type, searchKey } = req.body;
    if (!type) {
      return failResponse(req, res, "Enter type as trending or favourite")
    }
    const userId = req.body.userId || req.user.id;
    const data = await postFuncs.getShotzAudioTrending(
      userId,
      pageIndex,
      pageSize,
      type,
      searchKey
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getShotzAudioPopuler = async (req, res) => {
  try {
    const { pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;
    const data = await postFuncs.getShotzAudioPopuler(
      userId,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getShotzAudioRecent = async (req, res) => {
  try {
    const { pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;
    const data = await postFuncs.getShotzAudioRecent(
      userId,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const reportPost = async (req, res) => {
  try {
    const { postId, reportOptionId } = req.body;
    const userId = req.body.userId || req.user.id;

    if (!postId) {
      return failResponse(req, res, "noPostId");
    }
    if (!reportOptionId) {
      return failResponse(req, res, "noReportOptionId");
    }
    const result = await postFuncs.reportPost(userId, postId, reportOptionId);
    // CODE FOR NOTIFICATION 
    await sendSocialNotificationToOtherUsers(req.user, postId, "socialFeed-reportPost")
    // ---------------------------
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const reportShotzAudio = async (req, res) => {
  try {
    const { audioId, reportOptionId, report } = req.body;
    const userId = req.user.id;

    if (!audioId) {
      return failResponse(req, res, "no audioId");
    }
    if (!reportOptionId) {
      return failResponse(req, res, "no reportOptionId");
    }
    const result = await postFuncs.reportShotzAudio(userId, audioId, reportOptionId, report);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const setLike = async (req, res) => {
  try {
    const { postId, reactionId } = req.body;
    const userId = req.body.userId || req.user.id;
    if (!postId) {
      return failResponse(req, res, "postIdNotAvailable");
    }
    if (reactionId) {
      await postFuncs.addLike(userId, postId, reactionId);
      // CODE FOR NOTIFICATION 
      let userD = req.user
      const postData = await postFuncs.getPostOwnerDetails(postId)
      if (postData.userId !== userId) {
        let { totalLikes } = postData
        let and_n_others
        let mainData = {
          ...userD,
          ...postData
        }
        if (totalLikes === 2) {
          and_n_others = "and 1 other "
        }
        if (totalLikes === 1) {
          and_n_others = ''
        }
        if (totalLikes > 2) {
          and_n_others = `and ${totalLikes - 1} others`
        }
        mainData.and_n_others = and_n_others
        const inAppData = {
          postId: postData.postId,
          postType: postData.postType,
          notificationType: "socialFeed-likeOnPost"
        }
        await adminContNotificationFuncs.sendNotificationsByType("socialFeed-likeOnPost", mainData, inAppData)
      }
    } else {
      await postFuncs.removeLike(userId, postId);
    }
    const updateCount = await postFuncs.updateLikesCount(postId);
    const topLikes = await postFuncs.getTopLike(postId);
    return successResponse(req, res, topLikes);
    // const result = await postFuncs.setLike(userId, postId ,reactionId)
    // return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

// export const addLike = async(req,res)=>{
//     try {
//         const {postId, reactionId} = req.body;
//         const userId = req.body.userId || req.user.id;

//         if(!postId){
//             return failResponse(req, res, "noPostId")
//         }
//         if(!reactionId){
//             return failResponse(req, res, "noReactionId")
//         }
//         const result = await postFuncs.addLike(userId, postId ,reactionId)
//         return successResponse(req, res, "success");
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }

// export const removeLike = async(req,res)=>{
//     try {
//         const {postId} = req.body;
//         const userId = req.body.userId || req.user.id;

//         if(!postId){
//             return failResponse(req, res, "noPostId")
//         }
//         await postFuncs.removeLike(userId,postId )
//         return successResponse(req, res, "success");
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }

export const getAllLike = async (req, res) => {
  try {
    const { postId, reactionId, searchKey, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;

    if (!postId) {
      return failResponse(req, res, "postIdNotAvailable");
    }
    const data = await postFuncs.getAllLike(
      postId,
      reactionId,
      pageIndex,
      pageSize,
      searchKey
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getTaggedUsers = async (req, res) => {
  try {
    const { postId, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;

    if (!postId) {
      return failResponse(req, res, "noPostId");
    }
    const data = await postFuncs.getTaggedUsers(postId, pageIndex, pageSize);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId, commentId, searchKey, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;

    if (!postId) {
      return failResponse(req, res, "postIdNotAvailable");
    }
    const data = await postFuncs.getComments(
      userId,
      postId,
      commentId,
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId, comment, commentId, hashTags, mentionIds } = req.body;
    const userId = req.body.userId || req.user.id;

    if (!postId) {
      return failResponse(req, res, "postIdNotAvailable");
    }
    if (!comment) {
      return failResponse(req, res, "commentNotAvailable");
    }

    const result = await postFuncs.addComment(
      postId,
      userId,
      comment,
      commentId,
      hashTags,
      mentionIds
    );
    const commentJson = {
      userName: req.user.userName,
      fullName: req.user.fullName,
      profileImageThumb: req.user.profileImageThumb,
      userId: req.user.id,
      id: result,
      comment: comment,
      liked: 0,
      likesCount: 0,
      replyCount: 0,
      createdAt: moment(),
    };
    const postData = await postFuncs.getPostOwnerDetails(postId)
    if (postData.userId !== userId) {
      let userD = req.user
      const { totalComments } = postData
      let and_n_others
      let mainData = {
        ...userD,
        ...postData
      }
      if (totalComments === 2) {
        and_n_others = "and 1 other "
      }
      if (totalComments === 1) {
        and_n_others = ''
      }
      if (totalComments > 2) {
        and_n_others = `and ${totalComments - 1} others`
      }
      mainData.and_n_others = and_n_others
      const inAppData = {
        postId: postData.postId,
        postType: postData.postType,
        notificationType: "socialFeed-commentOnPost"
      }
      await adminContNotificationFuncs.sendNotificationsByType("socialFeed-commentOnPost", mainData, inAppData)
    }
    await postFuncs.updateCommentsCount(postId);
    return successResponse(req, res, commentJson);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    if (!commentId) {
      return failResponse(req, res, "noCommentId");
    }
    await postFuncs.deleteComment(commentId);
    return successResponse(req, res, "deleted");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const setCommentLike = async (req, res) => {
  try {
    const { commentId, reactionId } = req.body;
    const userId = req.body.userId || req.user.id;
    if (!commentId) {
      return failResponse(req, res, "commentIdNotAvailable");
    }
    if (reactionId) {
      await postFuncs.addCommentLike(userId, commentId, reactionId);
    } else {
      await postFuncs.removeCommentLike(userId, commentId);
    }
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const reportComment = async (req, res) => {
  try {
    const { commentId, reportOptionId } = req.body;
    const userId = req.body.userId || req.user.id;
    if (!commentId) {
      return failResponse(req, res, "commentIdNotAvailable");
    }
    if (!reportOptionId) {
      return failResponse(req, res, "noReportOptionId");
    }
    const result = await postFuncs.reportComment(
      userId,
      commentId,
      reportOptionId
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const selectUserPollOption = async (req, res) => {
  try {
    const { postId, pollOptionId } = req.body;
    const userId = req.body.userId || req.user.id;
    if (!postId) {
      return failResponse(req, res, "postIdNotAvailable");
    }
    if (!pollOptionId) {
      return failResponse(req, res, "pollOptionIdNotAvailable");
    }
    const result = await postFuncs.selectUserPollOption(
      userId,
      postId,
      pollOptionId,
      req.body
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editComment = async (req, res) => {
  try {
    const { commentId, comment } = req.body;
    if (!commentId) {
      return failResponse(req, res, "commentIdNotAvailable");
    }
    if (!comment) {
      return failResponse(req, res, "commentTextNotAvailable");
    }
    const data = postFuncs.editComment(commentId, comment);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addView = async (req, res) => {
  try {
    const postId = req.body.postId;
    const userId = req.body.userId;
    if (!postId) {
      return failResponse(req, res, "postIdNotAvailable");
    }

    const result = await postFuncs.addView(postId, userId);
    await postFuncs.updateViewsCount(postId)
    return successResponse(req, res, "View Added");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllView = async (req, res) => {
  try {
    const { postId, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;

    if (!postId) {
      return failResponse(req, res, "noPostId");
    }
    const result = await postFuncs.getAllView(postId, pageIndex, pageSize);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addShare = async (req, res) => {
  try {
    const postId = req.body.postId;
    const userId = req.body.userId || req.user.id;
    if (!postId) {
      return failResponse(req, res, "no postId");
    }
    const postOwner = await postFuncs.getPostOwnerDetails(postId)
    const sharingSetting = await userFuncs.getInAppSettings(postOwner.userId, "postAndStory")
    const { yourPostShareOptions } = sharingSetting
    if (yourPostShareOptions) {
      const result = await postFuncs.addShare(postId, userId);
      return successResponse(req, res, "Shared");
    }
    return failResponse(req, res, "sharingNotAllowedForThisPost")
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllShare = async (req, res) => {
  try {
    const { postId, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;

    if (!postId) {
      return failResponse(req, res, "noPostId");
    }
    const result = await postFuncs.getAllShare(postId, pageIndex, pageSize);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editPost = async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) {
      return failResponse(req, res, "Please Enter Post id");
    }
    const postType = req.body.postType;
    if (!postType) {
      return failResponse(req, res, "postTypeNotAvailable");
    }
    switch (postType) {
      case "text": {
        if (req.body.mediaList) {
          const mediaList = req.body.mediaList;
          delete req.body["mediaList"];
          await postFuncs.updateMediadPost(req.body.id, mediaList);
        }
        await postFuncs.updateTextPost(req.body);
        return successResponse(req, res, "success");
        break;
      }
      case "thought": {
        await postFuncs.updateTextPost(req.body);
        return successResponse(req, res, "success");
        break;
      }
      case "media": {
        const mediaList = req.body.mediaList;
        delete req.body["mediaList"];
        await postFuncs.updateTextPost(req.body);
        await postFuncs.updateMediadPost(req.body.id, mediaList);
        return successResponse(req, res, "success");
        break;
      }
      case "article": {
        const articleItems = req.body.articleItems;
        delete req.body["articleItems"];
        await postFuncs.updateTextPost(req.body);
        await postFuncs.updateArticalPost(req.body.id, articleItems);
        return successResponse(req, res, "success");
        break;
      }
      case "event": {
        await postFuncs.updateTextPost(req.body);
        return successResponse(req, res, "success");
        break;
      }
      case "poll": {
        const pollOptions = req.body.pollOptions;
        delete req.body["pollOptions"];
        await postFuncs.updateTextPost(req.body);
        await postFuncs.updatePollPost(req.body.id, pollOptions);
        return successResponse(req, res, "success");
        break;
      }
      case "recommendation": {
        await postFuncs.updateTextPost(req.body);
        return successResponse(req, res, "success");
        break;
      }
      case "alert": {
        await postFuncs.updateTextPost(req.body);
        return successResponse(req, res, "success");
        break;
      }
      case "shotz": {
        await postFuncs.updateTextPost(req.body);
        return successResponse(req, res, "success");
        break;
      }
      case "podcast": {
        if (req.body.podcastEpisode) {
          let podcastEpisode = req.body.podcastEpisode
          await podcastFunc.UpdatePodcastEpisode(podcastEpisode)
          delete req.body['podcastEpisode']
        }
        if (req.body.podcastSeries) {
          let podcastSeries = req.body.podcastSeries
          await podcastFunc.UpdatePodcastSeries(podcastSeries)
          delete req.body['podcastSeries']
        }
        await postFuncs.updateTextPost(req.body);

        return successResponse(req, res, "success");
        break;
      }
    }
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

const sendNotificationInCreatePost = async (postId, type, userData, postType) => {
  const userId = userData.id
  const followers = await userFuncs.getUserFollowers(userId, userId)
  const followersArr = followers.rows
  followersArr.forEach(async (value, index) => {
    let mainData = {
      ...userData,
      userId: value.id
    }
    let inAppData = {
      postId,
      postType,
      notificationType: type
    }
    await adminContNotificationFuncs.sendNotificationsByType(type, mainData, inAppData)
  })
};

export const createPost = async (req, res) => {
  try {
    let postType = req.body.postType;
    const userId = req.user.id;
    // const userId = req.body.userId
    if (!postType) {
      return failResponse(req, res, "postTypeNotAvailable");
    }
    if (req.body.locationLAT === undefined) {
      return failResponse(req, res, "locationLATNotAvailable");
    }
    if (req.body.locationLONG === undefined) {
      return failResponse(req, res, "locationLONGNotAvailable");
    }
    if (!req.body.location2) {
      return failResponse(req, res, "location2NotAvailable");
    }
    if (!req.body.location3) {
      return failResponse(req, res, "location3NotAvailable");
    }
    let postId
    switch (postType) {
      case "text": {
        if (!req.body.caption) {
          return failResponse(req, res, "captionNotAvailable");
        }
        await postFuncs.createTextPost(userId, req.body);
        break;
      }
      case "thought": {
        postId = await postFuncs.createThoughtPost(req.user.id, req.body);
        await sendNotificationInCreatePost(postId, "socialFeed-postThoughtPost", req.user, "thought")
        break;
      }
      case "media": {
        if (!req.body.mediaList || !req.body.mediaList.length) {
          return failResponse(req, res, "noMediaForMediaPost");
        }
        try {
          await postFuncs.createMediaPost(req.user.id, req.body);
        } catch (err) {
          return errorResponse(req, res, {
            err,
            mediaList: req.body.mediaList,
          });
        }
        break;
      }
      case "article": {
        if (!req.body.articleCategoryId) {
          return failResponse(req, res, "articleCategoryIdNotAvailable");
        }
        if (!req.body.articleCoverImageURL) {
          return failResponse(req, res, "articleCoverImageURLNotAvailable");
        }
        if (!req.body.articleItems || !req.body.articleItems.length) {
          return failResponse(req, res, "noArticleItemForMediaPost");
        }
        postId = await postFuncs.createArticlePost(req.user.id, req.body);
        await sendNotificationInCreatePost(postId, "socialFeed-postArticlePost", req.user, "article")
        break;
      }
      case "recommendation": {
        if (!req.body.caption) {
          return failResponse(req, res, "captionNotAvailable");
        }
        // if (!req.body.recommendationCoverImageURL) {
        //     return failResponse(req, res, "recommendationCoverImageURLNotAvailable")
        // }
        postId = await postFuncs.createRecommendationPost(req.user.id, req.body);
        await sendNotificationInCreatePost(postId, "socialFeed-postRecommendationPost", req.user, "recommendation")
        break;
      }
      case "poll": {
        if (!req.body.caption) {
          return failResponse(req, res, "captionNotAvailable");
        }
        if (!req.body.pollStartTime) {
          return failResponse(req, res, "pollStartTimeNotAvailable");
        }
        if (!req.body.pollEndTime) {
          return failResponse(req, res, "pollEndTimeNotAvailable");
        }
        const { pollOptions } = req.body
        if ((!pollOptions) || (pollOptions.length === 0)) {
          return failResponse(req, res, "Enter poll options")
        }
        await postFuncs.createPollPost(req.user.id, req.body);
        break;
      }
      case "event": {
        if (!req.body.caption) {
          return failResponse(req, res, "captionNotAvailable");
        }
        if (!req.body.eventCoverImageURL) {
          return failResponse(req, res, "eventCoverImageURLNotAvailable");
        }
        if (!req.body.eventStartTime) {
          return failResponse(req, res, "eventStartTimeNotAvailable");
        }
        if (!req.body.eventEndTime) {
          return failResponse(req, res, "eventEndTimeNotAvailable");
        }
        if (!req.body.eventCategoryId) {
          return failResponse(req, res, "eventCategoryIdNotAvailable");
        }
        await postFuncs.createEventPost(req.user.id, req.body);
        break;
      }
      case "alert": {
        if (!req.body.caption) {
          return failResponse(req, res, "captionNotAvailable");
        }
        if (!req.body.alertLevelId) {
          return failResponse(req, res, "alertLevelIdNotAvailable");
        }
        if (!req.body.alertRangeMeter) {
          return failResponse(req, res, "alertRangeMeterNotAvailable");
        }
        await postFuncs.createAlertPost(req.user.id, req.body);
        break;
      }
      case "shotz": {
        if (!req.body.shotzLength) {
          return failResponse(req, res, "shotzLengthNotAvailable");
        }
        // if (!req.body.shotzAudioId) {
        //   return failResponse(req, res, "shotzAudioIdNotAvailable");
        // }
        if (!req.body.shotzMediaURL) {
          return failResponse(req, res, "shotzMediaURLNotAvailable");
        }
        await postFuncs.createShotzPost(req.user.id, req.body);
        break;
      }
      case "goLive": {
        await postFuncs.createGoLivePost(req.user.id, req.body);
        break;
      }
      case "podcast": {
        if (req.body.podcastEpisode) {
          let data = req.body.podcastEpisode
          let episodeId = await podcastFunc.createSinglePodcast({ ...data, locationLAT: req.body.locationLAT, locationLONG: req.body.locationLONG }, req.user.id)
          let body = req.body
          delete body.podcastEpisode
          body.podcastEpisodeId = episodeId
          await postFuncs.createPodcastPost(req.user.id, body);
          break;
        }
        if (req.body.podcastSeries) {
          let data = req.body.podcastSeries
          let podcastEpisodes = data.podcastEpisodes
          delete data.podcastEpisodes
          let seriesId = await podcastFunc.createPodcastSeries({ ...data, locationLAT: req.body.locationLAT, locationLONG: req.body.locationLONG }, req.user.id)
          podcastEpisodes.forEach(async (val) => {
            await podcastFunc.createPodcastEpisode({
              ...val,
              seriesId
            }, req.user.id)
          })
          let body = req.body
          delete body.podcastSeries
          body.podcastSeriesId = seriesId
          await postFuncs.createPodcastPost(req.user.id, body);
          break;
        }
        break;
      }
    }
    const { taggedUserIds, mentionIds } = req.body
    if (taggedUserIds && taggedUserIds.length > 0) {
      taggedUserIds.forEach(async (value) => {
        let mainData = {
          ...req.user,
          postType,
          userId: value
        }
        const inAppData = {
          postId,
          postType,
          notificationType: "socialFeed-tagUser"
        }
        await adminContNotificationFuncs.sendNotificationsByType("socialFeed-tagUser", mainData, inAppData)
      })
    }
    if (mentionIds && mentionIds.length > 0) {
      mentionIds.forEach(async (value) => {
        let mainData = {
          ...req.user,
          postType,
          userId: value
        }
        const inAppData = {
          postId,
          postType,
          notificationType: "socialFeed-mentionUserInPost"
        }
        await adminContNotificationFuncs.sendNotificationsByType("socialFeed-mentionUserInPost", mainData, inAppData)
      })
    }
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createShotzAudio = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id;
    const result = await postFuncs.createShotzAudio(userId, req.body);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getPostById = async (req, res) => {
  try {
    const postId = req.body.postId;
    const userId = req.user.id;
    // const userId = req.body.userId
    if (!postId) {
      return failResponse(req, res, "postIdNotAvailable");
    }
    const data = await postFuncs.getPostById(postId, userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;
    const result = await postFuncs.getAllPosts(
      userId,
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id
    if (!postId) {
      return failResponse(req, res, "postId Array NotAvailable");
    }
    if (!(Array.isArray(postId))) {
      return failResponse(req, res, "Enter in Array");
    }
    await postFuncs.deletePost(postId);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const setAllowComments = async (req, res) => {
  try {
    const { postId, allowComments } = req.body;
    if (!postId) {
      return failResponse(req, res, "postIdNotAvailable");
    }
    await postFuncs.setAllowComments(postId, allowComments);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const setPostSaved = async (req, res) => {
  try {
    const { postId, isSaved } = req.body;
    const userId = req.body.userId || req.user.id;
    if (!postId) {
      return failResponse(req, res, "postIdNotAvailable");
    }
    if (isSaved) {
      await postFuncs.savePost(postId, userId);
      // NOTIFICATION CODE 
      await sendSocialNotificationToSelf(req.user, postId, "socialFeed-savePost")
      // -----------------------
    } else {
      await postFuncs.removeSavedPost(postId, userId);
    }
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

// export const savePost = async (req,res)=>{
//     try{
//         const postId = req.body.postId
//         const userId = req.body.userId || req.user.id;
//         if(!postId){
//             return failResponse(req,res,"postIdNotAvailable")
//         }
//         const result = await postFuncs.savePost(postId,userId)
//         return successResponse(req,res,"success")
//     }catch(error){
//         return errorResponse(req,res,error)
//     }
// }

// export const removeSavedPost = async (req,res)=>{
//     try{
//         const postId = req.body.postId
//         if(!postId){
//             return failResponse(req,res,"postIdNotAvailable")
//         }
//         const result = await postFuncs.removeSavedPost(postId,req.user.id)
//         return successResponse(req,res,"success")
//     }catch(error){
//         return errorResponse(req,res,error)
//     }
// }

export const getAllSavedPost = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;
    const result = await postFuncs.getAllSavedPost(
      userId,
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const setPostNotification = async (req, res) => {
  try {
    const { postId, notificationOff } = req.body;
    const userId = req.body.userId || req.user.id;
    if (!postId) {
      return failResponse(req, res, "postIdNotAvailable");
    }
    if (notificationOff) {
      await postFuncs.postNotificationOff(postId, userId);
    } else {
      await postFuncs.postNotificationOn(postId, userId);
    }
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

// export const postNotificationOff = async (req,res)=>{
//     try{
//         const postId = req.body.postId
//         if(!postId){
//             return failResponse(req,res,"postIdNotAvailable")
//         }
//         const result = await postFuncs.postNotificationOff(postId,req.user.id)
//         return successResponse(req,res,"success")
//     }catch(error){
//         return errorResponse(req,res,error)
//     }
// }

// export const postNotificationOn = async (req,res)=>{
//     try{
//         const postId = req.body.postId
//         if(!postId){
//             return failResponse(req,res,"postIdNotAvailable")
//         }
//         const result = await postFuncs.postNotificationOn(postId,req.user.id)
//         return successResponse(req,res,"success")
//     }catch(error){
//         return errorResponse(req,res,error)
//     }
// }

export const getAllDndPost = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;
    const result = await postFuncs.getAllDndPost(
      userId,
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const setPostHide = async (req, res) => {
  try {
    const { postId, isHidden } = req.body;
    const userId = req.body.userId || req.user.id;
    if (!postId) {
      return failResponse(req, res, "postIdNotAvailable");
    }
    if (isHidden) {
      await postFuncs.hidePost(postId, userId);
    } else {
      await postFuncs.unhidePost(postId, userId);
    }
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

// export const hidePost = async (req,res)=>{
//     try{
//         const postId = req.body.postId
//         const userId = req.body.userId || req.user.id;
//         if(!postId){
//             return failResponse(req,res,"postIdNotAvailable")
//         }
//         const result = await postFuncs.hidePost(postId,userId)
//         return successResponse(req,res,"success")
//     }catch(error){
//         return errorResponse(req,res,error)
//     }
// }

// export const unhidePost = async (req,res)=>{
//     try{
//         const postId = req.body.postId
//         const userId = req.body.userId || req.user.id;
//         if(!postId){
//             return failResponse(req,res,"postIdNotAvailable")
//         }
//         const result = await postFuncs.unhidePost(postId,userId)
//         return successResponse(req,res,"success")
//     }catch(error){
//         return errorResponse(req,res,error)
//     }
// }

export const getAllHiddenPost = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;
    const result = await postFuncs.getAllHiddenPost(
      userId,
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getAllEventByUserId = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;
    const result = await postFuncs.getAllEventByUserId(
      userId,
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getEventCategoriesTop = async (req, res) => {
  try {
    const { pageIndex, pageSize } = req.body;
    var userId = req.user.id || req.body.userId;
    const data = await postFuncs.getEventCategoriesTop(pageIndex, pageSize);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getFriendsToTag = async (req, res) => {
  try {
    const { connectionId, searchKey, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;
    const result = await postFuncs.getFriendsToTag(
      userId,
      connectionId,
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;
    let result = await postFuncs.getFeedPosts(
      userId,
      searchKey,
      pageIndex,
      pageSize
    );
    if (result) {
      // let random = Math.floor(Math.random() * 4);
      let random = Math.floor(Math.random() * 2);
      random = random + 2;
      let value = false
      // if (random === 0) {
      //   let data = await postFuncs.suggestedUsers(userId, req.body)
      //   if (data.suggestedUsers.length > 0) {
      //     value = data
      //   }
      // }
      // if (random === 1) {
      //   let data = await postFuncs.getUserSuggestedShotz(userId, req.body)
      //   if (data[0].suggestedShotz.length > 0) {
      //     value = data
      //   }
      // }
      if (random === 2) {
        let data = await postFuncs.getUserSuggestedGroups(userId, req.body)
        if (data[0].suggestedGroups.length > 0) {
          value = data
        }
      }
      if (random === 3) {
        let data = await postFuncs.getUserSuggestedBusinessPages(
          userId,
          req.body
        )
        if (data[0].suggestedBusiness.length > 0) {
          value = data
        }
      }
      if (value) {
        result.rows = result.rows.concat(value);
      }
    }
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getFeedData = async (req, res) => {
  try {
    const { pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;
    const result = await postFuncs.sendFeedData(userId, pageIndex, pageSize);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
/*       Post Text           */

/*       Post Media           */

/*       Post Article           */

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id;
    const postType = req.body.postType;
    const { pageSize, pageIndex } = req.body
    if (!postType) {
      return failResponse(req, res, "postTypeNotAvailable");
    }
    if (!userId) {
      return failResponse(req, res, "userIdNotAvailable");
    }
    // add text post => thought => poll =>>>
    switch (postType) {
      case "text": {
        try {
          let textPostList = await postFuncs.getUserTextPosts(req.body);
          return successResponse(req, res, textPostList);
        } catch (err) {
          return errorResponse(req, res, err);
        }
        break;
      }
      case "poll": {
        try {
          let textPostList = await postFuncs.getUserTextPosts(req.body);
          return successResponse(req, res, textPostList);
        } catch (err) {
          return errorResponse(req, res, err);
        }
        break;
      }
      case "thought": {
        try {
          let textPostList = await postFuncs.getUserTextPosts(req.body);
          return successResponse(req, res, textPostList);
        } catch (err) {
          return errorResponse(req, res, err);
        }
        break;
      }
      case "media": {
        try {
          let mediaList = await postFuncs.getUserMediaPosts(req.body);
          return successResponse(req, res, mediaList);
        } catch (err) {
          return errorResponse(req, res, err);
        }
        break;
      }
      case "images": {
        try {
          let imagesList = await postFuncs.getUserImagesPosts(req.body);
          return successResponse(req, res, imagesList);
        } catch (err) {
          return errorResponse(req, res, err);
        }
        break;
      }
      case "video": {
        try {
          let videoList = await postFuncs.getUserVideosPosts(req.body);
          return successResponse(req, res, videoList);
        } catch (err) {
          return errorResponse(req, res, err);
        }
        break;
      }
      case "article": {
        try {
          let articleList = await postFuncs.getUserArticlePosts(req.body);
          return successResponse(req, res, articleList);
        } catch (err) {
          return errorResponse(req, res, err);
        }
        break;
      }
      case "shotz": {
        try {
          let shotzList = await postFuncs.getUserShotzPosts(req.body);
          return successResponse(req, res, shotzList);
        } catch (err) {
          return errorResponse(req, res, err);
        }
        break;
      }
      case "scheduled": {
        try {
          let shotzList = await postFuncs.getUserSheduledPosts(req.body);
          return successResponse(req, res, shotzList);
        } catch (err) {
          return errorResponse(req, res, err);
        }
        break;
      }
      case "podcast": {
        try {
          let podcastData = await postFuncs.getUserPodcastPosts(userId, req.body);
          return successResponse(req, res, podcastData);
        } catch (err) {
          return errorResponse(req, res, err);
        }
        break;
      }
      case "marketPlace": {
        try {
          let marketPlaceList = await postFuncs.getUserMarketplacePosts(
            req.body
          );
          return successResponse(req, res, marketPlaceList);
        } catch (err) {
          return errorResponse(req, res, err);
        }
        break;
      }
      case "group": {
        try {
          let groupList = await userFuncs.getGroupOfUser(userId, req.body);
          return successResponse(req, res, groupList);
        } catch (err) {
          return errorResponse(req, res, err);
        }
        break;
      }
      case "businessPage": {
        try {
          let businessPageList = await userFuncs.getUserBusinessPages(
            userId,
            req.body
          );
          return successResponse(req, res, businessPageList);
        } catch (err) {
          return errorResponse(req, res, err);
        }
        break;
      }
      case "event": {
        try {
          let eventList = await postFuncs.getUserEventPost(userId,
            pageSize,
            pageIndex
          );
          return successResponse(req, res, eventList);
        } catch (err) {
          return errorResponse(req, res, err);
        }
        break;
      }
    }
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getShotzVideos = async (req, res) => {
  try {
    const { pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;
    const result = await postFuncs.getShotzVideos(userId, req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const uploadShotzAudio = async (req, res) => {
  try {
    if (!req.files || !req.files.length) {
      return failResponse(req, res, "no FileFound");
    }
    const allowedExtensions = [
      "mp4",
      "mp3",
      "mp4a",
      "wav",
      "aac",
      "wma",
      "flac",
      "3ga",
      "mp4p",
      "mp4b",
      "wma",
      "wpl",
      "ogg",
    ];
    const fileName = req.files[0].originalname;
    const fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);
    if (!allowedExtensions.includes(fileExtension)) {
      return failResponse(req, res, "Please Upload Only Audio Files");
    }
    const audioCategory = req.body.audioCategory;
    if (!audioCategory) {
      return failResponse(req, res, "Please Enter audioCategory");
    }
    const audioValidate = await postFuncs.searchAudioCategory(audioCategory);
    if (!audioValidate) {
      return failResponse(
        req,
        res,
        "Please Enter valid audioCategory or select Others"
      );
    }
    const uploadFor = "shotzAudio";
    const userId = req.body.userId || req.user.id;

    let link = [];
    for (var i = 0; i < req.files.length; i++) {
      const uploadedLink = await media.s3Upload(uploadFor, req.files[i]);
      link.push(uploadedLink);
    }
    const result = await postFuncs.uploadShotzAudio(userId, link, req.body);
    return successResponse(req, res, `Audio Uploaded with id ${result}`);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const uploadShotzVideo = async (req, res) => {
  try {
    if (!req.files || !req.files.length) {
      return failResponse(req, res, "no FileFound");
    }
    const allowedExtensions = [
      "mp4",
      "mov",
      "avi",
      "flv",
      "mkv",
      "wmv",
      "avchd",
      "webm",
      "mpeg-4",
      "mpeg",
    ];
    const fileName = req.files[0].originalname;
    const fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);
    if (!allowedExtensions.includes(fileExtension)) {
      return failResponse(req, res, "Please Upload Only Video Files");
    }
    const uploadFor = "shotzMedia";
    const userId = req.body.userId || req.user.id;
    let link = [];
    for (var i = 0; i < req.files.length; i++) {
      const uploadedLink = await media.s3Upload(uploadFor, req.files[i]);
      link.push(uploadedLink);
    }
    return successResponse(req, res, link[0]);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getEventById = async (req, res) => {
  try {
    const id = req.body.id;
    const userId = req.user.id;
    if (!id) {
      return failResponse(req, res, "Please Enter Event id");
    }
    const result = await postFuncs.getEventById(id, userId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const changeEventStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.body.id;
    if (!id) {
      return failResponse(req, res, "Please Enter Event id");
    }
    const status = req.body.status;
    if (!status) {
      return failResponse(req, res, "Please Enter status");
    }
    const statusArr = ["going", "interested", "notInterested"];
    if (!statusArr.includes(status)) {
      return failResponse(
        req,
        res,
        "Please enter one of going , interested or notInterested"
      );
    }
    const result = await postFuncs.changeEventStatus(userId, id, status);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const upcomingEvents = async (req, res) => {
  try {
    const day = req.body.day;
    const userId = req.user.id;
    const categoryId = req.body.categoryId;
    const eventLocation = req.body.eventLocation;

    const lat = req.body.lat;
    const long = req.body.long;
    const radius = req.body.radius;

    if (!day) {
      return failResponse(req, res, "Please Enter day");
    }
    const dayArr = ["all", "today", "tomorrow", "thisWeek"];
    if (!dayArr.includes(day)) {
      return failResponse(
        req,
        res,
        "Enter one of all , today , tomorrow or thisWeek"
      );
    }
    let result = await postFuncs.upcomingEvents(day, userId, categoryId, eventLocation, lat, long, radius);
    const eventCategories = await postFuncs.getEventCategoryArray(categoryId);
    result.eventCategories = eventCategories.rows;
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const inviteFriendsToEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const inviteTo = req.body.inviteTo;
    if (!inviteTo) {
      return failResponse(req, res, "Please Enter inviteTo Array");
    }
    const eventId = req.body.eventId;
    if (!eventId) {
      return failResponse(req, res, "Please Enter eventId");
    }
    const result = await postFuncs.inviteFriendsToEvent(
      userId,
      inviteTo,
      eventId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUserEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const type = req.body.type;
    const location = req.body.location;
    const lat = req.body.lat;
    const long = req.body.long;
    const radius = req.body.radius;
    if (!type) {
      failResponse(req, res, "Please enter type");
    }
    const typeArr = ["all", "hosting", "going", "interested", "notInterested", "scheduled"];
    if (!typeArr.includes(type)) {
      return failResponse(
        req,
        res,
        "Please enter one of all,hosting,going,interested or notInterested,scheduled"
      );
    }
    const result = await postFuncs.getUserEvents(userId, type, location, lat, long, radius);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getEventUserList = async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = req.body.eventId;
    const lat = req.body.lat;
    const long = req.body.long;
    const radius = req.body.radius;
    const pageIndex = req.body.pageIndex;
    const pageSize = req.body.pageSize;
    const location = req.body.location
    if (!eventId) {
      return failResponse(req, res, "Enter eventId");
    }
    const type = req.body.type;
    if (!type) {
      return failResponse(req, res, "Enter type");
    }
    const typeArr = ["invited", "going", "interested", "notInterested"];
    if (!typeArr.includes(type)) {
      return failResponse(
        req,
        res,
        "Please enter one of invited,going,interested or notInterested"
      );
    }
    const result = await postFuncs.getEventUserList(eventId, type, userId, lat, long, radius, pageIndex, pageSize, location);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const archiveShotz = async (req, res) => {
  try {
    const userId = req.user.id;
    const shotzId = req.body.shotzId;
    if (!shotzId) {
      return failResponse(req, res, "Please Enter shotzId Array");
    }
    const result = await postFuncs.archiveShotz(userId, shotzId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteAllShotz = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await postFuncs.deleteAllShotz(userId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteShotz = async (req, res) => {
  try {
    const { shotzId } = req.body;
    if (!shotzId) {
      return failResponse(req, res, "ShotzId Array NotAvailable");
    }
    await postFuncs.deleteShotz(shotzId);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUserShotz = async (req, res) => {
  try {
    const pageIndex = req.body.pageIndex;
    const pageSize = req.body.pageSize;
    const userId = req.body.userId;
    const type = req.body.type;
    if (!type) {
      return failResponse(req, res, "Please Enter type");
    }
    const typeArr = ["active", "archived"];
    if (!typeArr.includes(type)) {
      return failResponse(req, res, "Please enter one of active or archived");
    }
    const result = await postFuncs.getUserShotz(
      userId,
      type,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getPollAnalyticsByType = async (req, res) => {
  try {
    const pollId = req.body.pollId;
    const type = req.body.type;
    const pageIndex = req.body.pageIndex;
    const pageSize = req.body.pageSize;
    const searchKey = req.body.searchKey;
    const userId = req.user.id;
    if (!pollId) {
      return failResponse(req, res, "pollId NotAvailable");
    }
    const typeArr = ["viewed", "liked", "shared", "voted"];
    if (!typeArr.includes(type)) {
      return failResponse(
        req,
        res,
        "Enter only one of viewed,liked,voted,shared"
      );
    }
    const data = await postFuncs.getPollAnalyticsByType(
      userId,
      pollId,
      type,
      pageIndex,
      pageSize,
      searchKey
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getShotzAudioByLocation = async (req, res) => {
  try {
    const result = await postFuncs.getShotzAudioByLocation(req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const downloadShotzVideo = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.body.postId;
    if (!postId) {
      return failResponse(req, res, "Please Enter postId");
    }
    const result = await postFuncs.downloadShotzVideo(postId);
    if (!result) {
      return failResponse(req, res, "Invalid PostId");
    }
    const download = postFuncs.downloadToLocalStorage(
      result,
      "../shotz" + Date.now() + ".mp4"
    );
    if (download) {
      return successResponse(req, res, "file downloaded");
    }
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getPeopleList = async (req, res) => {
  try {
    const userId = req.user.id;
    const sortBy = req.body.sortBy;
    const sortBys = [
      "Public",
      "Connections",
      "Colleagues",
      "Family",
      "Friends",
      "Relatives",
    ];
    if (!sortBys.includes(sortBy)) {
      return failResponse(req, res, "Enter sortBy");
    }
    const result = await postFuncs.getPeopleList(userId, sortBy, req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getPollByPostType = async (req, res) => {
  try {
    const userId = req.user.id;
    const type = req.body.type;
    const pageIndex = req.body.pageIndex;
    const pageSize = req.body.pageSize;
    if (!type) {
      return failResponse(req, res, "type NotAvailable");
    }
    const typeArr = ["all", "scheduled", "drafted", "completed", "running"];
    if (!typeArr.includes(type)) {
      return failResponse(
        req,
        res,
        "Enter only one of all,scheduled,drafted,completed,running"
      );
    }
    const data = await postFuncs.getPollByPostType(userId, type, pageIndex, pageSize);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getPollById = async (req, res) => {
  try {
    const id = req.body.pollId;
    const userId = req.user.userId;
    if (!id) {
      return failResponse(req, res, "pollId NotAvailable");
    }
    const data = await postFuncs.getPollById(id, userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const recommendPostById = async (req, res) => {
  try {
    const postId = req.body.postId;
    if (!postId) {
      return failResponse(req, res, "please Enter postId");
    }
    const userId = req.user.id;
    const data = await postFuncs.recommendPostById(userId, postId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const removeRecommendById = async (req, res) => {
  try {
    const postId = req.body.postId;
    if (!postId) {
      return failResponse(req, res, "please Enter postId");
    }
    const userId = req.user.id;
    const data = await postFuncs.removeRecommendById(userId, postId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const reSharePost = async (req, res) => {
  try {
    const postId = req.body.postId;
    if (!postId) {
      return failResponse(req, res, "please Enter postId");
    }
    if (!req.body.locationLAT) {
      return failResponse(req, res, "please Enter locationLAT");
    }
    if (!req.body.locationLONG) {
      return failResponse(req, res, "please Enter locationLONG");
    }
    const userId = req.user.id;
    const postData = await postFuncs.getPostOwnerDetails(postId)
    const sharingSetting = await userFuncs.getInAppSettings(postData.userId, "postAndStory")
    const { yourPostShareOptions } = sharingSetting
    if (yourPostShareOptions === 0) {
      return failResponse(req, res, "sharingNotAllowedForThisPost")
    }
    const addShare = await postFuncs.addShare(postId, userId);
    const data = await postFuncs.reSharePost(userId, req.body);
    if (postData.userId !== userId) {
      // CODE FOR NOTIFICATION 
      let userD = req.user
      let { totalShares } = postData
      let and_n_others
      let mainData = {
        ...userD,
        ...postData
      }
      if (totalShares === 2) {
        and_n_others = "and 1 other "
      }
      if (totalShares === 1) {
        and_n_others = ''
      }
      if (totalShares > 2) {
        and_n_others = `and ${totalShares - 1} others`
      }
      mainData.and_n_others = and_n_others
      const inAppData = {
        postId: postData.postId,
        postType: postData.postType,
        notificationType: "socialFeed-sharePost"
      }
      await adminContNotificationFuncs.sendNotificationsByType("socialFeed-sharePost", mainData, inAppData)
    }
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const removeShare = async (req, res) => {
  try {
    const postId = req.body.postId;
    if (!postId) {
      return failResponse(req, res, "please Enter postId");
    }
    const userId = req.user.id;
    const data = await postFuncs.removeShare(userId, req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getUserAndGroupsListForEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    let result = {};
    const inviteFriendsData = await postFuncs.getPeopleList(
      userId,
      "Connections",
      req.body
    );
    result.inviteFriends = inviteFriendsData.rows;
    const inviteGroupsData = await userFuncs.getUserAllGroups(userId, req.body);
    result.inviteGroups = inviteGroupsData.rows;
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const undoPostDelete = async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return failResponse(req, res, "postId NotAvailable");
    }
    await postFuncs.undoPostDelete(postId);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const undoPostHide = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;
    if (!postId) {
      return failResponse(req, res, "postId NotAvailable");
    }
    await postFuncs.undoPostHide(userId, postId);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const undoPostReport = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;
    if (!postId) {
      return failResponse(req, res, "postId NotAvailable");
    }
    await postFuncs.undoPostReport(userId, postId);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const addArticleCategory = async (req, res) => {
  try {
    const { articleName } = req.body;
    const userId = req.user.id
    if (!articleName) {
      return failResponse(req, res, "Enter articleName");
    }
    await postFuncs.addArticleCategory(articleName, userId);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getSuggestedUsers = async (req, res) => {
  try {
    // const userId = req.user.id;
    // const data = await postFuncs.suggestedUsers(userId, req.body);
    // const result = data[0].suggestedUsers;
    const result = await postFuncs.getSuggestedUsersListByLocation(req.user.id, req.body)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getBusinessPagesByCategory = async (req, res) => {
  try {
    // const userId = req.user.id
    const userId = req.body.userId;
    const type = req.body.type;
    const typeArr = ["Movies", "Music", "Book"];
    if (!typeArr.includes(type)) {
      return failResponse(req, res, "Please Enter one of Movies,Music or Book");
    }
    const result = await postFuncs.getBusinessPagesByCategory(userId, type);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//new linkitsoft

export const shareModulePost = async (req, res) => {
  try {
    const userId = req.user.id;
    // const userId = req.body.userId
    const type = req.body.type;
    const sharedPostId = req.body.sharedPostId;
    const caption = req.body.caption || null;
    const allowComments = req.body.allowComments || true;
    let typeArr = ["sell", "reShareBizPost", "reShareGroupPost"];
    if (!typeArr.includes(type)) {
      return failResponse(
        req,
        res,
        "type can only be set to sell for mp OR reShareBizPost for bizPage OR reShareGroupPost for groupPost "
      );
    }
    const result = await postFuncs.shareModulePost(userId, type, sharedPostId, caption, allowComments);
    const postData = await postFuncs.getPostOwnerDetails(sharedPostId)
    let userD = req.user
    if (postData.userId !== userId) {
      let mainData = {
        ...userD,
        ...postData
      }
      const inAppData = {
        postId: postData.postId,
        postType: postData.postType,
        notificationType: "group-postReshare"
      }
      await adminContNotificationFuncs.sendNotificationsByType("group-postReshare", mainData, inAppData)
    }
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getWeatherUpdate = async (req, res) => {
  try {
    const { locationLAT, locationLONG } = req.body
    if (!locationLAT) {
      return failResponse(req, res, "Please enter locationLAT")
    }
    if (!locationLONG) {
      return failResponse(req, res, "Please enter locationLONG")
    }
    const result = await postFuncs.getWeatherUpdate(locationLAT, locationLONG);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const shareFeedPostToOtherModules = async (req, res) => {
  try {
    const userId = req.user.id
    const postId = req.body.postId
    const caption = req.body.caption || null
    const allowComments = req.body.allowComments || true
    if (!postId) {
      return failResponse(req, res, "Enter postId")
    }
    const type = req.body.type
    const typeArr = ["group", "bPage"]
    if (!typeArr.includes(type)) {
      return failResponse(req, res, "Enter one of group/bPage")
    }
    const id = req.body.id
    if (!id) {
      return failResponse(req, res, "Enter id")
    }
    await postFuncs.addShare(postId, userId)
    const result = await postFuncs.shareFeedPostToOtherModules(userId, type, postId, id, caption, allowComments);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id
    const { pageSize, pageIndex } = req.body
    const result = await notificationFuncs.getNotifications(userId, pageIndex, pageSize)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getUnReadNotificationCount = async (req, res) => {
  try {
    const userId = req.user.id
    const result = await notificationFuncs.getUnreadNotificationCount(userId)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getSuggestedShotzByShotzId = async (req, res) => {
  try {
    const userId = req.user.id
    const result = await postFuncs.getSuggestedShotzByShotzId(userId, req.body)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};