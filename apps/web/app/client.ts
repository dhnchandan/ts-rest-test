import { initQueryClient } from '@ts-rest/react-query';
import { contract} from "@ts-rest-test/contracts/dist";

const client = initQueryClient(contract, {
    baseUrl: 'http://localhost:3333',
    baseHeaders: {},
    jsonQuery: true,
});

export default client;