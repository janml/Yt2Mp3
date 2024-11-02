
function update_status_label(s) {
    document.getElementById('download-status-label').innerHTML = s
}


document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");

    document.getElementById("download-start-button").addEventListener("click", (event) => {
        const videoUrl = document.getElementById('video-url-field').value
        pywebview.api.download_youtube_video_as_mp3(videoUrl)
    })
});
