import {staticFile} from 'remotion';
import {loadFont} from '@remotion/fonts';

export const fontFamily = 'Inter';

loadFont({
	family: fontFamily,
	url: staticFile('fonts/Inter-latin.woff2'),
	weight: '100 900',
	style: 'normal',
	format: 'woff2',
});
