/* eslint-disable semi */
/* eslint-disable no-undef */

/**
 * Chargement d'un fichier externe
 * @param {String} _file							nom du fichier
 * @param {callback} _exploitFn						fonction de callback appliqué sur le fichier lu
 */
getExternalFile = function(_file,_exploitFileFn) {
    var reader = new FileReader();
    reader.onload = function() {
        _exploitFileFn(this.result);
    };
    reader.readAsArrayBuffer(_file);
};

getCaretPosition = (inputField) => {
    ////////////////////////////////////////////////////////////////////////////////////////
    // https://www.codegrepper.com/code-examples/javascript/get+caret+position+javascript
    // javascript by Grieving Gemsbok on Jun 23 2020 
    ////////////////////////////////////////////////////////////////////////////////////////
    const startPos = inputField.selectionStart;
    const endPos = inputField.selectionEnd;
    const dir = inputField.selectionDirection;
    if (startPos === endPos) {
      return startPos;
    }
    if (dir === "forward") {
      return endPos;
    } else {
      return startPos;
    }
}   

logme = (e) => document.querySelector('#logme').innerText = e

logmr = (e) => document.querySelector('#logme').innerText += '\n'+e

utilsCalled = () => { return "utils a été appelé"}
