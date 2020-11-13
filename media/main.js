/* eslint-disable semi */
/* eslint-disable no-undef */

const vscode = acquireVsCodeApi()

load = (buffer,size) => {
    deleteAllLines()
    let d=0, inc=configuration.recordSize //parseInt(document.querySelector('#length').value)
    let extract
    do {
        let f=d+inc
        f = f>size ? size : f
        extract = buffer.slice(d,f)
        if(extract.length>0) {
            let hexa = Array.from(extract).map(e=>"0123456789ABCDEF".charAt((e/16)>>0)+"0123456789ABCDEF".charAt(e%16))
            let a = hexa.reduce((a,v)=>{ a[0]+=v.substring(0,1); a[1]+=v.substring(1,2); return a },["",""])
            let nl = newLine()
            nl.hi.value=a[0]
            nl.lo.value=a[1]
            let ct = charsetToText(a[0],a[1])
            nl.ed.value = ct[0]
            nl.status.value = ct[1]
            d+=inc
        }
        offset+=extract.length
    } while(extract.length>0)
}    

//

updateBuffer = () => {
    let cs = []
    document.querySelectorAll('.lineBody').forEach((lb) => {
        let hi = lb.querySelector('.high').value
        let lo = lb.querySelector('.low').value
        let ln = hi.length
        for(let i=0;i<ln;i++) {
            cs.push('0123456789ABCDEF'.indexOf(hi[i])*16+'0123456789ABCDEF'.indexOf(lo[i]))
        }
    })
    vscode.postMessage({
        command:'updateBuffer',
        content: cs,
        size: cs.length,
        pageOffset: pageOffset,
        pageSize: pageSize
    })
}

//

loadMessageCustomer = (message) => {
    configuration.charsetMode=message.mode
    pageOffset = message.content.offset
    pageSize = message.pageSize
    eof = message.content.eof
    if(charsets.findIndex((e)=>e==configuration.charsetMode)<0) {
        vscode.postMessage({ command:'alert', text: `encodage demandé invalide (${configuration.charsetMode})` })
        configuration.charsetMode = charsets[0]
    }
    document.querySelector('#charset').innerText = configuration.charsetMode
    load(message.content.data,message.content.size-1)
}

defaultMessageCustomer = (message) => {
    configuration = { ...configuration, ...message.content }
    document.documentElement.style.setProperty('--line-size',`${configuration.recordSize+1}ch`)
    document.querySelector('#charmode').innerText = configuration.charMode
    document.querySelector('#charset').innerText = configuration.charsetMode
    vscode.postMessage({ command:"refreshCharModeStatus", value: `${configuration.charMode} / ${configuration.charsetMode}` })       
    readBuffer(0) 
}

refreshBinary = (ed,hi,lo,status) => {
    let decoded = charsetToText(hi.value,lo.value)
    ed.value = decoded[0]
    status.value = decoded[1]
}

refreshCharset = (ed,hi,lo,status) => {
    let decoded = textToCharset(ed.value,hi.value,lo.value)
    hi.value = decoded[0]
    lo.value = decoded[1]
    status.value = decoded[2]
}

refresh = (ed,hi,lo,status) => {
    if(configuration.charMode=='BINARY') {
        refreshBinary(ed,hi,lo,status)
    } else if(configuration.charMode=='CHARSET' || configuration.charsetMode=='MIXTE') {
        refreshCharset(ed,hi,lo,status)
    }
}

addline = (number) => {
    let c = document.querySelector('#line').content.cloneNode(true)
    c.querySelector('.lineNumber').innerText=("00000"+number).slice(-5)
    document.querySelector('#mainContent').appendChild(c)
    return document.querySelectorAll('.aline')[document.querySelectorAll('.aline').length-1]
}

initLine = (ed,hi,lo,status) => {
    hi.value = configuration.insignificantCharacter[0].repeat(configuration.recordSize)
    lo.value = configuration.insignificantCharacter[1].repeat(configuration.recordSize)
    refreshBinary(ed,hi,lo,status)
}

goEdPrev = (elt,pos) => {
    if(configuration.displayMode=='HEXA') {
        let prevLo = elt.parentElement.parentElement.previousElementSibling.querySelector('.low')
        window.setTimeout(()=>{
            prevLo.focus()
            prevLo.setSelectionRange(pos,pos)
        },0)
    } else {
        let prevEd = elt.parentElement.parentElement.previousElementSibling.querySelector('.ed')
        window.setTimeout(()=>{
            prevEd.focus()
            prevEd.setSelectionRange(pos,pos)
        },0)    
    }
}

