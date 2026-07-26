export type TimelineWord = {
	text: string;
	start: number;
	end: number;
	startFrame: number;
	endFrame: number;
	prob: number;
	keyword?: 'claude' | 'curse' | 'subtitles' | 'title';
	segmentIndex: number;
};

export type TimelineSegment = {
	sourceStart: number;
	sourceEnd: number;
	sourceStartFrame: number;
	sourceEndFrame: number;
	newStart: number;
	newStartFrame: number;
	durationInFrames: number;
};

export type CaptionGroup = {
	startFrame: number;
	endFrame: number;
	text: string;
	words: TimelineWord[];
};

export type Timeline = {
	fps: number;
	totalDurationOriginal: number;
	totalDurationEdited: number;
	totalFrames: number;
	segments: TimelineSegment[];
	words: TimelineWord[];
	captionGroups: CaptionGroup[];
};
