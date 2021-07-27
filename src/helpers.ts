import axios, { AxiosInstance } from 'axios'
import util from 'util'

export function newClient() {
  return axios.create({
    baseURL: 'http://localhost:8080',
  })
}

export async function setSchema(client: AxiosInstance) {
  const schema = `
    type Oca {
      dri: String! @id
      name: String! @search(by: [term, hash])
      attributes: [Attribute!]! @hasInverse(field: oca)
      data: [Datum!]! @hasInverse(field: oca)
      entities: [Entity!]! @hasInverse(field: oca)
    }

    type Attribute {
      name: String! @id
      type: String!
      oca: [Oca!]!
    }

    type Entity {
      id: String! @id
      data: [Datum!]! @hasInverse(field: entities)
      oca: [Oca!]!
    }

    type Datum {
      id: String! @id
      name: String! @search(by: [hash])
      type: String! @search(by: [hash])
      value: String! @search(by: [exact])
      oca: [Oca!]!
      entities: [Entity!]!
    }
  `

  const r = await client.post('/admin/schema', schema)
  console.log(
    util.inspect(r.data, false, null, true)
  )
}

export async function addOca(client: AxiosInstance, oca: any) {
  const query = `
    mutation addOca($oca: [AddOcaInput!]!) {
      addOca(input: $oca) {
        oca {
          dri
        }
      }
    }
  `

  const result = await client.post('/graphql', JSON.stringify({
    query,
    variables: {
      oca: oca
    }
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
  console.log(result.data)
}

export async function addEntity(client: AxiosInstance, entity: any) {
  const query = `
    mutation addEntity($entity: [AddEntityInput!]!) {
      addEntity(input: $entity, upsert: true) {
        entity {
          id
          data {
            name
            type
            value
          }
        }
      }
    }
  `

  const result = await client.post('/graphql', JSON.stringify({
    query,
    variables: {
      entity: entity
    }
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
  console.log(result.data)
}

export async function queryOca(client: AxiosInstance) {
  const query = `query {
    queryOca {
      dri
      name
      data {
        name
        type
        value
      }
      attributes {
        name
        type
      }
      entitiesAggregate { 
        count
      }
    }
  }`
  const results = await client.post('/graphql', JSON.stringify({ query }), {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })

  console.log('=== All OCAs: ===')
  console.log(
    util.inspect(
      results.data.data.queryOca,
      false, null, true
    )
  )
}

export async function queryEntity(client: AxiosInstance) {
  const query = `query {
    queryEntity {
      id
      data {
        name
        type
        value
      }
      oca {
        dri
        name
      }
    }
  }`
  const results = await client.post('/graphql', JSON.stringify({ query }), {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })

  console.log('=== All Entities: ===')
  console.log(
    util.inspect(
      results.data.data.queryEntity,
      false, null, true
    )
  )
}

export async function query(client: AxiosInstance) {
  const query = `query {
    queryEntity @cascade {
      id
      filteredData: data(filter: {
        or: [
          { and: [ { name: { eq: "age" } }, { value: { ge: "20" } } ] },
          { and: [ { name: { eq: "first_name" } }, { value: { eq: "Alice" } } ] }
        ]
      }) {
        name
        type
        value
      }
      filteredOca: oca(filter: {
        or: [
          { name: { eq: "b" } }
        ]
      }) {
        dri
        name
      }
      ocaAggregate {
        count
      }
      data {
        name
        type
        value
      }
      oca {
        dri
        name
      }
    }
  }`
  const results = await client.post('/graphql', JSON.stringify({ query: query }), {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })

  const entities = results.data.data.queryEntity
    .filter((el: any) => el.filteredData.length === 2 && el.filteredOca.length === 1 )
    .map((el: any) => {
      delete el.filteredData
      delete el.filteredOca
      return el
    })

  console.log('=== Filtered Entities (data: age >= 20 && first_name is "Alice", schemas: name is "b" ): ===')
  console.log(
    util.inspect(
      entities,
      false, null, true
    )
  )
}
