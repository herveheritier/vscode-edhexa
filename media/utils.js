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



utilsCalled = () => { return "utils a été appelé"}
