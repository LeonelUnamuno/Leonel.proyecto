import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer('angle');

const browserPath = process.env.REMOTION_BROWSER_EXECUTABLE;
if (browserPath) {
	Config.setBrowserExecutable(browserPath);
}