goEdNext = (elt,pos) => {
    if(configuration.displayMode=='HEXA') {
        let nextHi = elt.parentElement.querySelector('.high')
        window.setTimeout(()=>{
            nextHi.focus()
            nextHi.setSelectionRange(pos,pos)
        },0)
    } else {
        let nextEd = elt.parentElement.parentElement.nextElementSibling.querySelector('.ed')
        window.setTimeout(()=>{
            nextEd.focus()
            nextEd.setSelectionRange(pos,pos)
        },0)    
    }        
}

newLine = (lineContent="La nuit tous les chats sont gris, les souris aussi.") => {          

    var focused
    var lastCursorPosition

    let line = addline(incrementLineNumber())
    let ed = line.querySelector('.ed')
    let hi = ed.nextElementSibling
    let lo = hi.nextElementSibling
    let status = lo.nextElementSibling

    line.querySelectorAll(".high,.low,.status").forEach((div) => doDisplayMode(div) )
    line.querySelectorAll('.ed').forEach(e => configuration.typeMode=='REPLACE' ? e.classList.add('replace') : e.classList.remove('replace') )

    doCharMode(status)

    initLine(ed,hi,lo,status)
    ed.value = lineContent.concat(ed.value.substring(lineContent.length))
    refresh(ed,hi,lo,status)

    ed.oninput = (e) => {
        //
        // attention, event dispatch after character insertion or suppression
        //
        ed.style.color='#9F9'
        //
        let cp = selectionStart==selectionEnd ? selectionStart+1 : selectionStart+1
        //
        // REPLACE mode without character selection = replace the character following the caret
        //
        if(configuration.typeMode=='REPLACE' && e.inputType=="insertText" && selectionStart==selectionEnd) {
            ed.value = ed.value.substring(0,selectionStart+1) + ed.value.substring(selectionStart+2)
            ed.value = ed.value.substring(0,configuration.recordSize)
        } else {
            let ln = configuration.recordSize //parseInt(document.querySelector('#length').value)
            let l = ln - ed.value.length
            if(l>0) {
                ed.value = ed.value.concat("▪".repeat(l))
                hi.value = hi.value.substring(0,selectionStart).concat(hi.value.substring(selectionEnd+(selectionStart==selectionEnd ?1:0),ed.value.length)).concat("0".repeat(l+1))
                lo.value = lo.value.substring(0,selectionStart).concat(lo.value.substring(selectionEnd+(selectionStart==selectionEnd ?1:0),ed.value.length)).concat("0".repeat(l+1))
            } else {
                if(configuration.insertMode=='LIMITED') {
                    if(hi.value.endsWith(configuration.insignificantCharacter[0]) && lo.value.endsWith(configuration.insignificantCharacter[1])) {
                        ed.value = ed.value.substring(0,ln)
                    } else {
                        ed.value = ed.value.substring(0,selectionStart).concat(ed.value.substring(selectionStart+1))
                        cp--
                    }
                } else if(configuration.insertMode=='LINE-LOOSE') {
                    ed.value = ed.value.substring(0,ln)
                } else if(configuration.insertMode=='PAGE-LOOSE') {
                    ed.value = ed.value.substring(0,ln)
                } else if(configuration.insertMode=='INSERT') {
                    ed.value = ed.value.substring(0,ln)
                }
            }
        }
        //
        refreshCharset(ed,hi,lo,status)
        //
        if(selectionStart==selectionEnd) {
            if(e.inputType=="deleteContentForward") cp-=1
            else if(e.inputType=="deleteContentBackward") cp-=2
        } else {
            if(e.inputType=="deleteContentForward") cp-=2
            else if(e.inputType=="deleteContentBackward") cp-=1
        }
        ed.setSelectionRange(cp,cp)
    }

    ed.onfocus = (e) => { 
        ed.style.color='#9F9'
        focused = ed
    }

    ed.onblur = (e) => {
        ed.style.color='#DDD'
        lastCursorPosition = document.getSelection().anchorOffset
        focused = lo
    }

    ed.onkeydown = (e) => {
        //
        selectionStart = ed.selectionStart
        selectionEnd = ed.selectionEnd
        //
        let cp = getCaretPosition(ed)
        if(e.key=='Tab') {
            if(e.shiftKey) {
                // set the caret at the end of the previous line
                goEdPrev(ed,999999)
            } else {
                // set the caret at the begining of the next line
                goEdNext(ed,0)
            }
        }
        if(e.key=='ArrowDown') {
            // set the caret at the same place of the next line
            goEdNext(ed,cp)
        }
        if(e.key=='ArrowUp') {
            // set the caret at the same place of the previous line
            goEdPrev(ed,cp)
        }
        //
        if(e.key=='Insert') {
            let i = typeModes.findIndex(e=>e==configuration.typeMode)
            i = (i+1) % typeModes.length
            configuration.typeMode = typeModes[i]
            document.querySelectorAll('.ed').forEach(e => e.classList.toggle('replace'))
        }
    }

    hi.oninput = (e) => {
        let cp = selectionEnd+1
        if(cp>configuration.recordSize || "0123456789ABCDEF".indexOf(e.data.toUpperCase())==-1) {        // configuration.recordSize = parseInt(document.querySelector('#length').value)
            hi.value = hi.value.substring(0,cp-1).concat(hi.value.substring(cp))
            hi.setSelectionRange(cp-1,cp-1)
        } else {
            let l = selectionEnd - selectionStart
            let s = e.data.toUpperCase().repeat(l>0?l:1)
            hi.value = hi.value.substring(0,selectionStart).concat(s).concat(hi.value.substring(selectionEnd-(l>0?l-1:-2)))
            let cs = charsetToText(hi.value,lo.value)
            ed.value = cs[0]
            status.value = cs[1]
            if(l==0) {
                lo.focus()
                lo.setSelectionRange(cp-1,cp-1)
            } else {
                hi.setSelectionRange(cp-1,cp-1)
            }
        }
    }

    hi.onfocus = (e) => {
        hi.style.color='#7B7'
        focused = hi
    }

    hi.onblur = (e) => {
        hi.style.color='#AAA'
        lastCursorPosition = document.getSelection().anchorOffset
        focused = undefined
    }

    hi.onkeydown = (e) => {
        //
        selectionStart = hi.selectionStart
        selectionEnd = hi.selectionEnd
        //
        if(e.key=='Delete') { e.preventDefault(); return }
        if(e.key=='Backspace') { e.preventDefault(); return }
        let cp = getCaretPosition(hi)
        if(e.key=='Tab') {
            if(e.shiftKey) {
                window.setTimeout(()=>{
                    ed.focus()
                    ed.setSelectionRange(99999,99999)
                },0)                
            } else {
                window.setTimeout(()=>{
                    lo.focus()
                    lo.setSelectionRange(0,0)
                },0)                
            }
        }
        if(e.key=='ArrowDown') {
            window.setTimeout(()=>{
                lo.focus()
                lo.setSelectionRange(cp,cp)
            },0)
        }
        if(e.key=='ArrowUp') {
            window.setTimeout(()=>{
                ed.focus()
                ed.setSelectionRange(cp,cp)
            },0)
        }
    }

    lo.oninput = (e) => {
        let cp = selectionEnd+1
        if(cp>configuration.recordSize || "0123456789ABCDEF".indexOf(e.data.toUpperCase())==-1) {       // configuration.recordSize = parseInt(document.querySelector('#length').value)
            lo.value = lo.value.substring(0,cp-1).concat(lo.value.substring(cp))
            lo.setSelectionRange(cp-1,cp-1)
        } else {
            let l = selectionEnd - selectionStart
            let s = e.data.toUpperCase().repeat(l>0?l:1)
            lo.value = lo.value.substring(0,selectionStart).concat(s).concat(lo.value.substring(selectionEnd-(l>0?l-1:-2)))
            let cs = charsetToText(hi.value,lo.value)
            ed.value = cs[0]
            status.value = cs[1]
            if(l==0) {
                hi.focus()
                hi.setSelectionRange(cp,cp)
            } else {
                lo.setSelectionRange(cp-1,cp-1)
            }
        }
    }

    lo.onfocus = (e) => {
        lo.style.color='#7B7'
        focused = lo
    }

    lo.onblur = (e) => {
        lo.style.color='#AAA'
        lastCursorPosition = document.getSelection().anchorOffset
        focused = undefined
    }

    lo.onkeydown = (e) => {
        //
        selectionStart = lo.selectionStart
        selectionEnd = lo.selectionEnd
        //
        if(e.key=='Delete') { e.preventDefault(); return }
        if(e.key=='Backspace') { e.preventDefault(); return }
        let cp = getCaretPosition(lo)
        if(e.key=='Tab') {
            if(e.shiftKey) {
                window.setTimeout(()=>{
                    hi.focus()
                    hi.setSelectionRange(99999,99999)
                },0)                
            } else {
                let nextEd = lo.parentElement.parentElement.nextElementSibling.querySelector('.ed')
                if(nextEd) {
                    window.setTimeout(()=>{
                        nextEd.focus()
                        nextEd.setSelectionRange(0,0)
                    },0)
                }             
            }
        }
        if(e.key=='ArrowUp') {
            window.setTimeout(()=>{
                hi.focus()
                hi.setSelectionRange(cp,cp)
            },0)
        }
        if(e.key=='ArrowDown') {
            let nextEd = lo.parentElement.parentElement.nextElementSibling.querySelector('.ed')
            if(nextEd) {
                window.setTimeout(()=>{
                    nextEd.focus()
                    nextEd.setSelectionRange(cp,cp)
                },0)
            }
        }
    }    

    return {ed:ed,hi:hi,lo:lo,status}

}

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

