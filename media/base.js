/* eslint-disable no-undef */
/* eslint-disable semi */

baseCalled = () => { return "base a été appelé"}

var charsets = ["ASCII","EBCDIC"]
var charsetMode = charsets[0]


textToAscii = (text,hi,lo) => {
    let l = text.length
    let high = ''
    let low = ''
    let status = ''
    for(let i=0;i<l;i++) {
        /*
        let code = "00".concat(text.charCodeAt(i).toString(16).toUpperCase()).slice(-2)
        high+=code.substring(0,1)
        low+=code.substring(1)
        */
        let ea = get_ASCII_eat_from_char(text.charAt(i))
        high+= ea ? ea.hex.substring(0,1) : hi.charAt(i)
        low+= ea ? ea.hex.substring(1) : lo.charAt(i)
        status+=ea ? ea.ascii.visible==true ? '□' : '■' : '■'
    }
    return [high,low,status]
}

asciiToText = (high,low) => {
    let l = high.length
    let text = ''
    let status = ''
    for(let i=0;i<l;i++) {
        let hc = high.substring(i,i+1)
        let lc = low.substring(i,i+1)
        if("0123456789ABCDEF".indexOf(hc)==-1 || "0123456789ABCDEF".indexOf(lc)==-1) {
            text+="▪" //"░▒▓■▪▫●♦█☼□" //String.fromCharCode(191)
            status+='■'
        } else {
            let ea = get_ASCII_eat_from_hexa(hc.concat(lc))
            if(ea.ascii.visible==false) {
                text+="▪"
                status+='■'
            } else {
                text+=String.fromCharCode(parseInt(hc.concat(lc),16))
                status+='□'
            }
        }
    }
    return [text,status]
}

textToEbcdic = (text,hi,lo) => {
    let l = text.length
    let high = ''
    let low = ''
    let status = ''
    for(let i=0;i<l;i++) {
        let code = "00".concat(get_EBCDIC_hexa(text.charAt(i))).slice(-2)
        /*
        let code = "00".concat(text.charCodeAt(i).toString(16).toUpperCase()).slice(-2)
        high+=code.substring(0,1)
        low+=code.substring(1)
        */
        let ea = get_EBCDIC_eat_from_char(text.charAt(i))
        high+= ea ? ea.hex.substring(0,1) : hi.charAt(i)
        low+= ea ? ea.hex.substring(1) : lo.charAt(i)
        status+=ea ? ea.ebcdic.visible==true ? '□' : '■' : '■'
    }
    return [high,low,status]
}

ebcdicToText = (high,low) => {
    let l = high.length
    let text = ''
    let status = ''
    for(let i=0;i<l;i++) {
        let hc = high.substring(i,i+1)
        let lc = low.substring(i,i+1)
        if("0123456789ABCDEF".indexOf(hc)==-1 || "0123456789ABCDEF".indexOf(lc)==-1) {
            text+="▪" //"░▒▓■▪▫●♦█☼□" //String.fromCharCode(191)
        } else {
            //text+=get_EBCDIC_char(hc.concat(lc))
            let ea = get_EBCDIC_eat_from_hexa(hc.concat(lc))
            if(ea.ebcdic.visible==false) {
                text+="▪"
                status+='■'
            } else {
                text+=ea.ebcdic.char
                status+='□'
            }
        }
    }
    return [text,status]
}

textToCharset = (text,high,low) => {
    return ([textToAscii,textToEbcdic][charsets.findIndex((e)=>e==charsetMode)])(text,high,low)
}

charsetToText = (high,low) => {
    return ([asciiToText,ebcdicToText][charsets.findIndex((e)=>e==charsetMode)])(high,low)
}

