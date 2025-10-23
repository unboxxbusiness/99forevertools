
declare module 'lamejs' {
  export class Mp3Encoder {
    constructor(channels: number, sampleRate: number, bitRate: number);
    encodeBuffer(samples: Int16Array): Int8Array;
    flush(): Int8Array;
  }

  export namespace WavHeader {
    function readHeader(dataView: DataView): {
      channels: number;
      sampleRate: number;
      dataOffset: number;
      dataLen: number;
    };
  }
}