extractBinaryBuffer = () => {
    let codes = []
    let all = document.querySelectorAll('.ed')
    let len = all.length
    for(var e=0;e<len;e++) {
        let ed = all[e]
        let hitag = ed.nextElementSibling
        let lotag = hitag.nextElementSibling
        let hi = hitag.value
        let lo = lotag.value
        let long = hi.length
        for(var i=0;i<long;i++)
        codes.push(parseInt(hi.charAt(i)+lo.charAt(i),16))
    }
    return new Uint8Array(codes)
}

doDisplayMode = (div) => {
    ([  ()=>div.classList.remove('hideElement'),
        ()=>div.classList.add('hideElement')   ][displays.findIndex((e)=>e==configuration.displayMode)])()
}

doCharMode = (div) => {
    if(configuration.charMode=='BINARY' || configuration.charMode=='CHARSET') {
        div.classList.add('hideStatus')
    } else if(configuration.charMode=='MIXTE') {
        div.classList.remove('hideStatus')
    }
}

doCharModeAll = () => {
    document.querySelectorAll(".status").forEach((div)=> doCharMode(div))
}

readBuffer = (position=offset) => {
    vscode.postMessage({ command:'readBuffer', content: { position:position, mode:configuration.charsetMode } } )  
}

document.querySelector('#charset').onclick = (e) => {
    // toogle charset
    let i = charsets.findIndex((e)=>e==configuration.charsetMode)
    i = (i+1) % charsets.length
    configuration.charsetMode = charsets[i]
    e.target.innerText = configuration.charsetMode
    //
    vscode.postMessage({ command:"refreshCharModeStatus", value: `${configuration.charMode} / ${configuration.charsetMode}` })
    // update display
    let all = document.querySelectorAll('.ed')
    let len = all.length
    for(let e=0;e<len;e++) {
        let ed = all[e]
        let hi = ed.nextElementSibling
        let lo = hi.nextElementSibling
        refresh(ed,hi,lo,status)            
    }
}

