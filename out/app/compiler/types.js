"use strict";
module.exports = {
    "BOOLEAN": "\"{data}\" === \"true\"",
    "NUMBER": "Number(\"{data}\")",
    "STRING": "String(\"{data}\")",
    "JSON": "JSON.parse(`{data}`)",
    "FUNCTION": "String(\"{data}\")"
};
