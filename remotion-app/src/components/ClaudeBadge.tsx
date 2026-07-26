import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {fontFamily} from '../fonts';

export const ClaudeBadge: React.FC<{triggerFrame: number}> = ({triggerFrame}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const local = frame - triggerFrame;
	const LIFESPAN = 40;

	if (local < -2 || local > LIFESPAN) return null;

	const enter = spring({frame: Math.max(local, 0), fps, config: {damping: 13, mass: 0.5, stiffness: 260}, durationInFrames: 12});
	const exit = interpolate(local, [LIFESPAN - 10, LIFESPAN], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const opacity = Math.min(enter, exit);
	const scale = interpolate(enter, [0, 1], [0.5, 1]);
	const rotate = interpolate(enter, [0, 1], [-14, 0]);

	return (
		<AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'flex-end', padding: '90px 26px 0 0'}}>
			<div
				style={{
					opacity,
					transform: `scale(${scale}) rotate(${rotate}deg)`,
					display: 'flex',
					alignItems: 'center',
					gap: 8,
					padding: '10px 18px 10px 14px',
					borderRadius: 999,
					background: 'linear-gradient(120deg, rgba(191,90,242,0.9), rgba(10,132,255,0.9))',
					boxShadow: '0 10px 34px rgba(120,80,255,0.45)',
				}}
			>
				<span style={{fontSize: 20}}>✦</span>
				<span style={{fontFamily, fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: -0.3}}>Claude</span>
			</div>
		</AbsoluteFill>
	);
};
