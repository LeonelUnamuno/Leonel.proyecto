import {interpolate, spring} from 'remotion';
import type {TimelineWord} from './types';

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

// Punch-in on every cut: quick overshoot settle, gives the edit rhythm/energy.
export const cutPunchDelta = (frame: number, segmentStartFrame: number, fps: number) => {
	const local = frame - segmentStartFrame;
	if (local < 0) return 0;
	const s = spring({
		frame: local,
		fps,
		config: {damping: 11, mass: 0.4, stiffness: 150},
		durationInFrames: 18,
	});
	return interpolate(s, [0, 1], [0.07, 0], {extrapolateRight: 'clamp'});
};

// Slow continuous drift within a shot (subtle Ken Burns).
export const driftDelta = (frame: number, segmentStartFrame: number, durationInFrames: number) => {
	const local = clamp(frame - segmentStartFrame, 0, durationInFrames);
	return interpolate(local, [0, Math.max(durationInFrames, 1)], [0, 0.035]);
};

// Extra emphasis punch keyed to content (keywords like "Claude", "título"...).
export const keywordPunchDelta = (frame: number, keywordStartFrame: number, fps: number) => {
	const local = frame - keywordStartFrame;
	if (local < -3 || local > 26) return 0;
	const s = spring({
		frame: Math.max(local, 0),
		fps,
		config: {damping: 9, mass: 0.5, stiffness: 180},
		durationInFrames: 26,
	});
	return interpolate(s, [0, 1], [0.16, 0], {extrapolateRight: 'clamp'});
};

export const totalZoomScale = (
	frame: number,
	segmentStartFrame: number,
	durationInFrames: number,
	fps: number,
	keywords: TimelineWord[],
) => {
	let delta = cutPunchDelta(frame, segmentStartFrame, fps) + driftDelta(frame, segmentStartFrame, durationInFrames);
	for (const w of keywords) {
		delta += keywordPunchDelta(frame, w.startFrame, fps);
	}
	return 1 + delta;
};

// Gentle outro: settle + fade in the very last frames of the edit.
export const outroFade = (frame: number, totalFrames: number) => {
	const framesFromEnd = totalFrames - frame;
	if (framesFromEnd > 10) return 1;
	return interpolate(framesFromEnd, [0, 10], [0.85, 1], {extrapolateLeft: 'clamp'});
};
