import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { accountInfo } from '@/types'
import { ethers } from 'ethers';
const { get, post } = useHttp();
const password = `J5y2w0x1x2hjjy`;
const ketStore = `{"address":"09ea60fd4d1feae3eb0e070f2e6a221ce9ba1202","crypto":{"cipher":"aes-128-ctr","ciphertext":"b3a2f7a38bcbf434f7133c6deff16c2181ce944d4016a63b26d873f9fc6ae0c4","cipherparams":{"iv":"75d6faa411546657f7141f5a1952ea76"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"b8e503e5d0a1fdb766bf540dd4bedde5230d6624c73cb1b3ffcfc0e358e3e29a"},"mac":"04f50e07e8a21973ff732903338f678c5d92b307b96882b6a68e5171d5e7a323"},"id":"3fb95f05-ad69-40bc-9d06-dbe6bf7c1b34","version":3}`;

import useHttp from '../../services/useHttp';
export default function TabOneScreen() {
  const [address, setAddress] = useState('');
  const [accountInfo, setAccountInfo] = useState<accountInfo | null>(null);

  const getAccountInfo = async () => {
    setAccountInfo(null)
    const result = await get<accountInfo>(`/balance/${address}`);
    if (result.status === 200) {
      setAccountInfo(result.data)
    }
  }

  // const getAccountInfo = async () => {
  //   const result = await post('/balance/transfer/accounts', { body: { keystore: ketStore, password, toAddress: '0x0A549402005e01C7292fEdc768514b3c67509344', value: 1, gas: 21000, fromAddress: `0x09Ea60Fd4D1feAe3Eb0E070F2e6a221cE9bA1202` } })
  //   console.log(result)
  // }

  useEffect(() => {
    //  getPrivateKey().then((res) => {
    //   console.log(res, "asdsad")
    //  })

  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ethereum Address:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter Ethereum Address"
      />
      <Button title="Get Account Info" onPress={getAccountInfo} />

      {accountInfo && (
        <View style={styles.infoContainer}>
          <Text>Address: {accountInfo?.address}</Text>
          <Text>Balance: {accountInfo?.balance} ETH</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  infoContainer: {
    marginTop: 20,
  }
});
