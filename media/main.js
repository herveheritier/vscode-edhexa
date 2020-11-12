/* eslint-disable semi */
/* eslint-disable no-undef */

const vscode = acquireVsCodeApi()

load = (buffer,size) => {
    deleteAllLines()
    let d=0, inc=parseInt(document.querySelector('#length').value)
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

// Handle messages sent from the extension to the webview

window.addEventListener('message', event => {
    let message = event.data
    console.log(message.command)
    if(message.command=='load') {
        configuration.charsetMode=message.mode
        pageOffset = message.content.offset
        pageSize = message.pageSize
        eof = message.content.eof
        if(charsets.findIndex((e)=>e==configuration.charsetMode)<0) {
            vscode.postMessage({ command:'alert', text: `encodage demandé invalide (${configuration.charsetMode})` })
            configuration.charsetMode = charsets[0]
        }
        document.querySelector('#charset').innerText = configuration.charsetMode
        load(message.content.data,message.content.size)
    } else if(message.command=='default') {
        console.log(message.content)
        configuration = { ...message.content, ...configuration }
    }
})

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

newLine = (lineContent="La nuit tous les chats sont gris, les souris aussi.") => {          

    var focused
    var lastCursorPosition

    let line = addline(incrementLineNumber())
    let ed = line.querySelector('.ed')
    let hi = ed.nextElementSibling
    let lo = hi.nextElementSibling
    let status = lo.nextElementSibling

    line.querySelectorAll(".high,.low,.status").forEach((div) => doDisplayMode(div) )

    doCharMode(status)

    ed.value = lineContent
    refresh(ed,hi,lo,status)

    ed.oninput = (e) => {
        ed.style.color='#9F9'
        //
        if(configuration.typeMode=='REPLACE' && e.inputType=="insertText" && selectionStart==selectionEnd) {
            ed.value = ed.value.substring(0,selectionStart+1) + ed.value.substring(selectionStart+2)
        }
        //
        let ln = parseInt(document.querySelector('#length').value)
        let l = ln - ed.value.length
        if(l>0) {
            ed.value = ed.value.concat("▪".repeat(l))
            hi.value = hi.value.substring(0,selectionStart).concat(hi.value.substring(selectionEnd+(selectionStart==selectionEnd ?1:0),ed.value.length)).concat("0".repeat(l+1))
            lo.value = lo.value.substring(0,selectionStart).concat(lo.value.substring(selectionEnd+(selectionStart==selectionEnd ?1:0),ed.value.length)).concat("0".repeat(l+1))
        } else {
            ed.value = ed.value.substring(0,ln)
        }
        //
        refreshCharset(ed,hi,lo,status)
        //
        let cp = selectionStart==selectionEnd ? selectionStart+1 : selectionStart+1
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
        if(e.key=='ArrowDown') {
            if(configuration.displayMode=='HEXA') {
                window.setTimeout(()=>{
                    hi.focus()
                    hi.setSelectionRange(cp,cp)
                },0)
            } else {
                let nextEd = ed.parentElement.parentElement.nextElementSibling.querySelector('.ed')
                window.setTimeout(()=>{
                    nextEd.focus()
                    nextEd.setSelectionRange(cp,cp)
                },0)    
            }
        }
        if(e.key=='ArrowUp') {
            if(configuration.displayMode=='HEXA') {
                let prevLo = ed.parentElement.parentElement.previousElementSibling.querySelector('.low')
                window.setTimeout(()=>{
                    prevLo.focus()
                    prevLo.setSelectionRange(cp,cp)
                },0)
            } else {
                let prevEd = ed.parentElement.parentElement.previousElementSibling.querySelector('.ed')
                window.setTimeout(()=>{
                    prevEd.focus()
                    prevEd.setSelectionRange(cp,cp)
                },0)    
            }
        }
        //
        if(e.key=='Insert') {
            let i = typeModes.findIndex(e=>e==configuration.typeMode)
            i = (i+1) % typeModes.length
            configuration.typeMode = typeModes[i]
            document.querySelectorAll('.ed').forEach(e => e.classList.toggle('replace'))
        }
        //
        /*if(typeMode=='REPLACE' && e.key!='Delete' && e.key!='Backspace' && e.key.length==1) {
            ed.value = ed.value.substring(0,selectionStart) + e.key + ed.value.substring(selectionStart+1)
        }*/
    }

    hi.oninput = (e) => {
        let cp = selectionEnd+1
        if(cp>parseInt(document.querySelector('#length').value) || "0123456789ABCDEF".indexOf(e.data.toUpperCase())==-1) {
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
        if(cp>parseInt(document.querySelector('#length').value) || "0123456789ABCDEF".indexOf(e.data.toUpperCase())==-1) {
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

document.querySelector('#charset').onclick = (e) => {
    // toogle charset
    let i = charsets.findIndex((e)=>e==configuration.charsetMode)
    i = (i+1) % charsets.length
    configuration.charsetMode = charsets[i]
    e.target.innerText = configuration.charsetMode
    //
    vscode.postMessage({ command:"refreshStatus", value: `${configuration.charMode} / ${configuration.charsetMode}` })
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

document.querySelector('#saveFile').onclick = (e) => {
    vscode.postMessage({ command:'save', content: String.fromCharCode.apply(null,extractBinaryBuffer())})   
}

document.querySelector('#newLine').onclick = (e) => {
    newLine()
}

doDisplayMode = (div) => {
    ([  ()=>div.classList.remove('hideElement'),
        ()=>div.classList.add('hideElement')   ][displays.findIndex((e)=>e==configuration.displayMode)])()
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
    load(extractBinaryBuffer()) 
    //
    document.documentElement.style.setProperty('--line-size',`${parseInt(e.target.value)+1}ch`)
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

document.querySelector('#charmode').onclick = (e) => {
    let i = charModes.findIndex((e)=>e==configuration.charMode)
    i=(i+1)%charModes.length
    configuration.charMode=charModes[i]
    e.target.innerText = configuration.charMode
    //
    vscode.postMessage({ command:"refreshStatus", value: `${configuration.charMode} / ${configuration.charsetMode}` })
    //
    doCharModeAll()
}

readBuffer = (position=offset) => {
    vscode.postMessage({ command:'readBuffer', content: { position:position, mode:configuration.charsetMode } } )  
}

document.querySelector('#next').onclick = (e) => {
    if(!eof) readBuffer(pageOffset + pageSize)    
}

document.querySelector('#prev').onclick = (e) => {
    let p = pageOffset - pageSize 
    readBuffer(p>0 ? p : 0)    
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

document.documentElement.style.setProperty('--line-size',`${parseInt(document.querySelector('#length').value)+1}ch`)

document.querySelector('#charmode').innerText = configuration.charMode
document.querySelector('#charset').innerText = configuration.charsetMode
vscode.postMessage({ command:"refreshStatus", value: `${configuration.charMode} / ${configuration.charsetMode}` })

vscode.postMessage({ command:'getDefault' })