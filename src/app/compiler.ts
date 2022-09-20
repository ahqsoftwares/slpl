const compile = require("./methods/compile");
const path = require("path");
let error: Function = (msg: String) => {

};

/**
 * The Simple Level Programming Language Code Structurer
 */
module.exports = class SlPl {
         out: string;
         /**
          * Creates the structurer
          * @param {string} main
          * @param {object} functions
          * @param {Function} callback 
          */
         constructor(out: string, callback: Function) {
                  error = callback;
                  this.out = out;
         }

         /**
          * Compiles code to javascript
          * @param {string} data code for the main file
          */
         compileIndex(data: string) {
                  return compile(data, error);
         }

         /**
          * Compiles a function to plain javascript
          * @param {string} fn code for function
          */
          compileFn(fn: string) {

         }

         /**
          * Compiles package.slpl to package.json
          * @param {string} packageFile packge.slpl code
          */
         compilePackage(packageFile: string) {

         }

         /**
          * Add an asset to the out dir
          * @param path 
          */
         addAssets(path: string) {

         }
}