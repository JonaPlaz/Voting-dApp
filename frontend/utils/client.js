import { createPublicClient, http } from 'viem'
import { hardhat, holesky } from 'viem/chains'

export const publicClient = createPublicClient({ 
  chain: hardhat,
  transport: http(process.env.RPC)
})