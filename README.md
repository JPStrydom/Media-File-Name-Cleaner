# Media File Name Cleaner

## Description

This NodeJS script cleans up the names of downloaded movie and series files. It extracts the following information from files:
- `name`
- `seriesIndex` (_if available_) - (_e.g. S02E08_)
- `quality` (_if available_) - (_e.g. 1080p_)
- `fileExtention`

It then uses this information to rename movie or episode files with a cleaner format (_i.e. `{name} {seriesIndex} {quality}.{extention}`_).

## Requirements

This script require [NodeJS](https://nodejs.org/en/download/) to be installed on the machine running it.

## How To Use

To run this script:
1. Place this repo's folder in the same folder as the media files you'd like to rename (_"Media Folder" in the example below_).
    ```
    Media Folder
    └── memes.and.queens.s04e20.480p.WEB-DL.x264-mSD.mkv
    └── the.one.and.the.other.S02E14.2160p.HEVC.x265-MeGusta.mp4   
    └── survivor.s09e12.4k.HDTV.x264-SYNCOPY.MKV
    └── Media-File-Name-Cleaner // Repo folder goes here
        └── README.MD
        └── index.js
    ```
2. Open any terminal of your choosing in the folder where your media is located (_"Media Folder" in the example above_)
3. Run the following command:
    - Windows: `node .\Media-File-Name-Cleaner\`
    - Unix: `node ./Media-File-Name-Cleaner/`
    -
Here is an example of the script's output:
![series-file-name-cleaner](https://user-images.githubusercontent.com/25905330/146195178-646ab5a5-c057-4898-b691-d8475b6c17dd.png)
