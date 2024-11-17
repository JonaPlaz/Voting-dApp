import { createPublicClient, http } from 'viem'
import { holesky } from 'viem/chains'

const RPC = process.env.NEXT_PUBLIC_HOLESKY_RPC || "";

export const publicClient = createPublicClient({
  chain: holesky,
  transport: http(RPC),
})