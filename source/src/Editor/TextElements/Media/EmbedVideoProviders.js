
// Providers. 
const VideoProviders =
[
  {name: "youtube", convertURL: formatYoutubeURL},
  {name: "vimeo", convertURL:formatVimeoURL},
  {name: "dailymotion", convertURL:formatDailyMotionURL},
  {name: "metacafe", convertURL:formatMetacafeURL}
];


/* Formatting functions */

function formatYoutubeURL(url)
{
   const embedURLBase = "https://www.youtube.com/embed/"
   const videoID = url.split("=")[1];

   return embedURLBase + videoID;
}

function formatVimeoURL(url)
{
    const splittedUrl = url.split("/");
    const videoId = splittedUrl[splittedUrl.length-1];
    const embededURL = "https://player.vimeo.com/video/";

    return embededURL + videoId;
}

function formatDailyMotionURL(url)
{
    const splittedUrl = url.split("/");
    const titleURL = splittedUrl[splittedUrl.length -1];
    const videoId = titleURL.split("_")[0];
    const embededURL = "//www.dailymotion.com/embed/video/";

    return embededURL + videoId;
}

function formatMetacafeURL(url)
{
    const splittedUrl = url.split("/");
    const videoId = splittedUrl[4] + "/" + splittedUrl[5];
    const embededURL = "http://www.metacafe.com/embed/";

    return embededURL + videoId;
}

export default VideoProviders;
