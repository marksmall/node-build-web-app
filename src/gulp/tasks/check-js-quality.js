"use strict";

import AbstractTaskLoader from "../abstractTaskLoader";
import config from "../config";
//import utils from "../utils";

import jshint from "gulp-jshint";
import browserSync from "browser-sync";
//import debug from "gulp-debug";

class CheckJsQualityTaskLoader extends AbstractTaskLoader {

    registerTask(gulp){
        super.registerTask(gulp);

        gulp.task("check-js-quality", "Check JavaScript code quality using JSHint", () =>{
            // If the app src folder is overridden, then append it to the watch list, otherwise use default.
            let src = null;

            if(gulp.options.folders){
                src = [ gulp.options.folders.app + config.globs.scripts.javascript ];
            } else{
                src = config.javascript.src;
            }

            return gulp.plumbedSrc(// handle errors nicely (i.e., without breaking watch)
                src
                )

                // Display the files in the stream
                //.pipe(debug({title: 'Stream contents:', minimal: true}))

                // Force BrowserSync reload
                .pipe(browserSync.reload({
                    stream: true,
                    once: true
                }))

                // Run JSHint
                .pipe(jshint())

                // Generate a stylish report
                .pipe(jshint.reporter("jshint-stylish"));

            // Fail the build only if BrowserSync is not active
            // Actually, failing the build is counter-productive thus evil
            //.pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
        });
    }
}

module.exports = new CheckJsQualityTaskLoader();
