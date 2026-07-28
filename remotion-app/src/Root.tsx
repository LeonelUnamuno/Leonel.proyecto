import {Composition} from 'remotion';
import {Main} from './Main';
import timeline from './data/timeline.json';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="VideoEdit"
				component={Main}
				durationInFrames={timeline.totalFrames}
				fps={timeline.fps}
				width={464}
				height={832}
			/>
		</>
	);
};
