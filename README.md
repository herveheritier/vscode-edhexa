# Ed-Hexa : binary file edition with VS Code

## Purpose

Extension tool to edit binary EBCDIC and ASCII files 

## Capabilities

### available

Open EBCDIC file  
Open ASCII file  
Display character and hexa  
Edit character and hexa  
Append new record  
Update and Save Little File  
Choose record size
Read Big File
Update Extension Parameters

### in progress

Update and Save Big File
Tree View

### Modes
#### binary mode
In this mode, only binary values (hexa) count.  
You can change the charset on the fly, but this only affects the displayed characters, not the hexa code.  
In character editing, the current charset determines the hexa code.
#### charset mode
In this mode, the charset is fixed when the file is opened.  
You can change the charset on the fly, the characters will not change (if it exists in the chosen charset), but
 it will play on the hex code of each displayable character; as for the not displayable characters in the chosen charset
 they keep the same hexa code.
#### mixed mode
In this mode, each byte is associated with a status that can be set to either binary or character.
If the status is binary, the charset change does not change the hex code (thus changes the displayed character).
If the status is character, the charset change does not change the displayed character, but changes the hex code.
If the displayed character does not exist in the chosen charset, then the hex code is not changed.
The user must be able to toggle the status of each byte.
For this mode, the status must be saved with the file.
We will see to propose a line mode (same distribution of status from one line to another)
 and a file mode (each byte of the file has its status).
#### complex mode
In this mortgage mode, each file is accompanied by a description (grammar?) which will play on
 its composition (charset, status, ...)