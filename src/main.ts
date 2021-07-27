import {
  newClient, setSchema,
  addOca, addEntity, queryOca, queryEntity, query
} from './helpers'

import {
  oca_a, oca_b,
  entity1_a, entity2_a, entity2_b
} from './seed'

async function main() {
    const axiosClient = newClient()

    await setSchema(axiosClient)
    await new Promise(r => setTimeout(r, 1000))

    await addOca(axiosClient, oca_a)
    await addOca(axiosClient, oca_b)
    await addEntity(axiosClient, entity1_a)
    await addEntity(axiosClient, entity2_a)
    await addEntity(axiosClient, entity2_b)

    await queryOca(axiosClient)
    await queryEntity(axiosClient)
    await query(axiosClient)
}

main()
    .then(() => {
        console.log("\nDONE!");
    })
    .catch((e) => {
        console.log("ERROR: ", e);
    });
