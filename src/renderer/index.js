

window.addEventListener("DOMContentLoaded", async () => {
  const videoUrlField = document.getElementById("video-url-field")
  const downloadStartButton = document.getElementById("download-start-button")
  const downloadProgressDescribtion = document.getElementById("download-progress-describtion")
  const downloadProgressbar = document.getElementById("download-progressbar")
  const videoForm = document.getElementById("video-form")

  let isDownloading = false

  downloadStartButton.addEventListener("click", async () => {
    if (isDownloading) {return}
    
    isDownloading = true
    videoForm.disabled  = true
    videoUrl = videoUrlField.value
    downloadProgressDescribtion.innerText = "Loading video information ... ⌛"

    await window.youtube.downloadVideoAsMp3(videoUrl, async (progress) => {
      const percent = ((progress.processed / progress.total) * 100).toFixed(2)
      const totalMB = (progress.total / 1024 / 1024).toFixed(2)
      const progressedMB = (progress.processed / 1024 / 1024).toFixed(2)
      
      downloadProgressbar.value = percent
      downloadProgressDescribtion.innerText = `Downloading: ${percent} % (${progressedMB} / ${totalMB} MB) 🚀`
    })

    downloadProgressbar.value = 0
    downloadProgressDescribtion.innerText = "Download finished 😊"
    videoUrlField.value = String()
    isDownloading = false
    videoForm.disabled  = false
  })
})
