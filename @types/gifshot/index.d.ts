// Type definitions for gifshot 0.4
// Project: https://github.com/yahoo/gifshot
// Definitions by: Dan Revah <https://github.com/danrevah>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace gifshot {
    interface GifshotOptions {
        /**
         * @description CSS filter to apply to the image
         * @default ''
         */
        filter?: string | undefined;
        /**
         * @description The amount of time (in seconds) to wait between each frame capture
         * @default 0.1
         */
        frameDuration?: number | undefined;
        /**
         * @description The height of the created GIF
         * @default 200
         */
        gifHeight?: number | undefined;
        /**
         * @description The width of the created GIF
         * @default 200
         */
        gifWidth?: number | undefined;
        /**
         * @description A URL of an image to use as a watermark
         * @default ''
         */
        waterMark?: string | undefined;
        /**
         * @description The font size of the text that is drawn
         * @default '16px'
         */
        fontSize?: string | undefined;
        /**
         * @description The corner of the GIF that the watermark is drawn in
         * @default 'bottom-right'
         */
        waterMarkLocation?: string | undefined;
        /**
         * @description The path of the image to use as a watermark (if not using a URL)
         * @default ''
         */
        waterMarkPath?: string | undefined;
        /**
         * @description The text that is drawn on the GIF
         * @default ''
         */
        text?: string | undefined;
        /**
         * @description The font family of the text that is drawn
         * @default 'sans-serif'
         */
        fontFamily?: string | undefined;
        /**
         * @description The color of the text that is drawn
         * @default '#000000'
         */
        fontColor?: string | undefined;
        /**
         * @description The weight of the text that is drawn
         * @default 'normal'
         */
        fontWeight?: string | undefined;
        /**
         * @description The style of the text that is drawn
         * @default 'normal'
         */
        fontStyle?: string | undefined;
        /**
         * @description The horizontal alignment of the text that is drawn
         * @default 'center'
         */
        textAlign?: string | undefined;
        /**
         * @description The vertical alignment of the text that is drawn
         * @default 'bottom'
         */
        textBaseline?: string | undefined;
        /**
         * @description The x coordinate of the text that is drawn
         * @default null
         */
        textX?: number | undefined;
        /**
         * @description The y coordinate of the text that is drawn
         * @default null
         */
        textY?: number | undefined;
        /**
         * @description The number of frames to use to create the GIF, at an even interval over the supplied duration
         * @default 10
         */
        numFrames?: number | undefined;
        /**
         * @description The image format of the created GIF
         * @default 'gif'
         */
        imageType?: 'gif' | 'jpg' | 'png' | undefined;
        /**
         * @description The quality of the created GIF, a value between 0 and 100
         * @default 10
         */
        quality?: number | undefined;
        /**
         * @description The number of web workers to use to process the GIF frames
         * @default 2
         */
        numWorkers?: number | undefined;
        /**
         * @description The images to use to create the GIF. This may be an array of image URLs or an array of video file paths.
         */
        images?: string[] | undefined;
        /**
         * @description The video to use to create the GIF. This may be an array of video file paths.
         */
        video?: string[] | File[] | undefined;
        /**
         * @description The camera stream to use to create the GIF
         */
        webcam?: boolean | undefined;
        /**
         * @description The number of seconds to capture from the camera stream
         * @default 3
         */
        webcamVideoLength?: number | undefined;
        /**
         * @description Whether or not to save the created GIF to local storage
         * @default false
         */
        saveRenderingContexts?: boolean | undefined;
        /**
         * @description The name of the created GIF in local storage
         * @default 'gifshot'
         */
        savedRenderingContextsName?: string | undefined;
        /**
         * @description The duration of the video to use to create the GIF
         */
        videoDuration?: number | undefined;
        /**
         * @description The start time of the video to use to create the GIF
         */
        videoStartTime?: number | undefined;
    }

    interface GifshotResult {
        /**
         * @description Whether or not there was an error creating the GIF
         */
        error: boolean;
        /**
         * @description The error code
         */
        errorCode: string;
        /**
         * @description The error message
         */
        error_msg: string;
        /**
         * @description The base64 encoded GIF
         */
        image: string;
    }

    /**
     * @description Creates an animated GIF from a series of images or a video.
     * @param options An object containing the options for the GIF creation.
     * @param callback A function to be called when the GIF creation is complete.
     */
    function createGIF(
        options: GifshotOptions,
        callback: (obj: GifshotResult) => void,
    ): void;

    /**
     * @description Takes a screenshot of the current page.
     * @param options An object containing the options for the screenshot.
     * @param callback A function to be called when the screenshot is complete.
     */
    function takeScreenshot(
        options: GifshotOptions,
        callback: (obj: GifshotResult) => void,
    ): void;
}

export = gifshot;
export as namespace gifshot;
