type args = Array<string>;

module.exports = function Parse(args: args) {
         let data: any = {
                  "_bin": []
         }

         for (let i: number = 0; i < args.length; i++) {
                  const arg = args[i];
                  if (arg.startsWith("-")) {
                           switch (arg.startsWith("--")) {
                                    case true:
                                             data[arg] = true;
                                             break;
                                    default:
                                             data[arg] = args[i + 1] || false;
                                             i++;
                                             break;
                           }
                  } else {
                           data["_bin"].push(arg);
                  }
         }
         return data;
}