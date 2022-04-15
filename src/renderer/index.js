


window.addEventListener("DOMContentLoaded", () => {
  const videoUrlField = document.getElementById("video-url-field")
  const searchButton = document.getElementById("search-button")

  searchButton.addEventListener("click", () => {
    const videoUrl = videoUrlField.value
    console.log(`Requested to search for video with url: ${videoUrl}`)
  })
})
