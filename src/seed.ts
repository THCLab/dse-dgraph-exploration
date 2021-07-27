export const oca_a = {
  dri: 'A123',
  name: 'a',
  attributes: [
    { name: 'first_name', type: 'Text' },
    { name: 'age', type: 'Number' }
  ],
  data: [],
  entities: []
}

export const oca_b = {
  dri: 'B123',
  name: 'b',
  attributes: [
    { name: 'first_name', type: 'Text' },
    { name: 'last_name', type: 'Text' }
  ],
  data: [],
  entities: []
}

export const entity1_a = {
  id: 'DID:asd123',
  data: [
    {
      id: 'first_name-Text-Bob',
      name: 'first_name', type: 'Text', value: 'Bob',
      oca: { dri: oca_a.dri }
    },
    {
      id: 'age-Number-20',
      name: 'age', type: 'Number', value: '20',
      oca: { dri: oca_a.dri }
    }
  ],
  oca: [{ dri: oca_a.dri }]
}

export const entity2_a = {
  id: 'DID:asd456',
  data: [
    {
      id: 'first_name-Text-Alice',
      name: 'first_name', type: 'Text', value: 'Alice',
      oca: { dri: oca_a.dri }
    },
    {
      id: 'age-Number-52',
      name: 'age', type: 'Number', value: '52',
      oca: { dri: oca_a.dri }
    }
  ],
  oca: [{ dri: oca_a.dri }]
}

export const entity2_b = {
  id: 'DID:asd456',
  data: [
    {
      id: 'first_name-Text-Alice',
      name: 'first_name', type: 'Text', value: 'Alice',
      oca: { dri: oca_b.dri }
    },
    {
      id: 'last_name-Text-Jones',
      name: 'last_name', type: 'Text', value: 'Jones',
      oca: { dri: oca_b.dri }
    }
  ],
  oca: [{ dri: oca_b.dri }]
}
