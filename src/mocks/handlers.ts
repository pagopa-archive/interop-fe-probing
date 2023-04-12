import { rest } from 'msw'

export const handlers = [
  rest.get('http://localhost:3000/eservices/searchEservices', (req, res, ctx) => {
    const mockResponse = {
      content: [
        {
          id: '2',
          eserviceName: 'Anagrafica comunale',
          producerName: 'Comune di Torino',
          responseReceived: null,
          state: 'OFFLINE',
          versionNumber: 8,
        },
        {
          id: '1',
          eserviceName: 'Anagrafica comunale',
          producerName: 'Comune di Milano',
          responseReceived: null,
          state: 'ONLINE',
          versionNumber: 7,
        },
        {
          id: '3',
          eserviceName: 'Anagrafica comunale',
          producerName: 'Comune di Torino',
          responseReceived: null,
          state: 'ONLINE',
          versionNumber: 7,
        },
        {
          id: '10',
          eserviceName: 'Erogazione borse di studio',
          producerName:
            'A.Di.S.U.R.C. Azienda per Il Diritto allo Studio Universitario della Regione Campania',
          responseReceived: null,
          state: 'ONLINE',
          versionNumber: 1,
        },
        {
          id: '11',
          eserviceName: 'Funzionamento pannelli solari',
          producerName: 'Comune di Brindisi',
          responseReceived: null,
          state: 'ONLINE',
          versionNumber: 1,
        },
        {
          id: '4',
          eserviceName:
            'Posizione centraline ambientali con un nome davvero molto molto molto lungo',
          producerName: 'Comune di Pescara',
          responseReceived: null,
          state: 'ONLINE',
          versionNumber: 1,
        },
        {
          id: '5',
          eserviceName: 'Postazioni e-bike',
          producerName: 'Comune di Roma',
          responseReceived: null,
          state: 'OFFLINE',
          versionNumber: 1,
        },
        {
          id: '6',
          eserviceName: 'Stato colonnine di ricarica auto elettriche',
          producerName: 'Comune di Bari',
          responseReceived: null,
          state: 'OFFLINE',
          versionNumber: 1,
        },
        {
          id: '7',
          eserviceName: 'Stato lavori Olimpiadi 2026',
          producerName: 'Comune di Milano',
          responseReceived: null,
          state: 'ONLINE',
          versionNumber: 1,
        },
        {
          id: '8',
          eserviceName: 'Stato opere PGT 2030',
          producerName: 'Comune di Trento',
          responseReceived: '2023-12-01T14:20:15.995Z',
          state: 'n/d',
          versionNumber: 1,
        },
      ],
      offset: 0,
      limit: 10,
      totalElements: 11,
    }

    return res(ctx.json(mockResponse))
  }),
]
