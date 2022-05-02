// @ts-nocheck
import React, { useState, useEffect } from 'react';
import {
  Contract,
  getWeb3,
  TWeb3 as Web3
} from './getWeb3';
import {
  AdvancedStorageContract,
  SimpleStorageContract
} from './contracts';
import { CrudComponent } from './components';

interface IAppState {
  web3: Web3 | null;
  sender: string;
  contracts: Record<string, Contract> | null;
  simpleStorageData: string;
}

function App() {
  const [state, setState] = useState<IAppState>({
    web3: null,
    sender: '',
    contracts: null,
    simpleStorageData: '',
  });

  const init = async () => {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();
    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();

    const networkId = await web3.eth.net.getId();
    const simpleStorageInstance = new web3.eth.Contract(
      SimpleStorageContract.abi,
      SimpleStorageContract.networks[networkId]?.address,
      { from: accounts[0] }
    );
    const advancedStorageInstance = new web3.eth.Contract(
      AdvancedStorageContract.abi,
      AdvancedStorageContract.networks[networkId]?.address,
      { from: accounts[0] }
    );

    setState({
      ...state,
      web3,
      sender: accounts[0],
      contracts: {
        simpleStorage: simpleStorageInstance,
        advancedStorage: advancedStorageInstance
      },
    });
  }

  const setData = async () => {
    await state.contracts.simpleStorage.methods.setData(666).send();
    const response = await state.contracts.simpleStorage.methods.getData().call();
    setState({
      ...state,
      simpleStorageData: response
    });
  }

  const advancedStorageMethods = {
    async add() {
      const id = prompt('Type integer');
      await state.contracts.advancedStorage.methods.add(Number(id)).send();
    },

    async getAll() {
      const res = await state.contracts.advancedStorage.methods.getAll().call();
      console.log({ res });
    },

    async getIdsLength() {
      const res = await state.contracts.advancedStorage.methods.getIdsLength().call();
      console.log({ res });
    }
  }

  useEffect(() => {
    init();
  });
  
  return (
    <div className="App">
      {!state.web3
        ? <p>Loading...</p>
        : (
          <div className="py-5 container">
            <h2>Smart Contract Example</h2>
            <p>Your wallet address: {state.sender}</p>

            <div className="row">
              <div className="col-12">
                <button
                  className="btn btn-primary mb-2"
                  onClick={setData}
                >
                  simpleStorage.setData
                </button>
                <p style={{ fontWeight: 'bold' }}>
                  {state.simpleStorageData}
                </p>
              </div>
              <div className="col-12">
                <button
                  className="btn btn-success me-3"
                  onClick={advancedStorageMethods.add}
                >
                  advancedStorage.add
                </button>
                <button
                  className="btn btn-success me-3"
                  onClick={advancedStorageMethods.getAll}
                >
                  advancedStorage.getAll
                </button>
                <button
                  className="btn btn-success"
                  onClick={advancedStorageMethods.getIdsLength}
                >
                  advancedStorage.getIdsLength
                </button>
              </div>

              <div className="col-12 mt-4">
                <CrudComponent
                  web3={state.web3}
                  sender={state.sender}
                />
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default App;
