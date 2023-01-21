require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce";
import * as pcSeriesFuncs from "../../funcs/PodCast/pcSeries.funcs";

export const createPodcastSeries = async (req, res) => {
    try {
        const { categoryId } = req.body;
        if (!categoryId) return failResponse(req, res, "categoryIdIsRequired");
        const userId = req.user.id
        const data = await pcSeriesFuncs.createPodcastSeries(req.body, userId);
        return successResponse(req, res, "Created");
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const createPodcastSeason = async (req, res) => {
    try {
        const { seriesId } = req.body;
        if (!seriesId) return failResponse(req, res, "seriesIdIdIsRequired");
        const data = await pcSeriesFuncs.createPodcastSeason(req.body);
        return successResponse(req, res, "Created");
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const createPodcastEpisode = async (req, res) => {
    try {
        const { seriesId } = req.body;
        const userId = req.user.id
        if (!seriesId) return failResponse(req, res, "seriesIdRequired");

        const data = await pcSeriesFuncs.createPodcastEpisode(req.body, userId);
        return successResponse(req, res, "Created");
    } catch (error) {
        return errorResponse(req, res, error);
    };
}

export const getAllSeasionsAndEpisodsBySerisId = async (req, res) => {
    try {
        const { seriesId } = req.body;
        if (!seriesId) return failResponse(req, res, "seriesIdRequired");
        const data = await pcSeriesFuncs.getAllSeasionsAndEpisodsBySerisId(seriesId);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const UpdatePodcastEpisode = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return failResponse(req, res, "episode id isRequired");
        const data = await pcSeriesFuncs.UpdatePodcastEpisode(req.body);
        return successResponse(req, res, "Updated");
    } catch (error) {
        return errorResponse(req, res, error);
    };
}

export const UpdatePodcastSeries = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return failResponse(req, res, "series id isRequired");
        const data = await pcSeriesFuncs.UpdatePodcastSeries(req.body);
        return successResponse(req, res, "Updated");
    } catch (error) {
        return errorResponse(req, res, error);
    };
}


export const getAllSerisByUserId = async (req, res) => {
    try {
        let userId = req.user?.id || req.body.userId;
        if (!userId) return failResponse(req, res, "seriesIdRequired");
        const data = await pcSeriesFuncs.getAllSerisByUserId(userId, req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const browseByCategory = async (req, res) => {
    try {
        const data = await pcSeriesFuncs.browseByCategory(req.body, req.user.id);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const exploreByCategoryByType = async (req, res) => {
    try {
        const userId = req.user.id
        const data = await pcSeriesFuncs.exploreByCategoryByType(req.body, userId, req.body.type);
        return successResponse(req, res, data);
        // if (req.body.type === 'manage') {
        //     const data = await pcSeriesFuncs.manageByCategoryByType(req.body, userId);
        //     return successResponse(req, res, data);
        // };
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const deletedSingalEpisode = async (req, res) => {
    try {
        if (!req.body.pcEpisodeId) return failResponse(req, res, 'noPcEpisodeId');
        const data = await pcSeriesFuncs.deletedSingalEpisode(req.body.pcEpisodeId);
        return successResponse(req, res, 'Success');
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const deleteSeries = async (req, res) => {
    try {
        if (!req.body.seriesId) return failResponse(req, res, 'noPcSeriesId');
        const data = await pcSeriesFuncs.deleteSeries(req.body.seriesId);
        return successResponse(req, res, 'Success');
    } catch (error) {
        return errorResponse(req, res, error);
    };
};


export const getSingalPodcastAnalyticsByType = async (req, res) => {
    try {
        const { pcEpisodeId, type, pageIndex, pageSize, searchKey } = req.body;
        const userId= req.user.id
        if (!pcEpisodeId) return failResponse(req, res, 'noPcEpisodeId');
        if (!type) return failResponse(req, res, 'noType');
        if (type === 'liked') {
            const data = await pcSeriesFuncs.getAllLike(pcEpisodeId, pageIndex, pageSize, searchKey, userId);
            return successResponse(req, res, data);
        };
        if (type === 'listened') {
            const data = await pcSeriesFuncs.getAllListeners(pcEpisodeId, pageIndex, pageSize, searchKey, userId);
            return successResponse(req, res, data);
        };
        if (type === 'share') {
            const data = await pcSeriesFuncs.getAllPcShares(pcEpisodeId, pageIndex, pageSize, searchKey, userId);
            return successResponse(req, res, data);
        };
        if (type === 'paid') {
            const data = await pcSeriesFuncs.getAllLike(pcEpisodeId, pageIndex, pageSize, searchKey, userId);
            return successResponse(req, res, data);
        };
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const getSingalPodcastAnalyticsDetails = async (req, res) => {
    try {
        const { pcEpisodeId } = req.body;
        if (!pcEpisodeId) return failResponse(req, res, 'noPcEpisodeId');
        const data = await pcSeriesFuncs.getSingalPodcastAnalyticsDetails(pcEpisodeId);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const getPcSeriesById = async (req, res) => {
    try {
        const { pcSeriesId } = req.body;
        if (!pcSeriesId) return failResponse(req, res, 'noPcSeriesId');
        const data = await pcSeriesFuncs.getSerisById(pcSeriesId, req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const getSeriesPodcastAnalyticsByType = async (req, res) => {
    try {
        const { pcEpisodeId, type, pageIndex, pageSize, searchKey } = req.body;
        if (!pcEpisodeId) return failResponse(req, res, 'noPcEpisodeId');

        if (!type) return failResponse(req, res, 'noType');
        if (type === 'liked') {
            const data = await pcSeriesFuncs.getAllLike(pcEpisodeId, pageIndex, pageSize, searchKey);
            return successResponse(req, res, data);
        };
        if (type === 'listened') {
            const data = await pcSeriesFuncs.getAllLike(pcEpisodeId, pageIndex, pageSize, searchKey);
            return successResponse(req, res, data);
        };
        if (type === 'share') {
            const data = await pcSeriesFuncs.getAllPcShares(pcEpisodeId, pageIndex, pageSize, searchKey);
            return successResponse(req, res, data);
        };
        if (type === 'paid') {
            const data = await pcSeriesFuncs.getAllLike(pcEpisodeId, pageIndex, pageSize, searchKey);
            return successResponse(req, res, data);
        };
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const getPodcastSuggestions = async (req, res) => {
    try {
        const data = await pcSeriesFuncs.getPodcastSuggestions(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const addPodcastListener = async (req, res) => {
    try {
        const userId = req.user.id
        const data = await pcSeriesFuncs.addPodcastListener(req.body, userId);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const getPodcastEpisodeDetails = async (req, res) => {
    try {
        const userId = req.user.id
        const data = await pcSeriesFuncs.getPodcastEpisodeDetails(req.body.id, userId);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const getPodcastSeriesDetails = async (req, res) => {
    try {
        const userId = req.user.id
        const data = await pcSeriesFuncs.getPodcastSeriesDetails(req.body, userId);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const getPodcastEpisodeAnalytics = async (req, res) => {
    try {
        const userId = req.user.id
        const data = await pcSeriesFuncs.getPodcastEpisodeAnalytics(req.body.id, userId);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const addPodcastInSeries = async (req, res) => {
    try {
        const userId = req.user.id
        const data = await pcSeriesFuncs.addPodcastInSeries(userId, req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const getSuggestedPodcast = async (req, res) => {
    try {
        const userId = req.user.id
        const data = await pcSeriesFuncs.getSuggestedPodcast(userId, req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const bookmarkPodcastSeries = async (req, res) => {
    try {
        const userId = req.user.id
        const data = await pcSeriesFuncs.bookmarkPodcastSeries(userId, req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};



export const reportPodcast = async (req, res) => {
    try {
        const userId = req.user.id
        const data = await pcSeriesFuncs.reportPodcast(userId, req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};