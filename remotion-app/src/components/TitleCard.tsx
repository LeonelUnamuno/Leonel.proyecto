import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {fontFamily} from '../fonts';

export const TitleCard: React.FC<{triggerFrame: number}> = ({triggerFrame}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const local = frame - triggerFrame;
	const LIFESPAN = 46;

	if (local < -2 || local > LIFESPAN) return null;

	const enter = spring({frame: Math.max(local, 0), fps, config: {damping: 16, mass: 0.6, stiffness: 190}, durationInFrames: 16});
	const exit = interpolate(local, [LIFESPAN - 12, LIFESPAN], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const opacity = Math.min(enter, exit);
	const scale = interpolate(enter, [0, 1], [1.22, 1]);
	const blur = interpolate(enter, [0, 1], [14, 0], {extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: 130}}>
			<div
				style={{
					opacity,
					transform: `scale(${scale})`,
					filter: `blur(${blur}px)`,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 6,
				}}
			>
				<div
					style={{
						fontFamily,
						fontWeight: 500,
						fontSize: 16,
						letterSpacing: 6,
						color: 'rgba(255,255,255,0.65)',
						textTransform: 'uppercase',
					}}
				>
					El título
				</div>
				<div
					style={{
						fontFamily,
						fontWeight: 900,
						fontSize: 46,
						letterSpacing: -1,
						color: '#FFFFFF',
						textShadow: '0 6px 30px rgba(10,132,255,0.55)',
						display: 'flex',
						alignItems: 'center',
						gap: 10,
					}}
				>
					<span>👀</span>
					<span
						style={{
							backgroundImage: 'linear-gradient(90deg, #5AC8FA, #0A84FF, #BF5AF2)',
							backgroundClip: 'text',
							WebkitBackgroundClip: 'text',
							color: 'transparent',
						}}
					>
						Vamos a ver
					</span>
				</div>
			</div>
		</AbsoluteFill>
	);
};
