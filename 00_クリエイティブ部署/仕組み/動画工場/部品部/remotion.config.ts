import {Config} from '@remotion/cli/config';

// この作業環境に入っている Chromium を使う（ダウンロードしない）
Config.setBrowserExecutable(
  '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
);
Config.setVideoImageFormat('jpeg');
