const fs = require('fs');
const path = require('path');

const VIDEO_FILE_EXTENSIONS = [
  '.avchd',
  '.avi',
  '.flv',
  '.m4p',
  '.m4v',
  '.mkv',
  '.mov',
  '.mp2',
  '.mp4',
  '.mpe',
  '.mpeg',
  '.mpg',
  '.mpv',
  '.mvi',
  '.ogg',
  '.qt',
  '.swf',
  '.webm',
  '.wmv'
];

const PERIOD_REGEX = /\./g;
const MULTI_SPACE_REGEX = /\s{2,}/g;
const START_CASE_REGEX = /\b\w/g;

const NAME_PRE_IDENTIFIER_REGEX = /^.*(?=[^s]s\d{2}e\d{2})/i;
const NAME_PRE_QUALITY_REGEX = /^.*(?=[^\d]\d+[p|k])/i;
const IDENTIFIER_REGEX = /s\d{2}e\d{2}/i;
const QUALITY_REGEX = /\d+[p|k]/i;
const EXTENSION_REGEX = /\.[^.]*$/i;

const getCurrentDir = fileName => path.join(__dirname, '../', fileName || '');

const isVideoFileName = fileName =>
  VIDEO_FILE_EXTENSIONS.some(extension => fileName.toLowerCase().endsWith(extension));

const getVideoFileNames = () => fs.readdirSync(getCurrentDir()).filter(isVideoFileName);

const shouldRenameFile = fileName => fileName.match(PERIOD_REGEX).length > 1;

const getName = fileName =>
  (NAME_PRE_IDENTIFIER_REGEX.exec(fileName)?.[0] || NAME_PRE_QUALITY_REGEX.exec(fileName)?.[0])
    .replace(PERIOD_REGEX, ' ')
    .replace(START_CASE_REGEX, c => c.toUpperCase())
    .trim();

const getIdentifier = fileName => IDENTIFIER_REGEX.exec(fileName)?.[0].toUpperCase() || '';

const getQuality = fileName => QUALITY_REGEX.exec(fileName)?.[0].replace('k', 'K') || '';

const getExtension = fileName => EXTENSION_REGEX.exec(fileName)[0];

const buildNewFileName = ({ name, identifier, quality, extension }) => {
  const newFileName = `${name} ${identifier} ${quality}`.replace(MULTI_SPACE_REGEX, ' ').trim();
  return `${newFileName}${extension}`;
};

const getNewFileName = fileName => {
  try {
    fileName = fileName.toLowerCase();
    const name = getName(fileName);
    const identifier = getIdentifier(fileName);
    const quality = getQuality(fileName);
    const extension = getExtension(fileName);
    return buildNewFileName({ name, identifier, quality, extension });
  } catch (error) {
    return null;
  }
};

const renameFile = fileName => {
  if (!shouldRenameFile(fileName)) {
    console.log(`Skipping file "${fileName}" as it already has a correctly formatted name`);
    return;
  }
  const newFileName = getNewFileName(fileName);
  if (newFileName) {
    console.log(`Renaming file "${fileName}" to "${newFileName}"`);
    fs.renameSync(getCurrentDir(fileName), getCurrentDir(newFileName));
  } else {
    console.error(
      `Skipping file "${fileName}" as something went wrong while trying to generate a new file name for it`
    );
  }
};

const renameFiles = () => {
  console.log('\nStarting media files renaming\n');
  const fileNames = getVideoFileNames();
  fileNames.forEach(renameFile);
  console.log('\nDone renaming all media files\n');
};

renameFiles();
