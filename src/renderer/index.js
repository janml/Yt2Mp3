

window.addEventListener("DOMContentLoaded", async () => {
  const videoUrlField = document.getElementById("video-url-field")
  const downloadStartButton = document.getElementById("download-start-button")
  const downloadProgressDescribtion = document.getElementById("download-progress-describtion")
  const downloadProgressbar = document.getElementById("download-progressbar")

  downloadStartButton.addEventListener("click", async () => {
    videoUrl = videoUrlField.value
    
    await window.youtube.downloadVideoAsMp3(videoUrl, async (progress) => {
      const percent = ((progress.processed / progress.total) * 100).toFixed(2)
      const totalMB = (progress.total / 1024 / 1024).toFixed(2)
      const progressedMB = (progress.processed / 1024 / 1024).toFixed(2)
      
      downloadProgressbar.value = percent
      downloadProgressDescribtion.innerText = `Progress: ${percent} % (${progressedMB} / ${totalMB} MB) 🚀`
    })

    downloadProgressbar.value = 0
    downloadProgressDescribtion.innerText = "Download finished 😊"
  })
})
