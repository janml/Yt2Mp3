

window.addEventListener("DOMContentLoaded", async () => {
  const videoUrlField = document.getElementById("video-url-field")
  const videoSearchButton = document.getElementById("video-search-button")
  const videoMetaCard = document.getElementById("video-meta-card")
  const videoTitle = document.getElementById("video-title")
  const videoThubmnail = document.getElementById("video-thumbnail")
  const downloadStartButton = document.getElementById("download-start-button")
  const downloadProgressbar = document.getElementById("download-progressbar")
  const downloadProgressDescribtion = document.getElementById("download-progress-describtion")

  let videoUrl = String()

  videoSearchButton.addEventListener("click", async () => {
    videoUrl = videoUrlField.value
    const videoMeta = await window.youtube.getVideoMeta(videoUrl)
    console.log(videoMeta)

    videoTitle.innerText = `${videoMeta.videoDetails.title.substring(0, 20)} ...`
    videoThubmnail.src = videoMeta.videoDetails.thumbnails[0].url
    videoMetaCard.classList.remove("is-invisible")
  })

  downloadStartButton.addEventListener("click", async () => {
    downloadStartButton.classList.add("is-invisible")
    downloadProgressbar.classList.remove("is-invisible")

    await window.youtube.downloadVideoAsMp3(videoUrl, (progress) => {
      const percent = ((progress.downloaded / progress.total) * 100).toFixed(2)
      downloadProgressbar.value = percent
      downloadProgressDescribtion.innerText = `Progress: ${percent}`

      console.log(`${percent} % downloaded`)
    })

    downloadProgressbar.classList.add("is-invisible")
    downloadStartButton.classList.remove("is-invisible")
    downloadProgressbar.value = 0
    downloadProgressDescribtion.innerText = "Download finished."
  })
})
