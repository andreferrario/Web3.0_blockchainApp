import React, { useState, useEffect } from 'react';

import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';



export const TransactionContext = React.createContext();


const { ethereum } = window;


const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);

    const signer = provider.getSigner();

    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}



export const TransactionProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);

    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount') || 0);

    const [currentAccount, setCurrentAccount] = useState('');

    const [transaction, setTransaction] = useState([])

    const [formData, setFormData] = useState({
        addressTo : '',
        amount : '',
        keyword : '',
        message : ''
    })

    const handleChange = (e, name) => {
        setFormData((prevState) => ({
            ...prevState, [name] : e.target.value
        }))
    }


    const getAllTransactions = async () => {
        try {

            if(!ethereum) return alert('Please install MetaMask');
            const transactionContract = getEthereumContract();
            const availableTransaction = await transactionContract.getAllTransaction();
            

            const structuredTransaction = availableTransaction.map((transaction) =>  ({
                addressTo : transaction.reciver,
                addressFrom : transaction.sender,
                timestamp : new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message : transaction.message,
                keyword : transaction.keyword,
                amount : parseInt(transaction.amount._hex) / (10 ** 18)
            }))

            setTransaction(structuredTransaction);

            console.log(structuredTransaction);
        } catch (error) {
            console.error(error);
        }
            
        
    }

    const checkIfTheWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert('Per piacere installa MetaMask')

            const account = await ethereum.request({ method: 'eth_accounts' });

            if (account.length) {
                setCurrentAccount(account[0]);

                getAllTransactions();
            } else {
                console.log('No account found');
            }

            console.log({ account })
        } catch (error) {

            throw new Error("No etherium object...");

        }

    }

    const checkIfTransactionExist = async () => {
        try{
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem('transactionCount', transactionCount);

        } catch (error) {

            throw new Error("No etherium object...");
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert('Per piacere installa MetaMask')

            const account = await ethereum.request({ method: 'eth_requestAccounts' });


            setCurrentAccount(account[0]);

        } catch (error) {
            console.log(error)

            throw new Error("No etherium object...");
        }
    }


    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert('Per piacere installa MetaMask')
            
            // ottieni i dati dal form

            const { addressTo, amount, keyword, message } = formData;

            const trasactionContract = getEthereumContract();

            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({ method: 'eth_sendTransaction',
                params: [{
                        from: currentAccount,
                        to: addressTo,
                        gas: '0x5208', // 21000 GWEI
                        value: parsedAmount._hex, 
                    }]
                });

            const transactionHash = await trasactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword)
            

            setIsLoading(true);

            console.log('Transaction hash: ', transactionHash.hash);
            
            await transactionHash.wait();

            setIsLoading(false);

            console.log('Transaction completed');

            const transactionCount = await trasactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());

            // ricarica la pagina
            window.location.reload();
        } catch (error) {
            throw new Error("No etherium object...");
            
        }
    }


    useEffect(() => {
        checkIfTheWalletIsConnected()
        checkIfTransactionExist()
    }, [])


    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction , transaction, isLoading}}>
            {children}
        </TransactionContext.Provider>
    )
}
