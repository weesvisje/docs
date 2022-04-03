#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const Stream = require('stream')
const { readlines } = require('./readlines-ng')

function exit(code) {
    console.log('./generate-snippets.js <directory> [output-file]')
    process.exit(code)
}
let dir = process.argv[2]
if (!dir) exit(1)

let stream
let outputFile = process.argv[3]
if (!outputFile) {
    stream = process.stdout
} else {
    stream = fs.createWriteStream(path.resolve(outputFile))
}

let ignoreDirectories = [
    'node_modules',
    '.gradle', 
    'temp',
    '.idea', 
    '.vscode',
    'target',
    'dist',
    '.DS_Store',
    'perf.data',
    'tags',
    '.env'
]
let snippets = {
    'rust': {},
    'objc': {},
    'swift': {},
    'cpp': {},
    'bash': {},
    'javascript': {},
    'csharp': {},
    'kotlin': {},
    'java': {}
}

getFiles(dir).then(() => {
    stream.write(JSON.stringify(snippets, null, 2))
})

function shouldParse(ext) {
    let language = ext
    switch (ext) {
        case 'rs':
            language = 'rust'
            break;
        case 'm':
            language = 'objc'
            break;
        case 'cs':
            language = 'csharp'
            break;
        case 'test.cpp':
            language = 'cpp'
            break;
        case 'spec.ts': 
            language = 'javascript'
            break;
        case 'kt':
            language = 'kotlin'
            break;
        case 'swift':
            language = 'swift'
            break;
        case 'java':
            language = 'java'
            break;
        case 'test.sh':
            language = 'bash'
            break;
        default:
            return null 
    }

    return language
}

let Commands = {
    START: '\/\/\\s?@ditto\/snippet-start\\s?(\\S+)\.*',
    END: '\/\/\\s?@ditto\/snippet-end\.*',
    IGNORE: '\/\/\\s?@ditto\/snippet-ignore-next-line\.*',
    INCLUDE: '\/\/\\s?@ditto\/snippet-include-next-line\.*'
}

async function generateSnippet(filename) {
    let ext = filename.split('.').slice(1).join('.')
    let language = shouldParse(ext)
    if (!language) return

    let snippet = {
        first: true,
        name: null,
        numLeadingWhispaceCharacters: 0,
        data: ''
    }

    let prev = null

    for await (let line of readlines(filename, { encoding: 'utf8' })) {
        if (!snippet.name) {
            // No current snippet
            let start = new RegExp(Commands.START).exec(line)
            if (start) {
                snippet.name = start[1]
                // If there is an existing snippet, append to the end of it
                let existing = snippets[language][snippet.name]
                if (existing) snippet.data = existing
            }
            continue
        }

        // In the middle of a snippet
        let end = new RegExp(Commands.END).exec(line)
        if (end) {
            snippets[language][snippet.name] = snippet.data + '\n\n'
            snippet.name = null
            snippet.data = ''
            snippet.first = true
            prev = line
            continue
        }

        // ignoring
        if (prev === Commands.IGNORE) {
            prev = null
            continue
        } else {
            let ignoreNext = new RegExp(Commands.IGNORE).exec(line)
            if (ignoreNext) {
                prev = Commands.IGNORE
                continue
            }
        }

        // including
        if (prev === Commands.INCLUDE) {
            prev = null
            line = line.replace('//', '') //remove coment at beginning of line
        } else {
            let includeNext = new RegExp(Commands.INCLUDE).exec(line)
            if (includeNext) {
                prev = Commands.INCLUDE
                continue
            }
        }

        // else, add the line like normal
        if (snippet.first) {
            let after = line.trim()
            snippet.numLeadingWhispaceCharacters = line.length - after.length
            snippet.first = false
        } else {
            snippet.data += '\n'
        }
        snippet.data += line.slice(snippet.numLeadingWhispaceCharacters)
    }

}

async function getFiles(dir) {
    if (ignoreDirectories.indexOf(dir) > -1) return
    let files = fs.readdirSync(dir, { withFileTypes: true })
    for (let file of files) {
        if (file.isDirectory()) await getFiles(path.resolve(dir, file.name))
        else {
            let filename = path.join(dir, file.name)
            await generateSnippet(filename)
        }
    }
}
