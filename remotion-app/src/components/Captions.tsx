import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {CaptionGroup} from '../types';
import {fontFamily} from '../fonts';

const ACCENT = 'linear-gradient(90deg, #5AC8FA 0%, #0A84FF 50%, #BF5AF2 100%)';

export const Captions: React.FC<{groups: CaptionGroup[]}> = ({groups}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const active = groups.find((g) => frame >= g.startFrame - 1 && frame <= g.endFrame + 7);
	if (!active) return null;

	const groupLocal = frame - active.startFrame;
	const entrance = spring({
		frame: groupLocal,
		fps,
		config: {damping: 15, mass: 0.5, stiffness: 210},
		durationInFrames: 10,
	});
	const framesFromEnd = active.endFrame + 7 - frame;
	const exit = interpolate(framesFromEnd, [0, 7], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
	const containerOpacity = Math.min(entrance, exit);
	const translateY = interpolate(entrance, [0, 1], [22, 0]);

	const hasSubtitlesMoment = active.words.some((w) => w.keyword === 'subtitles' && frame >= w.startFrame && frame <= w.endFrame + 12);
	const glow = hasSubtitlesMoment
		? interpolate(
				spring({frame: Math.max(frame - (active.words.find((w) => w.keyword === 'subtitles')?.startFrame ?? 0), 0), fps, config: {damping: 10}, durationInFrames: 20}),
				[0, 1],
				[0, 1],
				{extrapolateRight: 'clamp'},
			)
		: 0;

	return (
		<AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 150}}>
			<div
				style={{
					opacity: containerOpacity,
					transform: `translateY(${translateY}px)`,
					maxWidth: '90%',
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
					gap: '0 12px',
					padding: '14px 26px',
					borderRadius: 22,
					background: 'rgba(10,10,14,0.42)',
					backdropFilter: 'blur(18px)',
					boxShadow: glow > 0 ? `0 0 ${18 + glow * 26}px rgba(10,132,255,${0.35 + glow * 0.45})` : '0 8px 30px rgba(0,0,0,0.25)',
				}}
			>
				{active.words.map((w, i) => {
					const isCurrent = frame >= w.startFrame && frame <= w.endFrame + 2;
					const isPast = frame > w.endFrame + 2;
					const wordLocal = frame - w.startFrame;
					const pop = spring({
						frame: Math.max(wordLocal, 0),
						fps,
						config: {damping: 12, mass: 0.5, stiffness: 260},
						durationInFrames: 9,
					});
					const scale = wordLocal < 0 ? 1 : interpolate(pop, [0, 1], [0.86, 1], {extrapolateRight: 'clamp'});
					const wordOpacity = wordLocal < -4 ? 0 : 1;

					return (
						<span
							key={i}
							style={{
								fontFamily,
								fontWeight: 800,
								fontSize: 40,
								lineHeight: 1.15,
								letterSpacing: -0.5,
								transform: `scale(${isCurrent ? Math.max(scale, 1.08) : scale})`,
								opacity: wordOpacity,
								color: isCurrent ? 'transparent' : isPast ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
								backgroundImage: isCurrent ? ACCENT : undefined,
								backgroundClip: isCurrent ? 'text' : undefined,
								WebkitBackgroundClip: isCurrent ? 'text' : undefined,
								textShadow: isCurrent ? 'none' : '0 2px 14px rgba(0,0,0,0.55)',
								transition: 'color 0.05s linear',
							}}
						>
							{w.text}
						</span>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};
