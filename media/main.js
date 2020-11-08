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
    charsetMode=message.mode
    if(charsets.findIndex((e)=>e==charsetMode)<0) {
        vscode.postMessage({ command:'alert', text: `encodage demandé invalide (${charsetMode})` })
        charsetMode = charsets[0]
    }
    document.querySelector('#charset').innerText = charsetMode
    load(message.content.data,message.content.size)
})

refresh = (ed,hi,lo,status) => {
    let decoded = textToCharset(ed.value,hi.value,lo.value)
    hi.value = decoded[0]
    lo.value = decoded[1]
    status.value = decoded[2]
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
        refresh(ed,hi,lo,status)
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
        let cp = getCaretPosition(ed)
        if(e.key=='ArrowDown') {
            window.setTimeout(()=>{
                hi.focus()
                hi.setSelectionRange(cp,cp)
            },0)
        }
        if(e.key=='ArrowUp') {
            let prevLo = ed.parentElement.parentElement.previousElementSibling.querySelector('.low')
            window.setTimeout(()=>{
                prevLo.focus()
                prevLo.setSelectionRange(cp,cp)
            },0)
        }
        
    }

    hi.oninput = (e) => {
        let cp = getCaretPosition(hi)
        if("0123456789ABCDEF".indexOf(e.data.toUpperCase())==-1) {
            hi.value = hi.value.substring(0,cp-1).concat(hi.value.substring(cp))
            hi.setSelectionRange(cp-1,cp-1)
        } else {
            hi.value = hi.value.substring(0,cp-1).concat(e.data.toUpperCase()).concat(hi.value.substring(cp+1))
            let cs = charsetToText(hi.value,lo.value)
            ed.value = cs[0]
            status.value = cs[1]
            lo.focus()
            lo.setSelectionRange(cp-1,cp-1)
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
        let cp = getCaretPosition(lo)
        if("0123456789ABCDEF".indexOf(e.data.toUpperCase())==-1) {
            lo.value = lo.value.substring(0,cp-1).concat(lo.value.substring(cp))
            lo.setSelectionRange(cp-1,cp-1)
        } else {
            lo.value = lo.value.substring(0,cp-1).concat(e.data.toUpperCase()).concat(lo.value.substring(cp+1))
            let cs = charsetToText(hi.value,lo.value)
            ed.value = cs[0]
            status.value = cs[1]
            hi.focus()
            hi.setSelectionRange(cp,cp)
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
        ()=>div.classList.add('hideElement')   ][displays.findIndex((e)=>e==displayMode)])()
}

document.querySelector('#split').onclick = (e) => {
    // toogle display mode
    let i = displays.findIndex((e)=>e==displayMode)
    i = (i+1) % displays.length
    displayMode = displays[i]
    //
    document.querySelectorAll(".high,.low,.status").forEach((div) => doDisplayMode(div) )
}

document.querySelector('#length').onchange = (e) => {
    load(extractBinaryBuffer()) 
}


doCharMode = (div) => {
    if(charMode=='BINARY' || charMode=='CHARSET') {
        div.classList.add('hideStatus')
    } else if(charMode=='MIXTE') {
        div.classList.remove('hideStatus')
    }
}

doCharModeAll = () => {
    document.querySelectorAll(".status").forEach((div)=> doCharMode(div))
}

document.querySelector('#charmode').onclick = (e) => {
    let i = charModes.findIndex((e)=>e==charMode)
    i=(i+1)%charModes.length
    charMode=charModes[i]
    e.target.innerText = charMode
    //
    doCharModeAll()
}

readBuffer = () => {
    vscode.postMessage({ command:'readBuffer', content: { position:offset } } )  
}

document.querySelector('#next').onclick = (e) => {
    readBuffer()    
}

/****************************************************
 *                       MAIN                       *
 ****************************************************/

var lineNumber = 0
var offset = 0

document.querySelector('#charmode').innerText = charMode

