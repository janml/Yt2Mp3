

function showVideoSearchResult(videoMeta) {
  const videoSearchResultCard = document.getElementById("video-search-result-card")
  const videoTitle = document.getElementById("video-title")
  const youtubeChannleName = document.getElementById("youtube-channel-name")
  const videoThumbnail = document.getElementById("video-thumbnail")

  videoSearchResultCard.classList.remove("is-invisible")
  videoTitle.innerText = `${videoMeta.videoDetails.title.substring(0, 20)} ...`
  youtubeChannleName.innerText = `${videoMeta.videoDetails.author.name.substring(0, 20)} ...`
  videoThumbnail.src = videoMeta.videoDetails.thumbnails[0].url

}


window.addEventListener("DOMContentLoaded", () => {
  const videoUrlField = document.getElementById("video-url-field")
  const searchButton = document.getElementById("search-button")
  
  searchButton.addEventListener("click", async () => {
    const videoMeta = await window.youtube.getVideoMeta(videoUrlField.value)
    console.log(videoMeta)
    showVideoSearchResult(videoMeta)
  })
})
