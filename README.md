# interop-fe-probing
Frontend dell'applicazione per il monitoraggio degli e-service a catalogo PDND

## Installazione delle dipendenze
Per l'installazione delle dipendenze utilizzare il comando `npm install`

## Lancio dell'applicazione in locale
Per il lancio dell'applicazione in locale utilizzare il comando `npm run dev` e valorizzare le variabili d'ambiente nel seguente modo:
- VITE_API_ENDPOINT: dominio del backend
- VITE_REACT_QUERY_STALE_TIME: tempo (in millisecondi) di vita dei dati in cache
- VITE_PAGINATION_LIMIT: limite massimo sul numero di elementi da mostrare nelle tabelle

## Pacchetto di produzione
Per generare il pacchetto di produzione utilizzare il comando `npm run build`

## Test
Per lanciare i test in locale utilizzare il comando `npm run test`. <br/>
Per lanciare i test con coverage, usare il comando `npm run coverage`.
