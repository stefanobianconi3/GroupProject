# Pros Chain #

Questo repository è solo per fini scolastici. Qualunque azione non autorizzata è severamente vietata.

Università degli Studi di Camerino. 
Autori:
* Daniele Moscati.
* Stefano Bianconi.
* Gian Marco Pazzaglia.

# Descrizione #

Il progetto si basa sulla creazione di una single-web-page application di tipo BPMN

# Strumenti utilizzati #

Qui di seguito saranno elencati gli strumenti utilizzati per il progetto

Lato Client:

* Angular 6
* bpmn.io
* Bootstrap 4
* Angular 2 Tree
* Material Design for Bootstrap
* ChartJS
* CoreJS
* Font Awesome
* HammerJS
* Jquery
* PopperJS
* RxJS
* ZoneJS

Lato Server:

* NodeJS
* ExpressJS
* Bcrypt
* Cors
* Helmet
* JsonWebToken
* Morgan
* MySQL
* Nodemailer
* Rimraf

# Requisiti #

Per poter usare correttamente questo software, occore installare **NodeJS** alla versione 9.x o superiore

# Istruzioni #

1. Scaricare questo progetto nel vostro computer
2. Posizionarsi nella cartella, in modo tale da vedere il seguente albero:
    * client
    * server
    * package.json
    * README.md
3. Eseguire il comando `npm install -g concurrently`. Se siete in un ambiente Linux, utilizzare i permessi di superuser
4. Eseguire il comando `npm run-script setup`. Se siete in un ambiente Linux, utilizzare i permessi di superuser
5. Per avviare il programma, eseguire il comando `npm start`. Se siete in un ambiente Linux, utilizzare i permessi di superuser
6. Per utilizzare l'app, aprire il browser e collegarsi alla pagina **http://localhost:4200/**

# Bug #

Qui sarà presente una lista bug. Premessa: il sito non è responsive al 100%. Problemi legati a ciò non saranno elencati. Inoltre, per godere una migliore esperienza con l'applicazione, è consigliato utilizzare Google Chrome come browser.

# Future Work (Ideas) #

* Aggiungere una funzionalità che permetta di avere una miniatura in anteprima del modello (quando si sceglie la versione del modello da selezionare)
* Menù con disposizione bottoni personalizzabile (possibilità di cambiare la disposizione dei bottoni)
* Permettere gestione altri file, non solo .bpmn (xes, xes.gz, mxml, mxml.gz, zip, aml, bpmn, epml, yawl, xpdl, pnml)
