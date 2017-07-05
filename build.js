'use strict';

const fs = require('fs');
const concat = require('concat');
const recursive = require('recursive-readdir');
const UglifyJS = require('uglify-js');
const ngAnnotate = require('ng-annotate');

let options = {
    path: './app',
    output: './assets/js/app.js',
    uglify: {
        mangle: {
            toplevel: true
        },
        output: {
            beautify: false
        }
    }
};

recursive(options.path, (err, files) => {

    files = files.filter((file) => file.endsWith('.js'));

    console.log(files);

    concat(files).then((result) => {

        result = ngAnnotate(result, { add: true }).src;
        result = UglifyJS.minify(result, options.uglify);

        if(result.error){
            console.log('Fuck you error');
            console.log(error);
        }

        result = result.code;

        fs.writeFileSync(options.output, result);

        console.log('Done!');
    });
});
