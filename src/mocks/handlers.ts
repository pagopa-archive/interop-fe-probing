import { rest } from 'msw'

export const handlers = [
  rest.get('http://localhost:3000/eservices', (req, res, ctx) => {
    const mockResponse = {
      content: [
        {
          id: '2',
          eserviceName: 'Anagrafica comunale',
          producerName: 'Comune di Torino',
          state: 'OFFLINE',
          versionNumber: 8,
        },
        {
          id: '1',
          eserviceName: 'Anagrafica comunale',
          producerName: 'Comune di Milano',
          state: 'ONLINE',
          versionNumber: 7,
        },
        {
          id: '3',
          eserviceName: 'Anagrafica comunale',
          producerName: 'Comune di Torino',
          state: 'ONLINE',
          versionNumber: 7,
        },
        {
          id: '10',
          eserviceName: 'Erogazione borse di studio',
          producerName:
            'A.Di.S.U.R.C. Azienda per Il Diritto allo Studio Universitario della Regione Campania',
          state: 'ONLINE',
          versionNumber: 1,
        },
        {
          id: '11',
          eserviceName: 'Funzionamento pannelli solari',
          producerName: 'Comune di Brindisi',
          state: 'ONLINE',
          versionNumber: 1,
        },
        {
          id: '4',
          eserviceName:
            'Posizione centraline ambientali con un nome davvero molto molto molto lungo',
          producerName: 'Comune di Pescara',
          state: 'ONLINE',
          versionNumber: 1,
        },
        {
          id: '5',
          eserviceName: 'Postazioni e-bike',
          producerName: 'Comune di Roma',
          state: 'OFFLINE',
          versionNumber: 1,
        },
        {
          id: '6',
          eserviceName: 'Stato colonnine di ricarica auto elettriche',
          producerName: 'Comune di Bari',
          state: 'OFFLINE',
          versionNumber: 1,
        },
        {
          id: '7',
          eserviceName: 'Stato lavori Olimpiadi 2026',
          producerName: 'Comune di Milano',
          state: 'ONLINE',
          versionNumber: 1,
        },
        {
          id: '8',
          eserviceName: 'Stato opere PGT 2030',
          producerName: 'Comune di Trento',
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

  rest.get('http://localhost:3000/producers', (req, res, ctx) => {
    const mockResponse = [
      {
        label: 'producer2',
        value: 'producer2',
      },
    ]
    return res(ctx.json(mockResponse))
  }),

  rest.get('http://localhost:3000/eservices/mainData/', (req, res, ctx) => {
    const mockResponse = {
      eserviceName: 'Probing test 3',
      producerName: 'Comune di Milano',
      versionNumber: '7',
      pollingFrequency: 5,
    }
    return res(ctx.json(mockResponse))
  }),

  rest.get('http://localhost:3000/eservices/probingData/', (req, res, ctx) => {
    const mockResponse = {
      probingEnabled: true,
      state: 'offline',
      responseReceived: '2023-04-27T14:55:25Z',
      eserviceActive: false,
    }
    return res(ctx.json(mockResponse))
  }),

  rest.get('http://localhost:3000/telemetryData/eservices/', (req, res, ctx) => {
    const mockResponse = {
      values: [
        {
          responseTime: 640,
          status: 'OK',
          time: '2023-05-16T13:17:01.579Z',
        },
        {
          responseTime: 98,
          status: 'OK',
          time: '2023-05-16T13:33:07.271Z',
        },
        {
          responseTime: 6,
          status: 'OK',
          time: '2023-05-16T13:39:01.371Z',
        },
      ],
      percentages: [
        {
          value: 94.28572,
          status: 'OK',
        },
        {
          value: 5.714286,
          status: 'KO',
        },
      ],
    }
    return res(ctx.json(mockResponse))
  }),
]
