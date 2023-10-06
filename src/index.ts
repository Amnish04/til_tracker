import * as fs from 'fs';
import * as path from 'path';
import {parseCommandLindArgs} from "./commandLineParser";
import {errorHandling, parseFiles} from "./fileParser";
const TOML = require('@ltd/j-toml');

const argv = parseCommandLindArgs();
const OUTPUT_DIR = './til';

// extract options from command line arguments
const fileName = argv._[0];
let selectedLang: string = argv.lang;
let cssLink = '';

if (argv.stylesheet !== '') {
    if (isURL(argv.stylesheet)) {
        cssLink = argv.stylesheet;
    }
    else {
        const ouptutDirectory = OUTPUT_DIR;
        const filePath = argv.stylesheet;
        const relativePath = path.relative(ouptutDirectory, filePath);

        cssLink = relativePath;
    }
}

if (argv.config) {
    try {
        const configPath: string = path.resolve(argv.config);
        if (!fs.existsSync(configPath)) {
            errorHandling(`${argv.config} does not exist`);
        }
        if (path.extname(configPath) !== '.toml') {
            errorHandling('Config file must be a .toml file');
        }
        const configOptions = TOML.parse(fs.readFileSync(configPath));
        selectedLang = configOptions.lang || 'en-CA';
        cssLink = configOptions.stylesheet || '';
    } catch (err: any) {
        errorHandling(err.message);
    }
} 

// check if OUTPUT_DIR already exists and remove existing folder for containing the latest output
if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
    console.log('Existing folder was successfully removed');
}
fs.mkdirSync(OUTPUT_DIR);
console.log('Output folder ./til is successfully created');

parseFiles(cssLink, selectedLang, OUTPUT_DIR, fileName);