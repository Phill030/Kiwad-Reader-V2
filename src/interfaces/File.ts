export interface File {
    filename: String;
    size: number;
    headerSize: number;
    compressedHeaderSize: number;
    crc: number;
    headerCRC: number;
}