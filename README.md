# Yt2mp3
Simple YouTube Mp3 downloader.

(This is mostly a graphical wrapper around [yt-dlp](https://github.com/yt-dlp/yt-dlp) and [ffmpeg](https://ffmpeg.org/))

![Screenshot](https://github.com/janml/Yt2Mp3/blob/main/screenshot.png?raw=true "Screenshot")


## How to use
You have two options to use this project.
1) You can download the pre-build binary from GitHub releases.
2) You can clone and build the project yourself (more information down below).


## How to build
1) Install `python>=3.11`
2) Clone or download this repository.
3) In the repository root, create a [python virtualenv](https://docs.python.org/3.11/library/venv.html).
4) Install dependencies with pip: `pip install -r requirements.txt`
5) Download [ffmpeg](https://ffmpeg.org/) and put its binary (ffmpeg.exe) into the repository root.
6) Build with pyinstaller `pyinstaller build.spec`
7) Get the solution from `dist` folder inside the repo root.


## Thanks to
- [yt-dlp](https://github.com/yt-dlp/yt-dlp)
- [ffmpeg](https://ffmpeg.org/)
- [pywebview](https://pywebview.flowrl.com/)
- [Bootstrap](https://getbootstrap.com/)
- [pyinstaller](https://pyinstaller.org/en/stable/)
