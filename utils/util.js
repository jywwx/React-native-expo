import { ethers } from 'ethers';
export const getPrivateKey = async () => {
  try {
    const password = `J5y2w0x1x2hjjy`;
    const ketStore = `{"address":"09ea60fd4d1feae3eb0e070f2e6a221ce9ba1202","crypto":{"cipher":"aes-128-ctr","ciphertext":"b3a2f7a38bcbf434f7133c6deff16c2181ce944d4016a63b26d873f9fc6ae0c4","cipherparams":{"iv":"75d6faa411546657f7141f5a1952ea76"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"b8e503e5d0a1fdb766bf540dd4bedde5230d6624c73cb1b3ffcfc0e358e3e29a"},"mac":"04f50e07e8a21973ff732903338f678c5d92b307b96882b6a68e5171d5e7a323"},"id":"3fb95f05-ad69-40bc-9d06-dbe6bf7c1b34","version":3}`;
    const wallet = await ethers.Wallet.fromEncryptedJson(ketStore, password);
    console.log("Private Key:", wallet.privateKey);
    console.log("Address", wallet.address)
    return wallet.privateKey;

  } catch (error) {
    console.log(error);
  }
};
