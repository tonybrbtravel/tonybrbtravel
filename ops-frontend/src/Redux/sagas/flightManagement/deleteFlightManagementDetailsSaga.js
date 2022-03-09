import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Auth } from "aws-amplify";

//const apiUrl = 'https://jsonplaceholder.typicode.com/users';
const apiUrl = process.env.REACT_APP_OPS_URL + '/ops/flightCarrier/';
//const token = 'eyJraWQiOiJRR256NFVXTGVYRE15cE5xOFR6VjdLREpCM29Dd0YxZmg5RStaRFdLZkZzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzNGU5Y2U0Ny1iNGNkLTRhNzMtYTkyYi0yYzY4MmVhNTI5M2IiLCJhdWQiOiI3cTA1MGF2cGI1b2tmOWdqcTRxNmg2NDU5YiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjU4ZTUzZWVmLTc1MjAtNDc2NS1iYzhiLTIxNGY3ZDVjNzc5MyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjI2ODQyODY0LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9jRk82dm5Wc2wiLCJjdXN0b206dXNlcl9pZCI6IjE5IiwiY29nbml0bzp1c2VybmFtZSI6IjM0ZTljZTQ3LWI0Y2QtNGE3My1hOTJiLTJjNjgyZWE1MjkzYiIsImV4cCI6MTYyNjg0NjQ2NCwiaWF0IjoxNjI2ODQyODY0LCJlbWFpbCI6Im1haGFsYWtzaG1pLnZAdmFsdWVsYWJzLmNvbSJ9.obl2jd7lqgr3-tESLbZmqWBAhM6RBLJeI4ZSs3Jqlb8pJWI8aG0cQUqoeRfo4KXDtscCmUwWnWxKIt9fhBjzjqrrptL2sKrvbB1q5STD_fPCr7KzAQQOsD--e30AyHvuXr55q9_8HZk6q6WrAXiyxO0I5CEQV-iCLWyPs-BFkaQJcV4xNGmOTL6EbyHnK3IiJ_ZSOiBgzS4vUjTOqnu1X48KCRi3QsnlxqSWQP4Pr26D4_D9gcp9-f7gPIUYfOD9ormAbp_po4ZfsMZXO7B1tUPTtdNxN_bWdH4M72SyJ6G0xCw9y0un1hfzCnQ7aFo0mg9jNv3rxDX-MIIZN8zJAg'

async function deleteApi(id) {
  const session = await Auth.currentSession();
  const token = session.idToken.jwtToken;
    return axios({
        url: apiUrl+id,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        return response;
      });
}

function* deleteFlightsDetails(action) {
    try {
        const response = yield call(deleteApi,action.payload);
        yield put({ type: 'DELETE_FLIGHTS_SUCCESS', deleteflight : response })
    } catch (e) {
        yield put({ type: 'DELETE_FLIGHTS_FAILED', message: e.message })
    }
}

function* deleteFlightsDetailsSaga(){
    yield takeEvery('DELETE_FLIGHTS_REQUESTED', deleteFlightsDetails)
}

export default deleteFlightsDetailsSaga;