import * as fs from 'fs'
import * as readline from 'readline'
import { PassThrough } from 'stream'

async function sortLargeFile(filePath: string, chunkSize: number) {
    let chunkCount = 0;
    let chunks = [];
    let currentChunk = [];
    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        currentChunk.push(line);
        if (currentChunk.length >= chunkSize) {
            currentChunk.sort();
            const chunkFilePath = `chunk_${chunkCount}.txt`;
            fs.writeFileSync(chunkFilePath, currentChunk.join('\n'));
            chunks.push(chunkFilePath);
            chunkCount++;
            currentChunk = [];
        }
    }
    if (currentChunk.length > 0) {
        currentChunk.sort();
        const chunkFilePath = `chunk_${chunkCount}.txt`;
        fs.writeFileSync(chunkFilePath, currentChunk.join('\n'));
        chunks.push(chunkFilePath);
    }

    const outputStream = fs.createWriteStream('sorted_file.txt');
    const streams = chunks.map(chunkFile => fs.createReadStream(chunkFile));
    let mergedStream = new PassThrough();
    streams.forEach(stream => {
        stream.pipe(mergedStream, { end: false });
        stream.on('end', () => {
            fs.unlinkSync(stream.path);
        });
    });
    mergedStream.pipe(outputStream);
}

const filePath = '160-KB.txt';
const chunkSize = 500000;

// sortLargeFile(filePath, chunkSize)
//     .then(() => console.log('Файл отсортирован'))
//     .catch(error => console.error('Ошибка сортировки:', error));