"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

// Providers. 
var VideoProviders = [{ name: "youtube", convertURL: formatYoutubeURL }, { name: "vimeo", convertURL: formatVimeoURL }, { name: "dailymotion", convertURL: formatDailyMotionURL }, { name: "metacafe", convertURL: formatMetacafeURL }];

/* Formatting functions */

function formatYoutubeURL(url) {
    var embedURLBase = "https://www.youtube.com/embed/";
    var videoID = url.split("=")[1];

    return embedURLBase + videoID;
}

function formatVimeoURL(url) {
    var splittedUrl = url.split("/");
    var videoId = splittedUrl[splittedUrl.length - 1];
    var embededURL = "https://player.vimeo.com/video/";

    return embededURL + videoId;
}

function formatDailyMotionURL(url) {
    var splittedUrl = url.split("/");
    var titleURL = splittedUrl[splittedUrl.length - 1];
    var videoId = titleURL.split("_")[0];
    var embededURL = "//www.dailymotion.com/embed/video/";

    return embededURL + videoId;
}

function formatMetacafeURL(url) {
    var splittedUrl = url.split("/");
    var videoId = splittedUrl[4] + "/" + splittedUrl[5];
    var embededURL = "http://www.metacafe.com/embed/";

    return embededURL + videoId;
}

exports.default = VideoProviders;