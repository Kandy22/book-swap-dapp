import React, { useState, useEffect } from 'react'
import {
  Button,
  StylesProvider,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useParams, useLocation } from 'react-router-dom'
import './CovalentGetNfts.css'

function CovalentGetNfts({ account, providerSave }) {
  const { recipeId } = useParams()
  const [loading, setLoading] = useState(false)
  const userWallet = '0xAF67cbD8fb00759C3b4667beAcfBB3600e25476A'
  const [nfts, setNfts] = useState({})
  const [items, setItems] = useState([])
  const [insideItems, setInsideItems] = useState([])
  const [allInfoForBookSwap, setAllInfoForBookSwap] = useState([])
  const [donatedNFTForBookSwap, setDonatedNFTForBookSwap] = useState([])

  console.log(' allInfoForBookSwap', allInfoForBookSwap)
  console.log(' donatedNFTForBookSwap', donatedNFTForBookSwap)

  const [data, setData] = useState({})
  const [ensNameInput, setEnsNameInput] = useState('albert.eth')
  const { state = {} } = useLocation()

  const covalentNfts = async () => {
    // let ENSName = await providerSave.resolveName(ensNameInput)
    let ENSName = '0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C'
    if (!ENSName) {
    }
    const covalentAPI = 'ckey_2d7edb40645d4d74bb59eab31d9'

    const i = `https://api.covalenthq.com/v1/137/address/0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=ckey_d4115699196e4d238fa138e180c`
    try {
      const nfts = await fetch(
        'https://api.covalenthq.com/v1/137/address/0x11760DB13aE3Aa5Bca17fC7D62172be2A2Ea9C11/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=ckey_2d7edb40645d4d74bb59eab31d9',
      )

      // const nfts = await fetch(
      //   `https://api.covalenthq.com/v1/137/address/${ENSName}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=${covalentAPI}`,
      // )
      const allNFTS = await nfts.json()
      console.log('allNFTS', allNFTS)
      const nftPortIsAtFor = allNFTS.data.items[4]

      if (allNFTS) {
        const allData = allNFTS?.data?.items[4]
        setAllInfoForBookSwap(allData)
        const onlyNFTs = allData?.nft_data
        setDonatedNFTForBookSwap(onlyNFTs)

        setNfts(allNFTS)
        setItems(allNFTS?.data?.items)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setLoading(true)
    covalentNfts()
  }, [])

  useEffect(() => {
    const getImage = (ipfsURL) => {
      if (!ipfsURL) return
      ipfsURL = ipfsURL.split('://')
      return 'https://ipfs.io/ipfs/' + ipfsURL[1]
    }

    const getMetadata = async () => {
      let data = await fetch(`https://ipfs.io/ipfs/${recipeId}/metadata.json`)
      data = await data.json()
      const dataArray = data.description.split(',')
      data.creator = dataArray[0]
      data.type = dataArray[1]
      data.intro = dataArray[2]
      data.image = getImage(data.image)
      setData(data)
    }
    if (recipeId) {
      getMetadata()
      getImage()
    }
  }, [recipeId, account])

  return (
    <StylesProvider injectFirst>
      <Container style={{ paddingTop: '2.4rem', paddingBottom: '4rem' }}>
        {loading ? (
          <h1 className="text-center ">Fetching Nfts...</h1>
        ) : (
          <div>
            {allInfoForBookSwap ? (
              <div>
                <h3 className="text-center">All Tokens by Wallet Adddress</h3>
                <br />
                <p className="text-center">
                  We keep our transactions transparent and open to the public..{' '}
                  <br />
                  <strong>Powered by Covalent.</strong>
                </p>
                <br />
                <p className="info">
                  <strong> Contract Name: </strong>{' '}
                  {allInfoForBookSwap.contract_name}
                </p>
                <p className="info">
                  <strong> Contract Symbol: </strong>{' '}
                  {allInfoForBookSwap.contract_ticker_symbol}
                </p>
                <p className="info">
                  <strong> Contract Address: </strong>{' '}
                  {allInfoForBookSwap.contract_address}
                </p>
                <p className="info">
                  <strong>Last update: </strong> 07-23-2022
                </p>
                <p className="info">
                  <strong>Last Transferred at: </strong>
                  {allInfoForBookSwap.last_transferred_at}
                </p>
                <p>
                  <strong className="info">Total Count: </strong>6
                </p>
              </div>
            ) : (
              <h2>No data</h2>
            )}

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Logo</TableCell>
                    <TableCell>Id</TableCell>
                    <TableCell>Contract name</TableCell>
                    <TableCell>Contract address</TableCell>
                    <TableCell>Contract symbol</TableCell>
                    <TableCell>Contract decimals</TableCell>
                    <TableCell>Logo url</TableCell>
                    <TableCell>View Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items &&
                    items.map((legislator, key) => {
                      let overallRating, overallBlkRating
                      if (legislator.AverageRating) {
                        overallRating = legislator.overallRating
                      }
                      if (legislator.AverageBLKRating) {
                        overallBlkRating = legislator.overallBlkRating
                      }
                      return (
                        <TableRow key={key}>
                          <TableCell>
                            <Avatar alt="nft logo" src={legislator.logo_url} />
                          </TableCell>
                          <TableCell>{legislator.token_id}</TableCell>
                          <TableCell>{legislator.contract_name}</TableCell>
                          <TableCell className="line-break">
                            {legislator.contract_address}
                          </TableCell>
                          <TableCell>
                            {legislator.contract_ticker_symbol}
                          </TableCell>
                          <TableCell>{legislator.contract_decimals}</TableCell>
                          <TableCell className="line-break">
                            {legislator.logo_url}
                          </TableCell>
                          <TableCell align="center">
                            <a
                              href={`https://mumbai.polygonscan.com/address/${legislator.contract_address}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ChevronRightIcon
                                fontSize="large"
                                style={{ color: 'blue' }}
                              />
                            </a>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        <br />
        <br />
        <br />
        <br />

        {loading ? (
          <h1 className="text-center ">Fetching Nfts...</h1>
        ) : (
          <div>
            {donatedNFTForBookSwap ? (
              <div>
                <h3 className="text-center">
                  NFTs Donations & Awards Provided Using Covalent APIs
                </h3>

                <br />
                <p className="info">
                  <strong> Contract Name: </strong>{' '}
                  {allInfoForBookSwap.contract_name}
                </p>
                <p className="info">
                  <strong> Contract Symbol: </strong>{' '}
                  {allInfoForBookSwap.contract_ticker_symbol}
                </p>
                <p className="info">
                  <strong> Contract Supports ERC: </strong> ['erc20', 'erc721']
                </p>
                <p className="info">
                  <strong>Last update: </strong>{' '}
                  {allInfoForBookSwap.last_transferred_at}
                </p>
                <p>
                  <strong className="info">
                    Total Count: {donatedNFTForBookSwap?.length}
                  </strong>
                </p>
              </div>
            ) : (
              <h2>No data</h2>
            )}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>NFT Image</TableCell>
                    <TableCell>Contract Name</TableCell>
                    <TableCell>Contract symbol</TableCell>
                    <TableCell>NFT Name</TableCell>
                    <TableCell>NFT Description</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>View Details</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {donatedNFTForBookSwap &&
                    donatedNFTForBookSwap.map((legislator, key) => {
                      let overallRating, overallBlkRating
                      if (legislator.AverageRating) {
                        overallRating = legislator.overallRating
                      }
                      if (legislator.AverageBLKRating) {
                        overallBlkRating = legislator.overallBlkRating
                      }
                      return (
                        <TableRow key={key}>
                          <TableCell>
                            <img
                              src={legislator.external_data.image}
                              className="img-donation"
                              alt=""
                            />
                            {/* <Avatar
                              alt="nft logo"
                              src={legislator.external_data.image}
                            /> */}
                          </TableCell>

                          <TableCell>NFTPort</TableCell>
                          <TableCell>{legislator.token_id}</TableCell>
                          <TableCell className="line-break">
                            {legislator.external_data.name}
                          </TableCell>
                          <TableCell>
                            {legislator.external_data.description}
                          </TableCell>
                          <TableCell>{legislator.owner}</TableCell>

                          <TableCell align="center">
                            <a
                              href={`https://mumbai.polygonscan.com/address/${legislator.contract_address}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ChevronRightIcon
                                fontSize="large"
                                style={{ color: 'blue' }}
                              />
                            </a>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Container>
    </StylesProvider>
  )
}

export default CovalentGetNfts
