import React from 'react';
import {AbsoluteFill, OffthreadVideo, Sequence, useCurrentFrame, useVideoConfig, staticFile} from 'remotion';
import type {Timeline} from '../types';
import {totalZoomScale} from '../zoom';

const keywordWords = (timeline: Timeline) => timeline.words.filter((w) => w.keyword);

export const EditedVideo: React.FC<{timeline: Timeline}> = ({timeline}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const keywords = keywordWords(timeline);

	return (
		<AbsoluteFill style={{backgroundColor: '#000'}}>
			{timeline.segments.map((segment, i) => {
				const scale = totalZoomScale(
					frame,
					segment.newStartFrame,
					segment.durationInFrames,
					fps,
					keywords,
				);
				return (
					<Sequence
						key={i}
						from={segment.newStartFrame}
						durationInFrames={segment.durationInFrames}
						name={`shot-${i}`}
					>
						<AbsoluteFill style={{overflow: 'hidden'}}>
							<AbsoluteFill
								style={{
									transform: `scale(${scale})`,
									transformOrigin: '50% 42%',
								}}
							>
								<OffthreadVideo
									src={staticFile('source.mp4')}
									trimBefore={segment.sourceStartFrame}
									trimAfter={segment.sourceEndFrame}
									style={{width: '100%', height: '100%', objectFit: 'cover'}}
								/>
							</AbsoluteFill>
						</AbsoluteFill>
					</Sequence>
				);
			})}
		</AbsoluteFill>
	);
};
