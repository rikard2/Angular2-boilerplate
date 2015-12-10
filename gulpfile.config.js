'use strict';
var GulpConfig = (function () {
    function gulpConfig() {

        // Prequisites
        this.source        = './src/';
        this.build         = './dist/';
        this.sourceApp     = this.source + 'app/';

        // Compile Paths
        this.tsOutputPath  = this.build  + '/js';
        this.allJavaScript = [this.build + '/js/**/*.js'];
        this.allTypeScript = this.source + '/**/*.ts';

        // Typings
        this.typings       = './tools/typings/';
        this.libraryTypeScriptDefinitions = './tools/typings/**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;