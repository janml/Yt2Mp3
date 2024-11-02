import os
import webview
from threading import Thread
from yt_dlp import YoutubeDL


BASE_DIR = os.path.abspath(os.path.dirname(__file__))

ASSETS_DIR = os.path.join(BASE_DIR, "assets")


view: webview.Window


class JsApi:
    def __init__(self):
        pass

    def _set_status_label(self, s: str):
        view.evaluate_js(f"setStatusLabel('{s}')")

    def download_video_as_mp3(self, video_url: str):
        def _on_progress(state):
            self._set_status_label(f"Downloading: {state['_percent_str']} / {state['_total_bytes_str']} ({state['_speed_str']})")

        def _on_postprocess(state):
            self._set_status_label("Converting to Mp3 ...")
            if state["postprocessor"] == "MoveFiles" and state["status"] == "finished":
                self._set_status_label("Done")

        def _download():
            YoutubeDL({
                "no_color": True,  # Remove ansi escape sequences from progress messages.
                "format": "bestaudio/best",
                "progress_hooks": [_on_progress],
                "ffmpeg_location": BASE_DIR,
                # TODO: Adjust the path to point to MEIPASS, when building with pyinstaller.
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': '192',
                }],
                "postprocessor_hooks": [_on_postprocess],

            }).download(url_list=[video_url])

        Thread(target=_download, daemon=True).start()
        self._set_status_label("Loading video ...")


if __name__ == '__main__':
    view = webview.create_window(
        title="Yt2Mp3",
        resizable=True,
        url=os.path.join(ASSETS_DIR, "gui.html"),
        js_api=JsApi(),
    )
    webview.start(debug=True)
