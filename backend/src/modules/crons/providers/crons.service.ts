import { EAddressType } from '@constants/entity.constant';
import { AddressEntity } from '@entities/Address.entity';
import { AddressRepository } from '@modules/addresses/providers/Address.repository';
import { Processor, Process } from '@nestjs/bull';
import { Connection } from '@shared/modules/web3/providers/web3.service';
import { Job } from 'bull';

@Processor('address')
export class AddressConsumer {
  constructor(
    private readonly addressRepo: AddressRepository,
    private readonly web3Service: Connection
  ) { }
  @Process()
  async checkAddress(job: Job<unknown>) {
    console.log(job.id);
    
    try {
      
    const address = job.data as string;
    
    
    if(!address) return;
    const isExist = await this.addressRepo.getOne({ address })
    
    if (isExist) {
      
     // console.log("Address exist: ", isExist.id);
      return;
    }
    
    let newAddress={
      address:null,
      type:1
    };
    
    newAddress.address = address;
    
    const isSC = await this.web3Service.isSmartContract(address)
    newAddress.type = isSC ? EAddressType.CONTRACT : EAddressType.WALLET;
    
   await this.addressRepo.createOne(newAddress);
    return;
    } catch (error) {
      console.log(error.message);
    return;      
    }

  }

}