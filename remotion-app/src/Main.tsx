import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {EditedVideo} from './components/EditedVideo';
import {Captions} from './components/Captions';
import {TitleCard} from './components/TitleCard';
import {ClaudeBadge} from './components/ClaudeBadge';
import timeline from './data/timeline.json';
import type {Timeline} from './types';
import {outroFade} from './zoom';

const data = timeline as Timeline;

const titleWord = data.words.find((w) => w.keyword === 'title');
const claudeWord = data.words.find((w) => w.keyword === 'claude');

export const Main: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const fade = outroFade(frame, durationInFrames);

	return (
		<AbsoluteFill style={{backgroundColor: '#000', opacity: fade}}>
			<EditedVideo timeline={data} />

			{/* Cinematic vignette for a polished, filmic look */}
			<AbsoluteFill
				style={{
					pointerEvents: 'none',
					background:
						'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.38) 100%)',
				}}
			/>
			<AbsoluteFill
				style={{
					pointerEvents: 'none',
					background: 'linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 16%, rgba(0,0,0,0) 68%, rgba(0,0,0,0.55) 100%)',
				}}
			/>

			{claudeWord ? <ClaudeBadge triggerFrame={claudeWord.startFrame} /> : null}
			{titleWord ? <TitleCard triggerFrame={titleWord.startFrame} /> : null}

			<Captions groups={data.captionGroups} />
		</AbsoluteFill>
	);
};
