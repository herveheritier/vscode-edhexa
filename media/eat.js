/* eslint-disable semi */
/* eslint-disable no-undef */

eatCalled = () => { return "eat a été appelé"}

get_EBCDIC_hexa = (char) => { 
	let ea = eat.find((e)=>e.ebcdic.char==char)
	return ea ? ea.hex : undefined
}

get_EBCDIC_char = (hexa) => eat.find((e)=>e.hex==hexa).ebcdic.char

get_ASCII_hexa = (char) => {
	let ea = eat.find((e)=>e.ascii.char==char)
	return ea ? ea.hex : undefined
}

get_ASCII_char = (hexa) => eat.find((e)=>e.hex==hexa).ascii.char

get_ASCII_eat_from_char = (char) => eat.find((e)=>e.ascii.char==char)

get_EBCDIC_eat_from_char = (char) => eat.find((e)=>e.ebcdic.char==char)

get_ASCII_eat_from_hexa = (hexa) => eat.find((e)=>e.hex==hexa)

get_EBCDIC_eat_from_hexa = get_ASCII_eat_from_hexa

eat = [
    {
        "hex": "00",
        "ebcdic": {
            "value": "Null",
            "visible": false,
            "char": "▫",
            "ascii": "00"
        },
        "ascii": {
            "value": "Null",
            "visible": false,
            "char": "▫",
            "ebcdic": "00"
        }
    },
    {
        "hex": "01",
        "ebcdic": {
            "value": "SOH",
            "visible": false,
            "char": "▫",
            "ascii": "01"
        },
        "ascii": {
            "value": "SOH",
            "visible": false,
            "char": "▫",
            "ebcdic": "01"
        }
    },
    {
        "hex": "02",
        "ebcdic": {
            "value": "STX",
            "visible": false,
            "char": "▫",
            "ascii": "02"
        },
        "ascii": {
            "value": "STX",
            "visible": false,
            "char": "▫",
            "ebcdic": "02"
        }
    },
    {
        "hex": "03",
        "ebcdic": {
            "value": "ETX",
            "visible": false,
            "char": "▫",
            "ascii": "03"
        },
        "ascii": {
            "value": "ETX",
            "visible": false,
            "char": "▫",
            "ebcdic": "03"
        }
    },
    {
        "hex": "04",
        "ebcdic": {
            "value": "SEL",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "EOT",
            "visible": false,
            "char": "▫",
            "ebcdic": "37"
        }
    },
    {
        "hex": "05",
        "ebcdic": {
            "value": "HT",
            "visible": false,
            "char": "▫",
            "ascii": "09"
        },
        "ascii": {
            "value": "ENQ",
            "visible": false,
            "char": "▫",
            "ebcdic": "2D"
        }
    },
    {
        "hex": "06",
        "ebcdic": {
            "value": "RNL",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "ACK",
            "visible": false,
            "char": "▫",
            "ebcdic": "2E"
        }
    },
    {
        "hex": "07",
        "ebcdic": {
            "value": "Delete",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "Bell",
            "visible": false,
            "char": "▫",
            "ebcdic": "2F"
        }
    },
    {
        "hex": "08",
        "ebcdic": {
            "value": "GE",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "Backspace",
            "visible": false,
            "char": "▫",
            "ebcdic": "16"
        }
    },
    {
        "hex": "09",
        "ebcdic": {
            "value": "SPS",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "HT",
            "visible": false,
            "char": "▫",
            "ebcdic": "05"
        }
    },
    {
        "hex": "0A",
        "ebcdic": {
            "value": "RPT",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "Line Feed",
            "visible": false,
            "char": "▫",
            "ebcdic": "25"
        }
    },
    {
        "hex": "0B",
        "ebcdic": {
            "value": "VT",
            "visible": false,
            "char": "▫",
            "ascii": "0B"
        },
        "ascii": {
            "value": "VT",
            "visible": false,
            "char": "▫",
            "ebcdic": "0B"
        }
    },
    {
        "hex": "0C",
        "ebcdic": {
            "value": "Form Feed",
            "visible": false,
            "char": "▫",
            "ascii": "0C"
        },
        "ascii": {
            "value": "Form Feed",
            "visible": false,
            "char": "▫",
            "ebcdic": "0C"
        }
    },
    {
        "hex": "0D",
        "ebcdic": {
            "value": "Carriage Return",
            "visible": false,
            "char": "▫",
            "ascii": "0D"
        },
        "ascii": {
            "value": "Carriage Return",
            "visible": false,
            "char": "▫",
            "ebcdic": "0D"
        }
    },
    {
        "hex": "0E",
        "ebcdic": {
            "value": "SO",
            "visible": false,
            "char": "▫",
            "ascii": "0E"
        },
        "ascii": {
            "value": "SO",
            "visible": false,
            "char": "▫",
            "ebcdic": "0E"
        }
    },
    {
        "hex": "0F",
        "ebcdic": {
            "value": "SI",
            "visible": false,
            "char": "▫",
            "ascii": "0F"
        },
        "ascii": {
            "value": "SI",
            "visible": false,
            "char": "▫",
            "ebcdic": "0F"
        }
    },
    {
        "hex": "10",
        "ebcdic": {
            "value": "DLE",
            "visible": false,
            "char": "▫",
            "ascii": "10"
        },
        "ascii": {
            "value": "DLE",
            "visible": false,
            "char": "▫",
            "ebcdic": "10"
        }
    },
    {
        "hex": "11",
        "ebcdic": {
            "value": "DC1",
            "visible": false,
            "char": "▫",
            "ascii": "11"
        },
        "ascii": {
            "value": "DC1",
            "visible": false,
            "char": "▫",
            "ebcdic": "11"
        }
    },
    {
        "hex": "12",
        "ebcdic": {
            "value": "DC2",
            "visible": false,
            "char": "▫",
            "ascii": "12"
        },
        "ascii": {
            "value": "DC2",
            "visible": false,
            "char": "▫",
            "ebcdic": "12"
        }
    },
    {
        "hex": "13",
        "ebcdic": {
            "value": "DC3",
            "visible": false,
            "char": "▫",
            "ascii": "13"
        },
        "ascii": {
            "value": "DC3",
            "visible": false,
            "char": "▫",
            "ebcdic": "13"
        }
    },
    {
        "hex": "14",
        "ebcdic": {
            "value": "RES/ENP",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "DC4",
            "visible": false,
            "char": "▫",
            "ebcdic": "3C"
        }
    },
    {
        "hex": "15",
        "ebcdic": {
            "value": "New Line",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "NAK",
            "visible": false,
            "char": "▫",
            "ebcdic": "3D"
        }
    },
    {
        "hex": "16",
        "ebcdic": {
            "value": "Backspace",
            "visible": false,
            "char": "▫",
            "ascii": "08"
        },
        "ascii": {
            "value": "SYN",
            "visible": false,
            "char": "▫",
            "ebcdic": "32"
        }
    },
    {
        "hex": "17",
        "ebcdic": {
            "value": "POC",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "ETB",
            "visible": false,
            "char": "▫",
            "ebcdic": "26"
        }
    },
    {
        "hex": "18",
        "ebcdic": {
            "value": "CAN",
            "visible": false,
            "char": "▫",
            "ascii": "18"
        },
        "ascii": {
            "value": "CAN",
            "visible": false,
            "char": "▫",
            "ebcdic": "18"
        }
    },
    {
        "hex": "19",
        "ebcdic": {
            "value": "EM",
            "visible": false,
            "char": "▫",
            "ascii": "19"
        },
        "ascii": {
            "value": "EM",
            "visible": false,
            "char": "▫",
            "ebcdic": "19"
        }
    },
    {
        "hex": "1A",
        "ebcdic": {
            "value": "UBS",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "SUB",
            "visible": false,
            "char": "▫",
            "ebcdic": "3F"
        }
    },
    {
        "hex": "1B",
        "ebcdic": {
            "value": "CU1",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "ESC",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "1C",
        "ebcdic": {
            "value": "IFS",
            "visible": false,
            "char": "▫",
            "ascii": "1C"
        },
        "ascii": {
            "value": "IFS",
            "visible": false,
            "char": "▫",
            "ebcdic": "1C"
        }
    },
    {
        "hex": "1D",
        "ebcdic": {
            "value": "IGS",
            "visible": false,
            "char": "▫",
            "ascii": "1D"
        },
        "ascii": {
            "value": "IGS",
            "visible": false,
            "char": "▫",
            "ebcdic": "1D"
        }
    },
    {
        "hex": "1E",
        "ebcdic": {
            "value": "IRS",
            "visible": false,
            "char": "▫",
            "ascii": "1E"
        },
        "ascii": {
            "value": "IRS",
            "visible": false,
            "char": "▫",
            "ebcdic": "1E"
        }
    },
    {
        "hex": "1F",
        "ebcdic": {
            "value": "ITB/IUS",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "IUS",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "20",
        "ebcdic": {
            "value": "DS",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": " ",
            "visible": true,
            "char": " ",
            "ebcdic": "40"
        }
    },
    {
        "hex": "21",
        "ebcdic": {
            "value": "SOS",
            "visible": false,
            "char": "▫",
            "ascii": "98"
        },
        "ascii": {
            "value": "!",
            "visible": true,
            "char": "!",
            "ebcdic": "4F"
        }
    },
    {
        "hex": "22",
        "ebcdic": {
            "value": "FS",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "\"",
            "visible": true,
            "char": "\"",
            "ebcdic": "7F"
        }
    },
    {
        "hex": "23",
        "ebcdic": {
            "value": "Word Underscore",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "#",
            "visible": true,
            "char": "#",
            "ebcdic": "B1"
        }
    },
    {
        "hex": "24",
        "ebcdic": {
            "value": "BYP/INP",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "$",
            "visible": true,
            "char": "$",
            "ebcdic": "5B"
        }
    },
    {
        "hex": "25",
        "ebcdic": {
            "value": "Line Feed",
            "visible": false,
            "char": "▫",
            "ascii": "0A"
        },
        "ascii": {
            "value": "%",
            "visible": true,
            "char": "%",
            "ebcdic": "6C"
        }
    },
    {
        "hex": "26",
        "ebcdic": {
            "value": "ETB",
            "visible": false,
            "char": "▫",
            "ascii": "17"
        },
        "ascii": {
            "value": "&",
            "visible": true,
            "char": "&",
            "ebcdic": "50"
        }
    },
    {
        "hex": "27",
        "ebcdic": {
            "value": "Escape",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "'",
            "visible": true,
            "char": "'",
            "ebcdic": "7D"
        }
    },
    {
        "hex": "28",
        "ebcdic": {
            "value": "SA",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "(",
            "visible": true,
            "char": "(",
            "ebcdic": "4D"
        }
    },
    {
        "hex": "29",
        "ebcdic": {
            "value": "SFE",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": ")",
            "visible": true,
            "char": ")",
            "ebcdic": "5D"
        }
    },
    {
        "hex": "2A",
        "ebcdic": {
            "value": "SM/SW",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "*",
            "visible": true,
            "char": "*",
            "ebcdic": "FF"
        }
    },
    {
        "hex": "2B",
        "ebcdic": {
            "value": "CSP",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "+",
            "visible": true,
            "char": "+",
            "ebcdic": "4E"
        }
    },
    {
        "hex": "2C",
        "ebcdic": {
            "value": "MFA",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": ",",
            "visible": true,
            "char": ",",
            "ebcdic": "6B"
        }
    },
    {
        "hex": "2D",
        "ebcdic": {
            "value": "ENQ",
            "visible": false,
            "char": "▫",
            "ascii": "05"
        },
        "ascii": {
            "value": "-",
            "visible": true,
            "char": "-",
            "ebcdic": "60"
        }
    },
    {
        "hex": "2E",
        "ebcdic": {
            "value": "ACK",
            "visible": false,
            "char": "▫",
            "ascii": "06"
        },
        "ascii": {
            "value": ".",
            "visible": true,
            "char": ".",
            "ebcdic": "4B"
        }
    },
    {
        "hex": "2F",
        "ebcdic": {
            "value": "Bell",
            "visible": false,
            "char": "▫",
            "ascii": "07"
        },
        "ascii": {
            "value": "/",
            "visible": true,
            "char": "/",
            "ebcdic": "61"
        }
    },
    {
        "hex": "30",
        "ebcdic": {
            "value": "",
            "visible": false,
            "char": "▫",
            "ascii": "99"
        },
        "ascii": {
            "value": "0",
            "visible": true,
            "char": "0",
            "ebcdic": "F0"
        }
    },
    {
        "hex": "31",
        "ebcdic": {
            "value": "",
            "visible": false,
            "char": "▫",
            "ascii": "99"
        },
        "ascii": {
            "value": "1",
            "visible": true,
            "char": "1",
            "ebcdic": "F1"
        }
    },
    {
        "hex": "32",
        "ebcdic": {
            "value": "SYN",
            "visible": false,
            "char": "▫",
            "ascii": "16"
        },
        "ascii": {
            "value": "2",
            "visible": true,
            "char": "2",
            "ebcdic": "F2"
        }
    },
    {
        "hex": "33",
        "ebcdic": {
            "value": "IR",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "3",
            "visible": true,
            "char": "3",
            "ebcdic": "F3"
        }
    },
    {
        "hex": "34",
        "ebcdic": {
            "value": "PP",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "4",
            "visible": true,
            "char": "4",
            "ebcdic": "F4"
        }
    },
    {
        "hex": "35",
        "ebcdic": {
            "value": "TRN",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "5",
            "visible": true,
            "char": "5",
            "ebcdic": "F5"
        }
    },
    {
        "hex": "36",
        "ebcdic": {
            "value": "NBS",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "6",
            "visible": true,
            "char": "6",
            "ebcdic": "F6"
        }
    },
    {
        "hex": "37",
        "ebcdic": {
            "value": "EOT",
            "visible": false,
            "char": "▫",
            "ascii": "04"
        },
        "ascii": {
            "value": "7",
            "visible": true,
            "char": "7",
            "ebcdic": "F7"
        }
    },
    {
        "hex": "38",
        "ebcdic": {
            "value": "SBS",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "8",
            "visible": true,
            "char": "8",
            "ebcdic": "F8"
        }
    },
    {
        "hex": "39",
        "ebcdic": {
            "value": "IT",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": "9",
            "visible": true,
            "char": "9",
            "ebcdic": "F9"
        }
    },
    {
        "hex": "3A",
        "ebcdic": {
            "value": "RFF",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": ":",
            "visible": true,
            "char": ":",
            "ebcdic": "7A"
        }
    },
    {
        "hex": "3B",
        "ebcdic": {
            "value": "CU3",
            "visible": false,
            "char": "▫",
            "ascii": "none"
        },
        "ascii": {
            "value": ";",
            "visible": true,
            "char": ";",
            "ebcdic": "5E"
        }
    },
    {
        "hex": "3C",
        "ebcdic": {
            "value": "DC4",
            "visible": false,
            "char": "▫",
            "ascii": "14"
        },
        "ascii": {
            "value": "<",
            "visible": true,
            "char": "<",
            "ebcdic": "4C"
        }
    },
    {
        "hex": "3D",
        "ebcdic": {
            "value": "NAK",
            "visible": false,
            "char": "▫",
            "ascii": "15"
        },
        "ascii": {
            "value": "=",
            "visible": true,
            "char": "=",
            "ebcdic": "7E"
        }
    },
    {
        "hex": "3E",
        "ebcdic": {
            "value": "",
            "visible": false,
            "char": "▫",
            "ascii": "99"
        },
        "ascii": {
            "value": ">",
            "visible": true,
            "char": ">",
            "ebcdic": "6E"
        }
    },
    {
        "hex": "3F",
        "ebcdic": {
            "value": "SUB",
            "visible": false,
            "char": "▫",
            "ascii": "1A"
        },
        "ascii": {
            "value": "?",
            "visible": true,
            "char": "?",
            "ebcdic": "6F"
        }
    },
    {
        "hex": "40",
        "ebcdic": {
            "value": " ",
            "visible": true,
            "char": " ",
            "ascii": "20"
        },
        "ascii": {
            "value": "@",
            "visible": true,
            "char": "@",
            "ebcdic": "44"
        }
    },
    {
        "hex": "41",
        "ebcdic": {
            "value": "RSP",
            "visible": false,
            "char": "▫",
            "ascii": "A0"
        },
        "ascii": {
            "value": "A",
            "visible": true,
            "char": "A",
            "ebcdic": "C1"
        }
    },
    {
        "hex": "42",
        "ebcdic": {
            "value": "â",
            "visible": true,
            "char": "â",
            "ascii": "E2"
        },
        "ascii": {
            "value": "B",
            "visible": true,
            "char": "B",
            "ebcdic": "C2"
        }
    },
    {
        "hex": "43",
        "ebcdic": {
            "value": "ä",
            "visible": true,
            "char": "ä",
            "ascii": "E4"
        },
        "ascii": {
            "value": "C",
            "visible": true,
            "char": "C",
            "ebcdic": "C3"
        }
    },
    {
        "hex": "44",
        "ebcdic": {
            "value": "@",
            "visible": true,
            "char": "@",
            "ascii": "40"
        },
        "ascii": {
            "value": "D",
            "visible": true,
            "char": "D",
            "ebcdic": "C4"
        }
    },
    {
        "hex": "45",
        "ebcdic": {
            "value": "á",
            "visible": true,
            "char": "á",
            "ascii": "E1"
        },
        "ascii": {
            "value": "E",
            "visible": true,
            "char": "E",
            "ebcdic": "C5"
        }
    },
    {
        "hex": "46",
        "ebcdic": {
            "value": "ã",
            "visible": true,
            "char": "ã",
            "ascii": "E3"
        },
        "ascii": {
            "value": "F",
            "visible": true,
            "char": "F",
            "ebcdic": "C6"
        }
    },
    {
        "hex": "47",
        "ebcdic": {
            "value": "å",
            "visible": true,
            "char": "å",
            "ascii": "E5"
        },
        "ascii": {
            "value": "G",
            "visible": true,
            "char": "G",
            "ebcdic": "C7"
        }
    },
    {
        "hex": "48",
        "ebcdic": {
            "value": "\\",
            "visible": true,
            "char": "\\",
            "ascii": "5C"
        },
        "ascii": {
            "value": "H",
            "visible": true,
            "char": "H",
            "ebcdic": "C8"
        }
    },
    {
        "hex": "49",
        "ebcdic": {
            "value": "ñ",
            "visible": true,
            "char": "ñ",
            "ascii": "F1"
        },
        "ascii": {
            "value": "I",
            "visible": true,
            "char": "I",
            "ebcdic": "C9"
        }
    },
    {
        "hex": "4A",
        "ebcdic": {
            "value": "º",
            "visible": true,
            "char": "º",
            "ascii": "BA",
            "equivalent": "9B"
        },
        "ascii": {
            "value": "J",
            "visible": true,
            "char": "J",
            "ebcdic": "D1"
        }
    },
    {
        "hex": "4B",
        "ebcdic": {
            "value": ".",
            "visible": true,
            "char": ".",
            "ascii": "2E"
        },
        "ascii": {
            "value": "K",
            "visible": true,
            "char": "K",
            "ebcdic": "D2"
        }
    },
    {
        "hex": "4C",
        "ebcdic": {
            "value": "<",
            "visible": true,
            "char": "<",
            "ascii": "3C"
        },
        "ascii": {
            "value": "L",
            "visible": true,
            "char": "L",
            "ebcdic": "D3"
        }
    },
    {
        "hex": "4D",
        "ebcdic": {
            "value": "(",
            "visible": true,
            "char": "(",
            "ascii": "28"
        },
        "ascii": {
            "value": "M",
            "visible": true,
            "char": "M",
            "ebcdic": "D4"
        }
    },
    {
        "hex": "4E",
        "ebcdic": {
            "value": "+",
            "visible": true,
            "char": "+",
            "ascii": "2B"
        },
        "ascii": {
            "value": "N",
            "visible": true,
            "char": "N",
            "ebcdic": "D5"
        }
    },
    {
        "hex": "4F",
        "ebcdic": {
            "value": "!",
            "visible": true,
            "char": "!",
            "ascii": "21"
        },
        "ascii": {
            "value": "O",
            "visible": true,
            "char": "O",
            "ebcdic": "D6"
        }
    },
    {
        "hex": "50",
        "ebcdic": {
            "value": "&",
            "visible": true,
            "char": "&",
            "ascii": "26"
        },
        "ascii": {
            "value": "P",
            "visible": true,
            "char": "P",
            "ebcdic": "D7"
        }
    },
    {
        "hex": "51",
        "ebcdic": {
            "value": "{",
            "visible": true,
            "char": "{",
            "ascii": "7B"
        },
        "ascii": {
            "value": "Q",
            "visible": true,
            "char": "Q",
            "ebcdic": "D8"
        }
    },
    {
        "hex": "52",
        "ebcdic": {
            "value": "ê",
            "visible": true,
            "char": "ê",
            "ascii": "EA"
        },
        "ascii": {
            "value": "R",
            "visible": true,
            "char": "R",
            "ebcdic": "D9"
        }
    },
    {
        "hex": "53",
        "ebcdic": {
            "value": "ë",
            "visible": true,
            "char": "ë",
            "ascii": "EB"
        },
        "ascii": {
            "value": "S",
            "visible": true,
            "char": "S",
            "ebcdic": "E2"
        }
    },
    {
        "hex": "54",
        "ebcdic": {
            "value": "}",
            "visible": true,
            "char": "}",
            "ascii": "7D"
        },
        "ascii": {
            "value": "T",
            "visible": true,
            "char": "T",
            "ebcdic": "E3"
        }
    },
    {
        "hex": "55",
        "ebcdic": {
            "value": "í",
            "visible": true,
            "char": "í",
            "ascii": "ED"
        },
        "ascii": {
            "value": "U",
            "visible": true,
            "char": "U",
            "ebcdic": "E4"
        }
    },
    {
        "hex": "56",
        "ebcdic": {
            "value": "î",
            "visible": true,
            "char": "î",
            "ascii": "EE"
        },
        "ascii": {
            "value": "V",
            "visible": true,
            "char": "V",
            "ebcdic": "E5"
        }
    },
    {
        "hex": "57",
        "ebcdic": {
            "value": "ï",
            "visible": true,
            "char": "ï",
            "ascii": "EF"
        },
        "ascii": {
            "value": "W",
            "visible": true,
            "char": "W",
            "ebcdic": "E6"
        }
    },
    {
        "hex": "58",
        "ebcdic": {
            "value": "ì",
            "visible": true,
            "char": "ì",
            "ascii": "EC"
        },
        "ascii": {
            "value": "X",
            "visible": true,
            "char": "X",
            "ebcdic": "E7"
        }
    },
    {
        "hex": "59",
        "ebcdic": {
            "value": "ß",
            "visible": true,
            "char": "ß",
            "ascii": "DF"
        },
        "ascii": {
            "value": "Y",
            "visible": true,
            "char": "Y",
            "ebcdic": "E8"
        }
    },
    {
        "hex": "5A",
        "ebcdic": {
            "value": "§",
            "visible": true,
            "char": "§",
            "ascii": "A7"
        },
        "ascii": {
            "value": "Z",
            "visible": true,
            "char": "Z",
            "ebcdic": "E9"
        }
    },
    {
        "hex": "5B",
        "ebcdic": {
            "value": "$",
            "visible": true,
            "char": "$",
            "ascii": "24"
        },
        "ascii": {
            "value": "[",
            "visible": true,
            "char": "[",
            "ebcdic": "90"
        }
    },
    {
        "hex": "5C",
        "ebcdic": {
            "value": "*",
            "visible": true,
            "char": "*",
            "ascii": "2A",
            "equivalent": "FF"
        },
        "ascii": {
            "value": "\\",
            "visible": true,
            "char": "\\",
            "ebcdic": "48"
        }
    },
    {
        "hex": "5D",
        "ebcdic": {
            "value": ")",
            "visible": true,
            "char": ")",
            "ascii": "29"
        },
        "ascii": {
            "value": "]",
            "visible": true,
            "char": "]",
            "ebcdic": "B5"
        }
    },
    {
        "hex": "5E",
        "ebcdic": {
            "value": ";",
            "visible": true,
            "char": ";",
            "ascii": "3B"
        },
        "ascii": {
            "value": "^",
            "visible": true,
            "char": "^",
            "ebcdic": "5F"
        }
    },
    {
        "hex": "5F",
        "ebcdic": {
            "value": "^",
            "visible": true,
            "char": "^",
            "ascii": "5E"
        },
        "ascii": {
            "value": "_",
            "visible": true,
            "char": "_",
            "ebcdic": "6D"
        }
    },
    {
        "hex": "60",
        "ebcdic": {
            "value": "-",
            "visible": true,
            "char": "-",
            "ascii": "2D"
        },
        "ascii": {
            "value": "`",
            "visible": true,
            "char": "`",
            "ebcdic": "A0"
        }
    },
    {
        "hex": "61",
        "ebcdic": {
            "value": "/",
            "visible": true,
            "char": "/",
            "ascii": "2F"
        },
        "ascii": {
            "value": "a",
            "visible": true,
            "char": "a",
            "ebcdic": "81"
        }
    },
    {
        "hex": "62",
        "ebcdic": {
            "value": "Â",
            "visible": true,
            "char": "Â",
            "ascii": "C2"
        },
        "ascii": {
            "value": "b",
            "visible": true,
            "char": "b",
            "ebcdic": "82"
        }
    },
    {
        "hex": "63",
        "ebcdic": {
            "value": "Ä",
            "visible": true,
            "char": "Ä",
            "ascii": "C4"
        },
        "ascii": {
            "value": "c",
            "visible": true,
            "char": "c",
            "ebcdic": "83"
        }
    },
    {
        "hex": "64",
        "ebcdic": {
            "value": "À",
            "visible": true,
            "char": "À",
            "ascii": "C0"
        },
        "ascii": {
            "value": "d",
            "visible": true,
            "char": "d",
            "ebcdic": "84"
        }
    },
    {
        "hex": "65",
        "ebcdic": {
            "value": "Á",
            "visible": true,
            "char": "Á",
            "ascii": "C1"
        },
        "ascii": {
            "value": "e",
            "visible": true,
            "char": "e",
            "ebcdic": "85"
        }
    },
    {
        "hex": "66",
        "ebcdic": {
            "value": "Ã",
            "visible": true,
            "char": "Ã",
            "ascii": "C3"
        },
        "ascii": {
            "value": "f",
            "visible": true,
            "char": "f",
            "ebcdic": "86"
        }
    },
    {
        "hex": "67",
        "ebcdic": {
            "value": "Å",
            "visible": true,
            "char": "Å",
            "ascii": "C5"
        },
        "ascii": {
            "value": "g",
            "visible": true,
            "char": "g",
            "ebcdic": "87"
        }
    },
    {
        "hex": "68",
        "ebcdic": {
            "value": "Ç",
            "visible": true,
            "char": "Ç",
            "ascii": "C7"
        },
        "ascii": {
            "value": "h",
            "visible": true,
            "char": "h",
            "ebcdic": "88"
        }
    },
    {
        "hex": "69",
        "ebcdic": {
            "value": "Ñ",
            "visible": true,
            "char": "Ñ",
            "ascii": "D1"
        },
        "ascii": {
            "value": "i",
            "visible": true,
            "char": "i",
            "ebcdic": "89"
        }
    },
    {
        "hex": "6A",
        "ebcdic": {
            "value": "ù",
            "visible": true,
            "char": "ù",
            "ascii": "F9"
        },
        "ascii": {
            "value": "j",
            "visible": true,
            "char": "j",
            "ebcdic": "91"
        }
    },
    {
        "hex": "6B",
        "ebcdic": {
            "value": ",",
            "visible": true,
            "char": ",",
            "ascii": "2C"
        },
        "ascii": {
            "value": "k",
            "visible": true,
            "char": "k",
            "ebcdic": "92"
        }
    },
    {
        "hex": "6C",
        "ebcdic": {
            "value": "%",
            "visible": true,
            "char": "%",
            "ascii": "25"
        },
        "ascii": {
            "value": "l",
            "visible": true,
            "char": "l",
            "ebcdic": "93"
        }
    },
    {
        "hex": "6D",
        "ebcdic": {
            "value": "_",
            "visible": true,
            "char": "_",
            "ascii": "5F"
        },
        "ascii": {
            "value": "m",
            "visible": true,
            "char": "m",
            "ebcdic": "94"
        }
    },
    {
        "hex": "6E",
        "ebcdic": {
            "value": ">",
            "visible": true,
            "char": ">",
            "ascii": "3E"
        },
        "ascii": {
            "value": "n",
            "visible": true,
            "char": "n",
            "ebcdic": "95"
        }
    },
    {
        "hex": "6F",
        "ebcdic": {
            "value": "?",
            "visible": true,
            "char": "?",
            "ascii": "3F"
        },
        "ascii": {
            "value": "o",
            "visible": true,
            "char": "o",
            "ebcdic": "96"
        }
    },
    {
        "hex": "70",
        "ebcdic": {
            "value": "ø",
            "visible": true,
            "char": "ø",
            "ascii": "F8"
        },
        "ascii": {
            "value": "p",
            "visible": true,
            "char": "p",
            "ebcdic": "97"
        }
    },
    {
        "hex": "71",
        "ebcdic": {
            "value": "É",
            "visible": true,
            "char": "É",
            "ascii": "C9"
        },
        "ascii": {
            "value": "q",
            "visible": true,
            "char": "q",
            "ebcdic": "98"
        }
    },
    {
        "hex": "72",
        "ebcdic": {
            "value": "Ê",
            "visible": true,
            "char": "Ê",
            "ascii": "CA"
        },
        "ascii": {
            "value": "r",
            "visible": true,
            "char": "r",
            "ebcdic": "99"
        }
    },
    {
        "hex": "73",
        "ebcdic": {
            "value": "Ë",
            "visible": true,
            "char": "Ë",
            "ascii": "CB"
        },
        "ascii": {
            "value": "s",
            "visible": true,
            "char": "s",
            "ebcdic": "A2"
        }
    },
    {
        "hex": "74",
        "ebcdic": {
            "value": "È",
            "visible": true,
            "char": "È",
            "ascii": "C8"
        },
        "ascii": {
            "value": "t",
            "visible": true,
            "char": "t",
            "ebcdic": "A3"
        }
    },
    {
        "hex": "75",
        "ebcdic": {
            "value": "Í",
            "visible": true,
            "char": "Í",
            "ascii": "CD"
        },
        "ascii": {
            "value": "u",
            "visible": true,
            "char": "u",
            "ebcdic": "A4"
        }
    },
    {
        "hex": "76",
        "ebcdic": {
            "value": "Î",
            "visible": true,
            "char": "Î",
            "ascii": "CE"
        },
        "ascii": {
            "value": "v",
            "visible": true,
            "char": "v",
            "ebcdic": "A5"
        }
    },
    {
        "hex": "77",
        "ebcdic": {
            "value": "Ï",
            "visible": true,
            "char": "Ï",
            "ascii": "CF"
        },
        "ascii": {
            "value": "w",
            "visible": true,
            "char": "w",
            "ebcdic": "A6"
        }
    },
    {
        "hex": "78",
        "ebcdic": {
            "value": "Ì",
            "visible": true,
            "char": "Ì",
            "ascii": "CC"
        },
        "ascii": {
            "value": "x",
            "visible": true,
            "char": "x",
            "ebcdic": "A7"
        }
    },
    {
        "hex": "79",
        "ebcdic": {
            "value": "µ",
            "visible": true,
            "char": "µ",
            "ascii": "B5"
        },
        "ascii": {
            "value": "y",
            "visible": true,
            "char": "y",
            "ebcdic": "A8"
        }
    },
    {
        "hex": "7A",
        "ebcdic": {
            "value": ":",
            "visible": true,
            "char": ":",
            "ascii": "3A"
        },
        "ascii": {
            "value": "z",
            "visible": true,
            "char": "z",
            "ebcdic": "A9"
        }
    },
    {
        "hex": "7B",
        "ebcdic": {
            "value": "£",
            "visible": true,
            "char": "£",
            "ascii": "A3"
        },
        "ascii": {
            "value": "{",
            "visible": true,
            "char": "{",
            "ebcdic": "51"
        }
    },
    {
        "hex": "7C",
        "ebcdic": {
            "value": "à",
            "visible": true,
            "char": "à",
            "ascii": "E0"
        },
        "ascii": {
            "value": "|",
            "visible": true,
            "char": "|",
            "ebcdic": "BB"
        }
    },
    {
        "hex": "7D",
        "ebcdic": {
            "value": "'",
            "visible": true,
            "char": "'",
            "ascii": "27"
        },
        "ascii": {
            "value": "}",
            "visible": true,
            "char": "}",
            "ebcdic": "54"
        }
    },
    {
        "hex": "7E",
        "ebcdic": {
            "value": "=",
            "visible": true,
            "char": "=",
            "ascii": "3D"
        },
        "ascii": {
            "value": "~",
            "visible": false,
            "char": "~",
            "ebcdic": "BD"
        }
    },
    {
        "hex": "7F",
        "ebcdic": {
            "value": "\"",
            "visible": true,
            "char": "\"",
            "ascii": "22"
        },
        "ascii": {
            "value": "",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "80",
        "ebcdic": {
            "value": "Ø",
            "visible": true,
            "char": "Ø",
            "ascii": "D8"
        },
        "ascii": {
            "value": "",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "81",
        "ebcdic": {
            "value": "a",
            "visible": true,
            "char": "a",
            "ascii": "61"
        },
        "ascii": {
            "value": "",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "82",
        "ebcdic": {
            "value": "b",
            "visible": true,
            "char": "b",
            "ascii": "62"
        },
        "ascii": {
            "value": "BPH",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "83",
        "ebcdic": {
            "value": "c",
            "visible": true,
            "char": "c",
            "ascii": "63"
        },
        "ascii": {
            "value": "NBH",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "84",
        "ebcdic": {
            "value": "d",
            "visible": true,
            "char": "d",
            "ascii": "64"
        },
        "ascii": {
            "value": "IND",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "85",
        "ebcdic": {
            "value": "e",
            "visible": true,
            "char": "e",
            "ascii": "65"
        },
        "ascii": {
            "value": "Next Line",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "86",
        "ebcdic": {
            "value": "f",
            "visible": true,
            "char": "f",
            "ascii": "66"
        },
        "ascii": {
            "value": "SSA",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "87",
        "ebcdic": {
            "value": "g",
            "visible": true,
            "char": "g",
            "ascii": "67"
        },
        "ascii": {
            "value": "ESA",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "88",
        "ebcdic": {
            "value": "h",
            "visible": true,
            "char": "h",
            "ascii": "68"
        },
        "ascii": {
            "value": "HTS",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "89",
        "ebcdic": {
            "value": "i",
            "visible": true,
            "char": "i",
            "ascii": "69"
        },
        "ascii": {
            "value": "HTJ",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "8A",
        "ebcdic": {
            "value": "«",
            "visible": true,
            "char": "«",
            "ascii": "AB"
        },
        "ascii": {
            "value": "VTS",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "8B",
        "ebcdic": {
            "value": "»",
            "visible": true,
            "char": "»",
            "ascii": "BB"
        },
        "ascii": {
            "value": "PLD",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "8C",
        "ebcdic": {
            "value": "ð",
            "visible": true,
            "char": "ð",
            "ascii": "F0"
        },
        "ascii": {
            "value": "PLU",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "8D",
        "ebcdic": {
            "value": "ý",
            "visible": true,
            "char": "ý",
            "ascii": "FD"
        },
        "ascii": {
            "value": "RI",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "8E",
        "ebcdic": {
            "value": "Þ",
            "visible": true,
            "char": "Þ",
            "ascii": "DE"
        },
        "ascii": {
            "value": "SS2",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "8F",
        "ebcdic": {
            "value": "±",
            "visible": true,
            "char": "±",
            "ascii": "B1"
        },
        "ascii": {
            "value": "SS3",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "90",
        "ebcdic": {
            "value": "[",
            "visible": true,
            "char": "[",
            "ascii": "5B"
        },
        "ascii": {
            "value": "DCS",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "91",
        "ebcdic": {
            "value": "j",
            "visible": true,
            "char": "j",
            "ascii": "6A"
        },
        "ascii": {
            "value": "PU1",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "92",
        "ebcdic": {
            "value": "k",
            "visible": true,
            "char": "k",
            "ascii": "6B"
        },
        "ascii": {
            "value": "PU2",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "93",
        "ebcdic": {
            "value": "l",
            "visible": true,
            "char": "l",
            "ascii": "6C"
        },
        "ascii": {
            "value": "STS",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "94",
        "ebcdic": {
            "value": "m",
            "visible": true,
            "char": "m",
            "ascii": "6D"
        },
        "ascii": {
            "value": "CCH",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "95",
        "ebcdic": {
            "value": "n",
            "visible": true,
            "char": "n",
            "ascii": "6E"
        },
        "ascii": {
            "value": "MW",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "96",
        "ebcdic": {
            "value": "o",
            "visible": true,
            "char": "o",
            "ascii": "6F"
        },
        "ascii": {
            "value": "SPA",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "97",
        "ebcdic": {
            "value": "p",
            "visible": true,
            "char": "p",
            "ascii": "70"
        },
        "ascii": {
            "value": "EPA",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "98",
        "ebcdic": {
            "value": "q",
            "visible": true,
            "char": "q",
            "ascii": "71"
        },
        "ascii": {
            "value": "SOS",
            "visible": false,
            "char": "▫",
            "ebcdic": "21"
        }
    },
    {
        "hex": "99",
        "ebcdic": {
            "value": "r",
            "visible": true,
            "char": "r",
            "ascii": "72"
        },
        "ascii": {
            "value": "",
            "visible": false,
            "char": "▫",
            "ebcdic": "30"
        }
    },
    {
        "hex": "9A",
        "ebcdic": {
            "value": "ª",
            "visible": true,
            "char": "ª",
            "ascii": "AA"
        },
        "ascii": {
            "value": "SCI",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "9B",
        "ebcdic": {
            "value": "º",
            "visible": true,
            "char": "º",
            "ascii": "BA",
            "equivalent": "4A"
        },
        "ascii": {
            "value": "CSI",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "9C",
        "ebcdic": {
            "value": "æ",
            "visible": true,
            "char": "æ",
            "ascii": "E6"
        },
        "ascii": {
            "value": "ST",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "9D",
        "ebcdic": {
            "value": "¸",
            "visible": true,
            "char": "¸",
            "ascii": "B8"
        },
        "ascii": {
            "value": "OSC",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "9E",
        "ebcdic": {
            "value": "Æ",
            "visible": true,
            "char": "Æ",
            "ascii": "C6"
        },
        "ascii": {
            "value": "PM",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "9F",
        "ebcdic": {
            "value": "€",
            "visible": true,
            "char": "€",
            "ascii": "none"
        },
        "ascii": {
            "value": "APC",
            "visible": false,
            "char": "▫",
            "ebcdic": "none"
        }
    },
    {
        "hex": "A0",
        "ebcdic": {
            "value": "",
            "visible": true,
            "char": "`",
            "ascii": "60"
        },
        "ascii": {
            "value": "RSP",
            "visible": false,
            "char": "▫",
            "ebcdic": "41"
        }
    },
    {
        "hex": "A1",
        "ebcdic": {
            "value": "¨",
            "visible": true,
            "char": "¨",
            "ascii": "A8"
        },
        "ascii": {
            "value": "¡",
            "visible": true,
            "char": "¡",
            "ebcdic": "AA"
        }
    },
    {
        "hex": "A2",
        "ebcdic": {
            "value": "s",
            "visible": true,
            "char": "s",
            "ascii": "73"
        },
        "ascii": {
            "value": "¢",
            "visible": true,
            "char": "¢",
            "ebcdic": "B0"
        }
    },
    {
        "hex": "A3",
        "ebcdic": {
            "value": "t",
            "visible": true,
            "char": "t",
            "ascii": "74"
        },
        "ascii": {
            "value": "£",
            "visible": true,
            "char": "£",
            "ebcdic": "7B"
        }
    },
    {
        "hex": "A4",
        "ebcdic": {
            "value": "u",
            "visible": true,
            "char": "u",
            "ascii": "75"
        },
        "ascii": {
            "value": "¤",
            "visible": true,
            "char": "¤",
            "ebcdic": "none"
        }
    },
    {
        "hex": "A5",
        "ebcdic": {
            "value": "v",
            "visible": true,
            "char": "v",
            "ascii": "76"
        },
        "ascii": {
            "value": "¥",
            "visible": true,
            "char": "¥",
            "ebcdic": "B2"
        }
    },
    {
        "hex": "A6",
        "ebcdic": {
            "value": "w",
            "visible": true,
            "char": "w",
            "ascii": "77"
        },
        "ascii": {
            "value": "¦",
            "visible": true,
            "char": "¦",
            "ebcdic": "DD"
        }
    },
    {
        "hex": "A7",
        "ebcdic": {
            "value": "x",
            "visible": true,
            "char": "x",
            "ascii": "78"
        },
        "ascii": {
            "value": "§",
            "visible": true,
            "char": "§",
            "ebcdic": "5A"
        }
    },
    {
        "hex": "A8",
        "ebcdic": {
            "value": "y",
            "visible": true,
            "char": "y",
            "ascii": "79"
        },
        "ascii": {
            "value": "¨",
            "visible": true,
            "char": "¨",
            "ebcdic": "A1"
        }
    },
    {
        "hex": "A9",
        "ebcdic": {
            "value": "z",
            "visible": true,
            "char": "z",
            "ascii": "7A"
        },
        "ascii": {
            "value": "©",
            "visible": true,
            "char": "©",
            "ebcdic": "B4"
        }
    },
    {
        "hex": "AA",
        "ebcdic": {
            "value": "¡",
            "visible": true,
            "char": "¡",
            "ascii": "A1"
        },
        "ascii": {
            "value": "ª",
            "visible": true,
            "char": "ª",
            "ebcdic": "9A"
        }
    },
    {
        "hex": "AB",
        "ebcdic": {
            "value": "¿",
            "visible": true,
            "char": "¿",
            "ascii": "BF"
        },
        "ascii": {
            "value": "«",
            "visible": true,
            "char": "«",
            "ebcdic": "8A"
        }
    },
    {
        "hex": "AC",
        "ebcdic": {
            "value": "Ð",
            "visible": true,
            "char": "Ð",
            "ascii": "D0"
        },
        "ascii": {
            "value": "¬",
            "visible": true,
            "char": "¬",
            "ebcdic": "BA"
        }
    },
    {
        "hex": "AD",
        "ebcdic": {
            "value": "Ý",
            "visible": true,
            "char": "Ý",
            "ascii": "DD"
        },
        "ascii": {
            "value": "Syllable Hyphen",
            "visible": false,
            "char": "▫",
            "ebcdic": "CA"
        }
    },
    {
        "hex": "AE",
        "ebcdic": {
            "value": "þ",
            "visible": true,
            "char": "þ",
            "ascii": "FE"
        },
        "ascii": {
            "value": "®",
            "visible": true,
            "char": "®",
            "ebcdic": "AF"
        }
    },
    {
        "hex": "AF",
        "ebcdic": {
            "value": "®",
            "visible": true,
            "char": "®",
            "ascii": "AE"
        },
        "ascii": {
            "value": "¯",
            "visible": true,
            "char": "¯",
            "ebcdic": "BC"
        }
    },
    {
        "hex": "B0",
        "ebcdic": {
            "value": "¢",
            "visible": true,
            "char": "¢",
            "ascii": "A2"
        },
        "ascii": {
            "value": "°",
            "visible": true,
            "char": "°",
            "ebcdic": "none"
        }
    },
    {
        "hex": "B1",
        "ebcdic": {
            "value": "#",
            "visible": true,
            "char": "#",
            "ascii": "23"
        },
        "ascii": {
            "value": "±",
            "visible": true,
            "char": "±",
            "ebcdic": "8F"
        }
    },
    {
        "hex": "B2",
        "ebcdic": {
            "value": "¥",
            "visible": true,
            "char": "¥",
            "ascii": "A5"
        },
        "ascii": {
            "value": "²",
            "visible": true,
            "char": "²",
            "ebcdic": "EA"
        }
    },
    {
        "hex": "B3",
        "ebcdic": {
            "value": "·",
            "visible": true,
            "char": "·",
            "ascii": "B7"
        },
        "ascii": {
            "value": "³",
            "visible": true,
            "char": "³",
            "ebcdic": "FA"
        }
    },
    {
        "hex": "B4",
        "ebcdic": {
            "value": "©",
            "visible": true,
            "char": "©",
            "ascii": "A9"
        },
        "ascii": {
            "value": "´",
            "visible": true,
            "char": "´",
            "ebcdic": "BE"
        }
    },
    {
        "hex": "B5",
        "ebcdic": {
            "value": "]",
            "visible": true,
            "char": "]",
            "ascii": "5D"
        },
        "ascii": {
            "value": "µ",
            "visible": true,
            "char": "µ",
            "ebcdic": "79"
        }
    },
    {
        "hex": "B6",
        "ebcdic": {
            "value": "¶",
            "visible": true,
            "char": "¶",
            "ascii": "B6"
        },
        "ascii": {
            "value": "¶",
            "visible": true,
            "char": "¶",
            "ebcdic": "B6"
        }
    },
    {
        "hex": "B7",
        "ebcdic": {
            "value": "¼",
            "visible": true,
            "char": "¼",
            "ascii": "BC"
        },
        "ascii": {
            "value": "·",
            "visible": true,
            "char": "·",
            "ebcdic": "B3"
        }
    },
    {
        "hex": "B8",
        "ebcdic": {
            "value": "½",
            "visible": true,
            "char": "½",
            "ascii": "BD"
        },
        "ascii": {
            "value": "¸",
            "visible": true,
            "char": "¸",
            "ebcdic": "9D"
        }
    },
    {
        "hex": "B9",
        "ebcdic": {
            "value": "¾",
            "visible": true,
            "char": "¾",
            "ascii": "BE"
        },
        "ascii": {
            "value": "¹",
            "visible": true,
            "char": "¹",
            "ebcdic": "DA"
        }
    },
    {
        "hex": "BA",
        "ebcdic": {
            "value": "¬",
            "visible": true,
            "char": "¬",
            "ascii": "AC"
        },
        "ascii": {
            "value": "º",
            "visible": true,
            "char": "º",
            "ebcdic": "4A"
        }
    },
    {
        "hex": "BB",
        "ebcdic": {
            "value": "|",
            "visible": true,
            "char": "|",
            "ascii": "7C"
        },
        "ascii": {
            "value": "»",
            "visible": true,
            "char": "»",
            "ebcdic": "8B"
        }
    },
    {
        "hex": "BC",
        "ebcdic": {
            "value": "¯",
            "visible": true,
            "char": "¯",
            "ascii": "AF"
        },
        "ascii": {
            "value": "¼",
            "visible": true,
            "char": "¼",
            "ebcdic": "B7"
        }
    },
    {
        "hex": "BD",
        "ebcdic": {
            "value": "~",
            "visible": true,
            "char": "~",
            "ascii": "7E"
        },
        "ascii": {
            "value": "½",
            "visible": true,
            "char": "½",
            "ebcdic": "B8"
        }
    },
    {
        "hex": "BE",
        "ebcdic": {
            "value": "´",
            "visible": true,
            "char": "´",
            "ascii": "B4"
        },
        "ascii": {
            "value": "¾",
            "visible": true,
            "char": "¾",
            "ebcdic": "B9"
        }
    },
    {
        "hex": "BF",
        "ebcdic": {
            "value": "×",
            "visible": true,
            "char": "×",
            "ascii": "D7"
        },
        "ascii": {
            "value": "¿",
            "visible": true,
            "char": "¿",
            "ebcdic": "AB"
        }
    },
    {
        "hex": "C0",
        "ebcdic": {
            "value": "é",
            "visible": true,
            "char": "é",
            "ascii": "E9"
        },
        "ascii": {
            "value": "À",
            "visible": true,
            "char": "À",
            "ebcdic": "64"
        }
    },
    {
        "hex": "C1",
        "ebcdic": {
            "value": "A",
            "visible": true,
            "char": "A",
            "ascii": "41"
        },
        "ascii": {
            "value": "Á",
            "visible": true,
            "char": "Á",
            "ebcdic": "65"
        }
    },
    {
        "hex": "C2",
        "ebcdic": {
            "value": "B",
            "visible": true,
            "char": "B",
            "ascii": "42"
        },
        "ascii": {
            "value": "Â",
            "visible": true,
            "char": "Â",
            "ebcdic": "62"
        }
    },
    {
        "hex": "C3",
        "ebcdic": {
            "value": "C",
            "visible": true,
            "char": "C",
            "ascii": "43"
        },
        "ascii": {
            "value": "Ã",
            "visible": true,
            "char": "Ã",
            "ebcdic": "66"
        }
    },
    {
        "hex": "C4",
        "ebcdic": {
            "value": "D",
            "visible": true,
            "char": "D",
            "ascii": "44"
        },
        "ascii": {
            "value": "Ä",
            "visible": true,
            "char": "Ä",
            "ebcdic": "63"
        }
    },
    {
        "hex": "C5",
        "ebcdic": {
            "value": "E",
            "visible": true,
            "char": "E",
            "ascii": "45"
        },
        "ascii": {
            "value": "Å",
            "visible": true,
            "char": "Å",
            "ebcdic": "67"
        }
    },
    {
        "hex": "C6",
        "ebcdic": {
            "value": "F",
            "visible": true,
            "char": "F",
            "ascii": "46"
        },
        "ascii": {
            "value": "Æ",
            "visible": true,
            "char": "Æ",
            "ebcdic": "9E"
        }
    },
    {
        "hex": "C7",
        "ebcdic": {
            "value": "G",
            "visible": true,
            "char": "G",
            "ascii": "47"
        },
        "ascii": {
            "value": "Ç",
            "visible": true,
            "char": "Ç",
            "ebcdic": "68"
        }
    },
    {
        "hex": "C8",
        "ebcdic": {
            "value": "H",
            "visible": true,
            "char": "H",
            "ascii": "48"
        },
        "ascii": {
            "value": "È",
            "visible": true,
            "char": "È",
            "ebcdic": "74"
        }
    },
    {
        "hex": "C9",
        "ebcdic": {
            "value": "I",
            "visible": true,
            "char": "I",
            "ascii": "49"
        },
        "ascii": {
            "value": "É",
            "visible": true,
            "char": "É",
            "ebcdic": "71"
        }
    },
    {
        "hex": "CA",
        "ebcdic": {
            "value": "Syllable Hyphen",
            "visible": false,
            "char": "▫",
            "ascii": "AD"
        },
        "ascii": {
            "value": "Ê",
            "visible": true,
            "char": "Ê",
            "ebcdic": "72"
        }
    },
    {
        "hex": "CB",
        "ebcdic": {
            "value": "ô",
            "visible": true,
            "char": "ô",
            "ascii": "F4"
        },
        "ascii": {
            "value": "Ë",
            "visible": true,
            "char": "Ë",
            "ebcdic": "73"
        }
    },
    {
        "hex": "CC",
        "ebcdic": {
            "value": "ö",
            "visible": true,
            "char": "ö",
            "ascii": "F6"
        },
        "ascii": {
            "value": "Ì",
            "visible": true,
            "char": "Ì",
            "ebcdic": "78"
        }
    },
    {
        "hex": "CD",
        "ebcdic": {
            "value": "ò",
            "visible": true,
            "char": "ò",
            "ascii": "F2"
        },
        "ascii": {
            "value": "Í",
            "visible": true,
            "char": "Í",
            "ebcdic": "75"
        }
    },
    {
        "hex": "CE",
        "ebcdic": {
            "value": "ó",
            "visible": true,
            "char": "ó",
            "ascii": "F3"
        },
        "ascii": {
            "value": "Î",
            "visible": true,
            "char": "Î",
            "ebcdic": "76"
        }
    },
    {
        "hex": "CF",
        "ebcdic": {
            "value": "õ",
            "visible": true,
            "char": "õ",
            "ascii": "F5"
        },
        "ascii": {
            "value": "Ï",
            "visible": true,
            "char": "Ï",
            "ebcdic": "77"
        }
    },
    {
        "hex": "D0",
        "ebcdic": {
            "value": "è",
            "visible": true,
            "char": "è",
            "ascii": "E8"
        },
        "ascii": {
            "value": "Ð",
            "visible": true,
            "char": "Ð",
            "ebcdic": "AC"
        }
    },
    {
        "hex": "D1",
        "ebcdic": {
            "value": "J",
            "visible": true,
            "char": "J",
            "ascii": "4A"
        },
        "ascii": {
            "value": "Ñ",
            "visible": true,
            "char": "Ñ",
            "ebcdic": "69"
        }
    },
    {
        "hex": "D2",
        "ebcdic": {
            "value": "K",
            "visible": true,
            "char": "K",
            "ascii": "4B"
        },
        "ascii": {
            "value": "Ò",
            "visible": true,
            "char": "Ò",
            "ebcdic": "ED"
        }
    },
    {
        "hex": "D3",
        "ebcdic": {
            "value": "L",
            "visible": true,
            "char": "L",
            "ascii": "4C"
        },
        "ascii": {
            "value": "Ó",
            "visible": true,
            "char": "Ó",
            "ebcdic": "EE"
        }
    },
    {
        "hex": "D4",
        "ebcdic": {
            "value": "M",
            "visible": true,
            "char": "M",
            "ascii": "4D"
        },
        "ascii": {
            "value": "Ô",
            "visible": true,
            "char": "Ô",
            "ebcdic": "EB"
        }
    },
    {
        "hex": "D5",
        "ebcdic": {
            "value": "N",
            "visible": true,
            "char": "N",
            "ascii": "4E"
        },
        "ascii": {
            "value": "Õ",
            "visible": true,
            "char": "Õ",
            "ebcdic": "EF"
        }
    },
    {
        "hex": "D6",
        "ebcdic": {
            "value": "O",
            "visible": true,
            "char": "O",
            "ascii": "4F"
        },
        "ascii": {
            "value": "Ö",
            "visible": true,
            "char": "Ö",
            "ebcdic": "EC"
        }
    },
    {
        "hex": "D7",
        "ebcdic": {
            "value": "P",
            "visible": true,
            "char": "P",
            "ascii": "50"
        },
        "ascii": {
            "value": "×",
            "visible": true,
            "char": "×",
            "ebcdic": "BF"
        }
    },
    {
        "hex": "D8",
        "ebcdic": {
            "value": "Q",
            "visible": true,
            "char": "Q",
            "ascii": "51"
        },
        "ascii": {
            "value": "Ø",
            "visible": true,
            "char": "Ø",
            "ebcdic": "80"
        }
    },
    {
        "hex": "D9",
        "ebcdic": {
            "value": "R",
            "visible": true,
            "char": "R",
            "ascii": "52"
        },
        "ascii": {
            "value": "Ù",
            "visible": true,
            "char": "Ù",
            "ebcdic": "FD"
        }
    },
    {
        "hex": "DA",
        "ebcdic": {
            "value": "¹",
            "visible": true,
            "char": "¹",
            "ascii": "B9"
        },
        "ascii": {
            "value": "Ú",
            "visible": true,
            "char": "Ú",
            "ebcdic": "FE"
        }
    },
    {
        "hex": "DB",
        "ebcdic": {
            "value": "û",
            "visible": true,
            "char": "û",
            "ascii": "FB"
        },
        "ascii": {
            "value": "Û",
            "visible": true,
            "char": "Û",
            "ebcdic": "FB"
        }
    },
    {
        "hex": "DC",
        "ebcdic": {
            "value": "ü",
            "visible": true,
            "char": "ü",
            "ascii": "FC"
        },
        "ascii": {
            "value": "Ü",
            "visible": true,
            "char": "Ü",
            "ebcdic": "FC"
        }
    },
    {
        "hex": "DD",
        "ebcdic": {
            "value": "¦",
            "visible": true,
            "char": "¦",
            "ascii": "A6"
        },
        "ascii": {
            "value": "Ý",
            "visible": true,
            "char": "Ý",
            "ebcdic": "AD"
        }
    },
    {
        "hex": "DE",
        "ebcdic": {
            "value": "ú",
            "visible": true,
            "char": "ú",
            "ascii": "FA"
        },
        "ascii": {
            "value": "Þ",
            "visible": true,
            "char": "Þ",
            "ebcdic": "8E"
        }
    },
    {
        "hex": "DF",
        "ebcdic": {
            "value": "ÿ",
            "visible": true,
            "char": "ÿ",
            "ascii": "FF"
        },
        "ascii": {
            "value": "ß",
            "visible": true,
            "char": "ß",
            "ebcdic": "59"
        }
    },
    {
        "hex": "E0",
        "ebcdic": {
            "value": "ç",
            "visible": true,
            "char": "ç",
            "ascii": "E7"
        },
        "ascii": {
            "value": "à",
            "visible": true,
            "char": "à",
            "ebcdic": "7C"
        }
    },
    {
        "hex": "E1",
        "ebcdic": {
            "value": "÷",
            "visible": true,
            "char": "÷",
            "ascii": "F7"
        },
        "ascii": {
            "value": "á",
            "visible": true,
            "char": "á",
            "ebcdic": "45"
        }
    },
    {
        "hex": "E2",
        "ebcdic": {
            "value": "S",
            "visible": true,
            "char": "S",
            "ascii": "53"
        },
        "ascii": {
            "value": "â",
            "visible": true,
            "char": "â",
            "ebcdic": "42"
        }
    },
    {
        "hex": "E3",
        "ebcdic": {
            "value": "T",
            "visible": true,
            "char": "T",
            "ascii": "54"
        },
        "ascii": {
            "value": "ã",
            "visible": true,
            "char": "ã",
            "ebcdic": "46"
        }
    },
    {
        "hex": "E4",
        "ebcdic": {
            "value": "U",
            "visible": true,
            "char": "U",
            "ascii": "55"
        },
        "ascii": {
            "value": "ä",
            "visible": true,
            "char": "ä",
            "ebcdic": "43"
        }
    },
    {
        "hex": "E5",
        "ebcdic": {
            "value": "V",
            "visible": true,
            "char": "V",
            "ascii": "56"
        },
        "ascii": {
            "value": "å",
            "visible": true,
            "char": "å",
            "ebcdic": "47"
        }
    },
    {
        "hex": "E6",
        "ebcdic": {
            "value": "W",
            "visible": true,
            "char": "W",
            "ascii": "57"
        },
        "ascii": {
            "value": "æ",
            "visible": true,
            "char": "æ",
            "ebcdic": "9C"
        }
    },
    {
        "hex": "E7",
        "ebcdic": {
            "value": "X",
            "visible": true,
            "char": "X",
            "ascii": "58"
        },
        "ascii": {
            "value": "ç",
            "visible": true,
            "char": "ç",
            "ebcdic": "E0"
        }
    },
    {
        "hex": "E8",
        "ebcdic": {
            "value": "Y",
            "visible": true,
            "char": "Y",
            "ascii": "59"
        },
        "ascii": {
            "value": "è",
            "visible": true,
            "char": "è",
            "ebcdic": "D0"
        }
    },
    {
        "hex": "E9",
        "ebcdic": {
            "value": "Z",
            "visible": true,
            "char": "Z",
            "ascii": "5A"
        },
        "ascii": {
            "value": "é",
            "visible": true,
            "char": "é",
            "ebcdic": "C0"
        }
    },
    {
        "hex": "EA",
        "ebcdic": {
            "value": "²",
            "visible": true,
            "char": "²",
            "ascii": "B2"
        },
        "ascii": {
            "value": "ê",
            "visible": true,
            "char": "ê",
            "ebcdic": "52"
        }
    },
    {
        "hex": "EB",
        "ebcdic": {
            "value": "Ô",
            "visible": true,
            "char": "Ô",
            "ascii": "D4"
        },
        "ascii": {
            "value": "ë",
            "visible": true,
            "char": "ë",
            "ebcdic": "53"
        }
    },
    {
        "hex": "EC",
        "ebcdic": {
            "value": "Ö",
            "visible": true,
            "char": "Ö",
            "ascii": "D6"
        },
        "ascii": {
            "value": "ì",
            "visible": true,
            "char": "ì",
            "ebcdic": "58"
        }
    },
    {
        "hex": "ED",
        "ebcdic": {
            "value": "Ò",
            "visible": true,
            "char": "Ò",
            "ascii": "D2"
        },
        "ascii": {
            "value": "í",
            "visible": true,
            "char": "í",
            "ebcdic": "55"
        }
    },
    {
        "hex": "EE",
        "ebcdic": {
            "value": "Ó",
            "visible": true,
            "char": "Ó",
            "ascii": "D3"
        },
        "ascii": {
            "value": "î",
            "visible": true,
            "char": "î",
            "ebcdic": "56"
        }
    },
    {
        "hex": "EF",
        "ebcdic": {
            "value": "Õ",
            "visible": true,
            "char": "Õ",
            "ascii": "D5"
        },
        "ascii": {
            "value": "ï",
            "visible": true,
            "char": "ï",
            "ebcdic": "57"
        }
    },
    {
        "hex": "F0",
        "ebcdic": {
            "value": "0",
            "visible": true,
            "char": "0",
            "ascii": "30"
        },
        "ascii": {
            "value": "ð",
            "visible": true,
            "char": "ð",
            "ebcdic": "8C"
        }
    },
    {
        "hex": "F1",
        "ebcdic": {
            "value": "1",
            "visible": true,
            "char": "1",
            "ascii": "31"
        },
        "ascii": {
            "value": "ñ",
            "visible": true,
            "char": "ñ",
            "ebcdic": "49"
        }
    },
    {
        "hex": "F2",
        "ebcdic": {
            "value": "2",
            "visible": true,
            "char": "2",
            "ascii": "32"
        },
        "ascii": {
            "value": "ò",
            "visible": true,
            "char": "ò",
            "ebcdic": "CD"
        }
    },
    {
        "hex": "F3",
        "ebcdic": {
            "value": "3",
            "visible": true,
            "char": "3",
            "ascii": "33"
        },
        "ascii": {
            "value": "ó",
            "visible": true,
            "char": "ó",
            "ebcdic": "CE"
        }
    },
    {
        "hex": "F4",
        "ebcdic": {
            "value": "4",
            "visible": true,
            "char": "4",
            "ascii": "34"
        },
        "ascii": {
            "value": "ô",
            "visible": true,
            "char": "ô",
            "ebcdic": "CB"
        }
    },
    {
        "hex": "F5",
        "ebcdic": {
            "value": "5",
            "visible": true,
            "char": "5",
            "ascii": "35"
        },
        "ascii": {
            "value": "õ",
            "visible": true,
            "char": "õ",
            "ebcdic": "CF"
        }
    },
    {
        "hex": "F6",
        "ebcdic": {
            "value": "6",
            "visible": true,
            "char": "6",
            "ascii": "36"
        },
        "ascii": {
            "value": "ö",
            "visible": true,
            "char": "ö",
            "ebcdic": "CC"
        }
    },
    {
        "hex": "F7",
        "ebcdic": {
            "value": "7",
            "visible": true,
            "char": "7",
            "ascii": "37"
        },
        "ascii": {
            "value": "÷",
            "visible": true,
            "char": "÷",
            "ebcdic": "E1"
        }
    },
    {
        "hex": "F8",
        "ebcdic": {
            "value": "8",
            "visible": true,
            "char": "8",
            "ascii": "38"
        },
        "ascii": {
            "value": "ø",
            "visible": true,
            "char": "ø",
            "ebcdic": "70"
        }
    },
    {
        "hex": "F9",
        "ebcdic": {
            "value": "9",
            "visible": true,
            "char": "9",
            "ascii": "39"
        },
        "ascii": {
            "value": "ù",
            "visible": true,
            "char": "ù",
            "ebcdic": "6A"
        }
    },
    {
        "hex": "FA",
        "ebcdic": {
            "value": "³",
            "visible": true,
            "char": "³",
            "ascii": "B3"
        },
        "ascii": {
            "value": "ú",
            "visible": true,
            "char": "ú",
            "ebcdic": "DE"
        }
    },
    {
        "hex": "FB",
        "ebcdic": {
            "value": "Û",
            "visible": true,
            "char": "Û",
            "ascii": "DB"
        },
        "ascii": {
            "value": "û",
            "visible": true,
            "char": "û",
            "ebcdic": "DB"
        }
    },
    {
        "hex": "FC",
        "ebcdic": {
            "value": "Ü",
            "visible": true,
            "char": "Ü",
            "ascii": "DC"
        },
        "ascii": {
            "value": "ü",
            "visible": true,
            "char": "ü",
            "ebcdic": "DC"
        }
    },
    {
        "hex": "FD",
        "ebcdic": {
            "value": "Ù",
            "visible": true,
            "char": "Ù",
            "ascii": "D9"
        },
        "ascii": {
            "value": "ý",
            "visible": true,
            "char": "ý",
            "ebcdic": "8D"
        }
    },
    {
        "hex": "FE",
        "ebcdic": {
            "value": "Ú",
            "visible": true,
            "char": "Ú",
            "ascii": "DA"
        },
        "ascii": {
            "value": "þ",
            "visible": true,
            "char": "þ",
            "ebcdic": "AE"
        }
    },
    {
        "hex": "FF",
        "ebcdic": {
            "value": "*",
            "visible": true,
            "char": "*",
            "ascii": "2A",
            "equivalent": "5C"
        },
        "ascii": {
            "value": "ÿ",
            "visible": true,
            "char": "ÿ",
            "ebcdic": "DF"
        }
    }
]