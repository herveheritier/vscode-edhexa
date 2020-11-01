/* eslint-disable semi */
/* eslint-disable no-undef */
// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {

    const vscode = acquireVsCodeApi()

    load = (inta) => {
        deleteAllLines()
        let d=0, inc=48
        let extract
        do {
            extract = inta.slice(d,d+inc)
            if(extract.length>0) {
                let hexa = Array.from(extract).map(e=>"0123456789ABCDEF".charAt((e/16)>>0)+"0123456789ABCDEF".charAt(e%16))
                let a = hexa.reduce((a,v)=>{ a[0]+=v.substring(0,1); a[1]+=v.substring(1,2); return a },["",""])
                let nl = newLine()
                nl.hi.innerText=a[0]
                nl.lo.innerText=a[1]
                let ct = charsetToText(a[0],a[1])
                nl.ed.innerText = ct[0]
                nl.status.innerText = ct[1]
                d+=inc
            }
        } while(extract.length>0)
    }    

    // Handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        let message = event.data
        console.log(message.command)
        charsetMode=message.mode
        if(charsets.findIndex((e)=>e==charsetMode)<0) {
            vscode.postMessage({ command:'alert', text: `encodage demandé invalide (${charsetMode})` })
            charsetMode = charsets[0]
        }
        document.querySelector('#charset').innerText = charsetMode
        load(message.content.data,message.mode)
    })

    vscode.postMessage({ command:'info', text: 'I\'m in !' })

    refresh = (ed,hi,lo,status) => {
        let decoded = textToCharset(ed.innerText,hi.innerText,lo.innerText)
        hi.innerText = decoded[0]
        lo.innerText = decoded[1]
        status.innerText = decoded[2]
    }

    meca = (div,event,textBefore,cp) => {

        let code = -1

        if(event.inputType=="insertText") code = "0123456789ABCDEF".indexOf(event.data.toUpperCase())
        
        let ele = event.target
        let rng = document.createRange()
        let sel = document.getSelection()
        let anc = sel.anchorOffset

        let long = textBefore.length

        if(anc>long) code=-1

        let len = div.innerText.length
        let deb = div.innerText.substring(0,anc-1)
        let fin = len<=long ? div.innerText.substring(anc-1,len) : div.innerText.substring(anc,len)

        if(code==-1) {
            div.innerText=textBefore
            if(event.inputType=="insertParagraph") rng.setStart(ele.childNodes[0],cp)
            else rng.setStart(ele.childNodes[0],anc-1)
        } else {
            div.innerText=deb.concat(event.data.toUpperCase()).concat(fin.substring(1))
            rng.setStart(ele.childNodes[0],anc)
        }

        rng.collapse(true)
        sel.removeAllRanges()
        sel.addRange(rng)
        ele.focus()

        div.style.color='#F99'

        return code

    }

    ins = (div,anc,char) => {

        let len = div.innerText.length
        let deb = div.innerText.substring(0,anc-1)
        let fin = div.innerText.substring(anc-1,len)
        div.innerText=deb.concat(char).concat(fin)

    }

    addline = (number) => {
        let c = document.querySelector('#line').content.cloneNode(true)
        c.querySelector('.lineNumber').innerText=("00000"+number).slice(-5)
        document.querySelector('#mainContent').appendChild(c)
        return document.querySelectorAll('.aline')[document.querySelectorAll('.aline').length-1]
    }

    setCursorPosition = (element,pos) => {
        let rng = document.createRange()
        rng.setStart(element.childNodes[0],pos)
        rng.collapse(true)
        let sel = document.getSelection()
        sel.removeAllRanges()
        sel.addRange(rng)
    }

    newLine = (lineContent="La nuit tous les chats sont gris, les souris aussi.") => {          

        var focused
        var lastCursorPosition
    
        let ed = addline(incrementLineNumber()).querySelector('.ed')
        let hi = ed.nextElementSibling
        let lo = hi.nextElementSibling
        let status = lo.nextElementSibling
        
        ed.innerText = lineContent
        refresh(ed,hi,lo,status)
    
        ed.oninput = (e) => {
            ed.style.color='#9F9'
            refresh(ed,hi,lo,status)
        }
    
        ed.onfocus = (e) => { 
            ed.style.color='#9F9'
            setCursorPosition(ed,lastCursorPosition)
            focused = ed
        }
    
        ed.onblur = (e) => {
            ed.style.color='#DDD'
            lastCursorPosition = document.getSelection().anchorOffset
            focused = lo
        }
    
        hi.addEventListener("input",e => {
            let decoded = textToCharset(ed.innerText,hi.innerText,lo.innerText)
            let res = meca(e.target,e,decoded[0],lastCursorPosition)
            if(res>-1) {
                let cs = charsetToText(hi.innerText,lo.innerText)
                ed.innerText = cs[0]
                status.innerText = cs[1]
                setCursorPosition(lo,document.getSelection().anchorOffset-1)
            }
        },false)
    
        hi.onfocus = (e) => {
            hi.style.color='#7B7'
            setCursorPosition(hi,lastCursorPosition)
            focused = hi
        }
    
        hi.onblur = (e) => {
            hi.style.color='#AAA'
            lastCursorPosition = document.getSelection().anchorOffset
            focused = undefined
        }
    
        lo.addEventListener("input",e => {
            let decoded = textToCharset(ed.innerText,hi.innerText,lo.innerText)
            let res = meca(e.target,e,decoded[1],lastCursorPosition)
            if(res>-1) {
                let cs = charsetToText(hi.innerText,lo.innerText)
                ed.innerText = cs[0]
                status.innerText = cs[1]
                setCursorPosition(hi,document.getSelection().anchorOffset)
            }
        },false)
    
        lo.onfocus = (e) => {
            lo.style.color='#7B7'
            setCursorPosition(lo,lastCursorPosition)
            focused = lo
        }
    
        lo.onblur = (e) => {
            lo.style.color='#AAA'
            lastCursorPosition = document.getSelection().anchorOffset
            focused = undefined
        }
    
        hi.onkeydown = (e) => {
            let action = ['ArrowLeft','ArrowRight'].findIndex(a=>a==e.key)
            if(action!==-1) {
                ([()=>lastCursorPosition--,()=>lastCursorPosition++][action])()
                console.log(lastCursorPosition)
            }
        }
    
        return {ed:ed,hi:hi,lo:lo,status}
    
    }
    

    //

    document.addEventListener('click', event => {
        let node = event && event.target;
        while (node) {
            if (node.id && node.id === 'split') {
                // Handle click here by posting data back to VS Code
                // for your extension to handle
                vscode.postMessage({ command:'info', text: 'click on split' })
                document.querySelectorAll(".high,.low,.status").forEach((div)=>div.classList.toggle("visibleElement"))
                event.preventDefault();
                return;
            }
            node = node.parentNode;
        }
    }, true);

    //


    document.addEventListener('click', e => {
        let node = event && event.target;
        while (node) {
            if (node.id && node.id === 'charset') {
                // Handle click here by posting data back to VS Code
                // for your extension to handle
                event.preventDefault();

                vscode.postMessage({ command:'info', text: 'click on charset' })

                // toogle charset
                let i = charsets.findIndex((e)=>e==charsetMode)
                i = (i+1) % charsets.length
                charsetMode = charsets[i]
                e.target.innerText = charsetMode
                // update display
                let all = document.querySelectorAll('.ed')
                let len = all.length
                for(let e=0;e<len;e++) {
                    let ed = all[e]
                    let hi = ed.nextElementSibling
                    let lo = hi.nextElementSibling
                    refresh(ed,hi,lo,status)            
                }

                return;
            }
            node = node.parentNode;
        }
    }, true);

