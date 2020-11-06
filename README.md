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
Save file  

### in progress

Choose record size

### Les modes
#### mode binaire
Dans ce mode, seules les valeurs binaires (hexa) comptent.  
On peut changer de charset à la volée, mais cela ne joue que sur les caractères affichés, pas sur le code hexa.  
En édition de caractère, c'est le charset en cours qui détermine le code hexa.
#### mode charset
Dans ce mode, le charset est fixé à l'ouverture.  
On peut changer de charset à la volée, les caractères ne changeront pas (si il existe dans le charset choisi), mais
 cela jouera sur le code hexa de chaque caractère affichable ; quant aux caractères non affichable dans le charset choisi
 ils conservent le même code hexa.
#### mode mixte
Dans ce mode, à chaque octet est associé un status qui peut être soit fixé à binaire, soit fixé à caractère.
Si le status est binaire, le changement de charset ne change pas le code hexa (donc change le caractère affiché).
Si le status est caractère, le changement de charset ne change pas le caractère affiché, mais change le code hexa.
Si le caractère affiché n'existe pas dans le charset choisi, alors le code hexa n'est pas transformé.
L'utilisateur doit pouvoir basculer le status de chaque octet.
Pour ce mode, le status doit pouvoir être enregistré avec le fichier.
On verra pour proposer un mode ligne (même répartition des status d'une ligne à l'autre)
 et un mode fichier (chaque octet du fichier à son status).
#### mode complexe
Dans ce mode hypothètique, chaque fichier est accopagné d'une description (grammaire?) qui va jouer sur
 sa composition (charset, status, ...)