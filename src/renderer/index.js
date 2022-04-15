

window.addEventListener("DOMContentLoaded", () => {
  const videoUrlField = document.getElementById("video-url-field")
  const searchButton = document.getElementById("search-button")
  const videoSearchResultCard = document.getElementById("video-search-result-card")

  searchButton.addEventListener("click", async () => {
    const videoUrl = videoUrlField.value
    console.log(`Requested to search for video with url: ${videoUrl}`)

    let videoMeta = await window.youtube.getVideoMeta(videoUrl)
    console.log(videoMeta)

    //videoSearchResultCard.classList.remove("is-invisible")

  })
})
