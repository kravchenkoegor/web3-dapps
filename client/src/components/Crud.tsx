import React, { useState, useEffect } from 'react'
import { TWeb3 as Web3 } from '../getWeb3';
import { CrudContract } from '../contracts';

interface IProps {
  web3: Web3;
  sender: string;
}

interface IUser {
  id: string;
  name: string;
}

const Crud: React.FC<IProps> = ({ web3, sender }) => {
  const [contract, setContract] = useState<any | null>(null);

  const [input, setInput] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);

  const createUser = async () => {
    await contract.methods.createUser(input).send();
    setUsers(await getAllUsers());
  };

  const getUserByIndex = async () => {
    const index = prompt('Type an integer');
    try {
      const user = await contract.methods.getUser(Number(index)).call() ?? [];
      console.log(user);
    } catch (error: any) {
      alert(`${error.message}`);
    }
  };

  const updateUser = async (id: string) => {
    const newName = prompt('Type new name');
    await contract.methods.updateUser(id, newName).send();
    setUsers(users.map(user => {
      return {
        ...user,
        name: user.id === id ? `${newName}` : user.name
      }
    }));
  };

  const deleteUser = async (id: string) => {
    await contract.methods.deleteUser(id).send();
    setUsers(users.filter(user => user.id !== id));
  };

  const getAllUsers = async () => {
    const _users: IUser[] = (await contract.methods.getAllUsers().call() ?? [])
      .map(([id, name]: [string, string]) => ({ id, name }))
      .filter(({ id, name }: IUser) => (id !== '0' && Boolean(name)));
    return _users;
  };

  useEffect(() => {
    console.log('useeffect')

    const initContract = async () => {
      const networkId = await web3.eth.net.getId();
      const contract = new web3.eth.Contract(
        // @ts-ignore
        CrudContract.abi,
        // @ts-ignore
        CrudContract.networks[networkId]?.address,
        { from: sender }
      )
      setContract(contract);

      const users = (await contract.methods.getAllUsers().call() ?? [])
        .map(([id, name]: [string, string]) => ({ id, name }))
        .filter(({ id, name }: IUser) => (id !== '0' && Boolean(name)));
      setUsers(users);
    };

    initContract();
  }, []);

  return (
    <div>
      <div className='mb-3' style={{maxWidth: '400px'}}>
        <input
          className="form-control"
          onInput={e => setInput((e.target as HTMLInputElement).value)}
          placeholder="User name"
        />
      </div>

      <button
        className='btn btn-danger me-3'
        onClick={createUser}
      >
        Add user
      </button>
      <button
        className='btn btn-warning me-3'
        onClick={getUserByIndex}
      >
        Get user
      </button>
      <button
        className='btn btn-success'
        onClick={getAllUsers}
      >
        Get all users
      </button>

      <div className='mt-3'>
        <ul>
          {users.map(({ id, name }) => (
            <li key={id}>
              <p className='mb-2'>{id}. {name}</p>
              <button
                type="button"
                className="btn btn-danger btn-sm me-2"
                onClick={() => deleteUser(id)}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => updateUser(id)}
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Crud;
