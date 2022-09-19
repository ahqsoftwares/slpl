const compile = require("./methods/compile");
let error: Function = (msg: String) => {

};

/**
 * The Simple Level Programming Language Code Structurer
 */
class SlPl {
         mainCode: string;
         sub: object;
         /**
          * Creates the structurer
          * @param {string} main
          * @param {object} functions
          * @param {Function} callback 
          */
         constructor(main: string, functions: object, callback: Function) {
                  error = callback;
                  this.mainCode = main;
                  this.sub = functions;
         }

         /**
          * Compiles code to javascript
          */
         compile() {

         }
}

module.exports = SlPl;