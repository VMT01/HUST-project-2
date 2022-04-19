import { NotFoundException } from '@nestjs/common';

const Web3 = require('web3-eth');

export const getWeb3ProviderLink = () => {
    const PROVIDER = process.env.PROVIDER;
    console.log(PROVIDER);
    
    return PROVIDER;
};

export const getWeb3 = () => {
    const provider = getWeb3ProviderLink();
    if (!provider) throw new NotFoundException('Missing Provider');
    return new Web3(provider);
};
