#Oppgave 3

1. git init //Sette opp nytt repo i Github
2. git checkout -b dev //Lage dev branch lokalt
3. vi hiof.js //lager en fil og endrer inhold med innebygd ui
   git add hiof.js //leger til filen i dev branchen
4. git commit -m "made some changes to js" hiof.js //commint js fil and adding a commit message
5. git push --set-upstream origin dev //Pushe endringene til repo
6. //lager en fil i github i samme branch (dev)
   git fetch //henter alle endinger
   git pull //lagrer endringene lokalt