document.querySelector('#saveFile').onclick = (e) => {
    vscode.postMessage({ command:'save', content: String.fromCharCode.apply(null,extractBinaryBuffer())})   
}

document.querySelector('#newLine').onclick = (e) => {
    newLine()
}

document.querySelector('#split').onclick = (e) => {
    // toogle display mode
    let i = displays.findIndex((e)=>e==configuration.displayMode)
    i = (i+1) % displays.length
    configuration.displayMode = displays[i]
    //
    document.querySelectorAll(".high,.low,.status").forEach((div) => doDisplayMode(div) )
}

document.querySelector('#length').onchange = (e) => {
    let recordSize = parseInt(e.target.value)
    configuration.recordSize = recordSize
    document.documentElement.style.setProperty('--line-size',`${recordSize+1}ch`)
    //
    load(extractBinaryBuffer()) 
    //

}

document.querySelector('#charmode').onclick = (e) => {
    let i = charModes.findIndex((e)=>e==configuration.charMode)
    i=(i+1)%charModes.length
    configuration.charMode=charModes[i]
    e.target.innerText = configuration.charMode
    //
    vscode.postMessage({ command:"refreshCharModeStatus", value: `${configuration.charMode} / ${configuration.charsetMode}` })
    //
    doCharModeAll()
}

//
// navigation buttons
//

document.querySelector('#next').onclick = (e) => {
    updateBuffer()
    if(!eof) readBuffer(pageOffset + pageSize)    
}

document.querySelector('#prev').onclick = (e) => {
    let p = pageOffset - pageSize 
    readBuffer(p>0 ? p : 0)    
}

//
// Handle messages sent from the extension to the webview
//

window.onmessage = (event) => {
    let message = event.data
    switch(message.command) {
        case 'load':
            loadMessageCustomer(message)
            break
        case 'default':
            defaultMessageCustomer(message)
            break
        case 'stats':
            console.log(message.content)
            break
        case 'ready':
            vscode.postMessage({ command:'getDefault' })
            break
    }
}


/****************************************************
 *                       MAIN                       *
 ****************************************************/

var lineNumber = 0
var offset = 0
var pageOffset = 0
var pageSize = 0
var eof = false
var selectionStart = 0
var selectionEnd = 0
var shift = false

vscode.postMessage({ command:'getReady' })