/****************************************************
 *                       MAIN                       *
 ****************************************************/

    var lineNumber = 0

    incrementLineNumber = () => {
        lineNumber++
        return lineNumber
    }

    deleteAllLines = () => {
        while(document.querySelectorAll('.aline').length>0) {
            let elt = document.querySelector('.aline')
            elt.parentElement.removeChild(elt)
        } 
        lineNumber = 0
    }


    loadBinaryBuffer = () => {
        var o = document.querySelector('#openFile');
        o.multiple = "";
        o.value = null;
        o.onchange = (e) => {
            var file = e.target.files[0];
            getExternalFile(
                file,
                function(fileName) {
                    return function(content) {
                        deleteAllLines()
                        let inta = new Uint8Array(content)
                        let d=0, inc=48
                        let extract
                        do {
                            extract = inta.subarray(d,d+inc)
                            if(extract.length>0) {
                                let hexa = Array.from(extract).map(e=>"0123456789ABCDEF".charAt((e/16)>>0)+"0123456789ABCDEF".charAt(e%16))
                                let a = hexa.reduce((a,v)=>{ a[0]+=v.substring(0,1); a[1]+=v.substring(1,2); return a },["",""])
                                let nl = newLine()
                                nl.hi.innerText=a[0]
                                nl.lo.innerText=a[1]
                                let ct = charsetToText(a[0],a[1])
                                nl.ed.innerText = ct[0]
                                nl.status.innerText = ct[1]
                                d+=inc
                            }
                        } while(extract.length>0)
                    }
                }(file.name)
            )
        }
    }

    document.addEventListener('click', event => {
        let node = event && event.target;
        while (node) {
            if (node.id && node.id === 'openFile') {
                // Handle click here by posting data back to VS Code
                // for your extension to handle
                event.preventDefault();
                vscode.postMessage({ command:'info', text: 'click on openFile' })
                loadBinaryBuffer()
                return;
            }
            node = node.parentNode;
        }
    }, true);

    extractBinaryBuffer = () => {
        let codes = []
        let all = document.querySelectorAll('.ed')
        let len = all.length
        for(var e=0;e<len;e++) {
            let ed = all[e]
            let hitag = ed.nextElementSibling
            let lotag = hitag.nextElementSibling
            let hi = hitag.innerText
            let lo = lotag.innerText
            let long = hi.length
            for(var i=0;i<long;i++)
            codes.push(parseInt(hi.charAt(i)+lo.charAt(i),16))
       }
       return new Uint8Array(codes)
    }

    doSave = () => {
        //let buf = Array.from(all).map(e => e.innerText)
        let buf = extractBinaryBuffer()
        var a = document.createElement("a")
        var blob = new Blob([buf], {"type":"binary"});
        a.href = window.URL.createObjectURL(blob);
        a.download = "save.txt";
        a.click();
    }

    document.addEventListener('click', event => {
        let node = event && event.target;
        while (node) {
            if (node.id && node.id === 'saveFile') {
                // Handle click here by posting data back to VS Code
                // for your extension to handle
                event.preventDefault();
                vscode.postMessage({ command:'info', text: 'click on saveFile' })
                vscode.postMessage({ command:'save', content: String.fromCharCode.apply(null,extractBinaryBuffer())})
                //doSave()
                return;
            }
            node = node.parentNode;
        }
    }, true);    

    // création de 10 lignes

    vscode.postMessage({ command:'info', text: eatCalled() })
    vscode.postMessage({ command:'info', text: baseCalled() })
    vscode.postMessage({ command:'info', text: utilsCalled() })

    document.addEventListener('click', event => {
        let node = event && event.target;
        while (node) {
            if (node.id && node.id === 'newLine') {
                // Handle click here by posting data back to VS Code
                // for your extension to handle
                event.preventDefault();
                vscode.postMessage({ command:'info', text: 'click on newLine' })
                newLine()
                return;
            }
            node = node.parentNode;
        }
    }, true)


}());
