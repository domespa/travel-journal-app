Ho iniziato questo progetto con l'intento di imparare cose nuove e mettermi alla prova su librerie mai usate, 
su "risorse" ho visto SUPABASE che faceva proprio al caso mio.
Per il frontend ho usato VITE con REACT perchè è perfetto per gestire siti SPA, mentre come detto sopra ho usato SUPABASE per gestire DB e CRUD.

GIORNO 1
Creazione dello scaffolding con Vite e setup iniziale di Supabase.
Creato date.js per gestire al meglio la formattazione delle date.
Creato componente AddNoteForm.jsx, testato e funzionante pronto da passare al genitore. 
Per lo stile sto utilizzando bootstrap(per i suoi breakpoint già impostati) perchè ho letto sempre da "risorse" qualcosa riguardo la PWA, 
quindi sto sviluppando in mobilefirst. 

GIORNO 2
Creazione componente NoteCard e anche questo pronto da passare al genitore. Creata funzione Helper per gestire al meglio le emoji.
Aggiunto ad App.jsx e funziona tutto come dovrebbe. 
In homepage penso che terrò solo i viaggi e poi tramite un button farò aprire una modale per l'aggiunta del viaggio. Userò reactPortal per farlo.

GIORNO 3
Come detto ieri ho sistemato la modalità di aggiunta viaggio tramite una modal, 
messa fuori il normale flusso per non creare probabili problemi al layout, con reactportal.
Mi sono copiato ed incollato dalla mia libreria, la searchbar e il debounce
(in questo progetto non credo serva visto che comunque non ci saranno così tante "chiamate", 
però ormai la uso come best practice in ogni mio progetto).
Aggiunto il context per rendere la pagina App.jsx con meno codice.
Ho preferito usare le modali per aprire la scheda del dettaglio viaggio, avrei potuto utilizzare 
react router e con useNavigate navigare per le pagine ma ho preferito cambiare.

GIORNO 4
Aggiunta una funzione per localizzare la posizione del nostro utente,
Con reactleaflet ho messo una mappa dove si riesce a tenere traccia dei viaggi e della posizione corrente.
