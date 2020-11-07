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
            nl.hi.innerText=a[0]
            nl.lo.innerText=a[1]
            let ct = charsetToText(a[0],a[1])
            nl.ed.innerText = ct[0]
            nl.status.innerText = ct[1]
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

    let line = addline(incrementLineNumber())
    let ed = line.querySelector('.ed')
    let hi = ed.nextElementSibling
    let lo = hi.nextElementSibling
    let status = lo.nextElementSibling

    line.querySelectorAll(".high,.low,.status").forEach((div) => doDisplayMode(div) )

    doCharMode(status)

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

    hi.oninput = (e) => {
        let decoded = textToCharset(ed.innerText,hi.innerText,lo.innerText)
        let res = meca(e.target,e,decoded[0],lastCursorPosition)
        if(res>-1) {
            let cs = charsetToText(hi.innerText,lo.innerText)
            ed.innerText = cs[0]
            status.innerText = cs[1]
            setCursorPosition(lo,document.getSelection().anchorOffset-1)
        }
    }

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

    hi.onkeydown = (e) => {
        if(e.key=='ArrowDown') {
            e.stopPropagation()
            setCursorPosition(lo,lastCursorPosition)
        }
        /*
        let action = ['ArrowLeft','ArrowRight'].findIndex(a=>a==e.key)
        if(action!==-1) {
            ([()=>lastCursorPosition--,()=>lastCursorPosition++][action])()
            console.log(lastCursorPosition)
        }
        */
    }

    lo.oninput = (e) => {
        let decoded = textToCharset(ed.innerText,hi.innerText,lo.innerText)
        let res = meca(e.target,e,decoded[1],lastCursorPosition)
        if(res>-1) {
            let cs = charsetToText(hi.innerText,lo.innerText)
            ed.innerText = cs[0]
            status.innerText = cs[1]
            setCursorPosition(hi,document.getSelection().anchorOffset)
        }
    }

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
        let hi = hitag.innerText
        let lo = lotag.innerText
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

